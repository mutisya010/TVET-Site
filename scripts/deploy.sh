#!/usr/bin/env bash
# ==============================================================================
# Loima TVC (TVET Site) - Enterprise Deployment & Management Automation Script
# ==============================================================================
# Target Domain: loima-tvc.ac.ke (or loima.royalsoftwares.co.ke / custom domain)
# Target OS:     Ubuntu 24.04 LTS (or any OS with Python 3.12+ available)
# Target Stack:  Django 6.x (WSGI), Gunicorn, Nginx, PostgreSQL/SQLite, Certbot
# Architecture:  Vite + React Frontend (SPA) + Django REST Framework Backend
# ==============================================================================

set -Eeuo pipefail

# ------------------------------------------------------------------------------
# 1. Colors & Logging Framework
# ------------------------------------------------------------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] [INFO]${NC} $*"
}

log_step() {
    echo -e "\n${CYAN}${BOLD}==> [$(date +'%Y-%m-%d %H:%M:%S')] $*${NC}"
}

log_success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] [SUCCESS]${NC} $*"
}

log_warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] [WARNING]${NC} $*"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] [ERROR]${NC} $*" >&2
}

# ------------------------------------------------------------------------------
# 2. Trap Handlers & Concurrency Lock
# ------------------------------------------------------------------------------
LOCK_FILE="/var/run/tvet-deploy.lock"
LOCK_FD=200

acquire_lock() {
    mkdir -p "$(dirname "$LOCK_FILE")"
    exec 200>"$LOCK_FILE"
    if ! flock -n 200; then
        log_error "Another deployment or maintenance process is currently running (lock: $LOCK_FILE)."
        exit 1
    fi
}

release_lock() {
    if [ -e "$LOCK_FILE" ]; then
        flock -u 200 2>/dev/null || true
        rm -f "$LOCK_FILE" 2>/dev/null || true
    fi
}

cleanup() {
    local exit_code=$?
    release_lock
    if [ "$exit_code" -ne 0 ]; then
        log_error "Deployment script terminated unexpectedly with exit code $exit_code."
        log_error "Review the log output above to identify the failing command."
    fi
    exit "$exit_code"
}

trap cleanup EXIT INT TERM

# ------------------------------------------------------------------------------
# 3. Path & Environment Defaults
# ------------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

BACKEND_DIR="${BACKEND_DIR:-$PROJECT_ROOT/backend}"
VENV_DIR="${VENV_DIR:-$BACKEND_DIR/venv}"
FRONTEND_SRC="${FRONTEND_SRC:-$PROJECT_ROOT}"
FRONTEND_DEST="${FRONTEND_DEST:-/var/www/tvet-site-frontend}"
STATIC_DEST="${STATIC_DEST:-/var/www/tvet-site-static}"
MEDIA_DEST="${MEDIA_DEST:-/var/www/tvet-site-media}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/tvet-site}"

SYSTEMD_FILE="${SYSTEMD_FILE:-/etc/systemd/system/tvet_backend.service}"
NGINX_AVAILABLE="${NGINX_AVAILABLE:-/etc/nginx/sites-available/tvet-site}"
NGINX_ENABLED="${NGINX_ENABLED:-/etc/nginx/sites-enabled/tvet-site}"
ENV_DIR="/etc/tvet-site"
ENV_FILE="${ENV_FILE:-$ENV_DIR/tvet.env}"
DEPLOY_CONFIG_FILE="${DEPLOY_CONFIG_FILE:-$PROJECT_ROOT/deployment/tvet.env.example}"

# Default domain (user configured)
DOMAIN="loima-tvc.ac.ke"
PYTHON_BIN="${PYTHON_BIN:-python3}"
GIT_REMOTE="${GIT_REMOTE:-origin}"
CURRENT_ACTIVE_BRANCH=$(git -C "$PROJECT_ROOT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")
[ "$CURRENT_ACTIVE_BRANCH" = "HEAD" ] && CURRENT_ACTIVE_BRANCH="main"
GIT_BRANCH="${GIT_BRANCH:-$CURRENT_ACTIVE_BRANCH}"

GUNICORN_SERVICE="${GUNICORN_SERVICE:-tvet_backend}"
GUNICORN_PORT="${GUNICORN_PORT:-8002}"
SERVICE_USER="${SERVICE_USER:-root}"
SERVICE_GROUP="${SERVICE_GROUP:-www-data}"

MODE="deploy"
DRY_RUN=false
TARGET_COMMIT=""
REBUILD_VENV=false
SKIP_BACKUP=false
SKIP_FRONTEND=false
FORCE_DEPLOY=false

MAINTENANCE_FLAG_FILE="${MAINTENANCE_FLAG_FILE:-/etc/tvet-site/maintenance.flag}"
MAINTENANCE_BYPASS_KEY="${MAINTENANCE_BYPASS_KEY:-tvet-preview-2026}"
MAINTENANCE_ACTION="status"

# Explicit CLI tracker so CLI flags take strict precedence over .env files
CLI_DOMAIN=""
CLI_BRANCH=""
CLI_COMMIT=""
CLI_PYTHON=""
CLI_BYPASS_KEY=""
CLI_MAINTENANCE=""

# ------------------------------------------------------------------------------
# 4. Usage Documentation
# ------------------------------------------------------------------------------
usage() {
    cat <<EOF
${BOLD}Loima TVC (TVET Site) - Automated Deployment & Administration Suite${NC}

${BOLD}USAGE:${NC}
  sudo bash scripts/deploy.sh [OPTIONS]

${BOLD}MODES (--mode=<mode>):${NC}
  ${CYAN}deploy${NC}       (Default) Zero-downtime application update. Verifies Git,
               creates a database backup, runs Django migrations, seeds initial data
               if needed, builds the React frontend, syncs static/media assets,
               reloads Gunicorn & Nginx, and validates endpoints.
  ${CYAN}install${NC}      First-time provisioning on a fresh Linux VPS. Installs OS packages
               (Python, Node.js, Nginx, PostgreSQL, Certbot), sets up virtualenv,
               provisions directories, installs systemd service & Nginx config,
               seeds master college catalog data, and prompts for admin superuser.
  ${CYAN}check${NC}        Read-only diagnostic audit. Checks OS packages, systemd status,
               database connection, Nginx syntax, SSL expiry, and endpoints.
  ${CYAN}maintenance${NC}  Manage portal maintenance mode (on, off, status).
               Provides private secret bypass link for administrative preview.
  ${CYAN}database${NC}     Tests database connectivity, verifies tables, and applies migrations.
  ${CYAN}backup${NC}       Creates an immediate compressed database backup.
  ${CYAN}https${NC}        Configures Nginx and provisions/renews Let's Encrypt SSL certificate.

${BOLD}OPTIONS:${NC}
  -m, --mode=<mode>        Specify execution mode (default: deploy)
  -b, --branch=<branch>    Git branch to deploy (default: main)
  -c, --commit=<hash>      Deploy a specific Git commit hash instead of branch HEAD
      --domain=<domain>    Target domain (e.g. loima-tvc.ac.ke or loima.royalsoftwares.co.ke)
      --maintenance=<cmd>  Maintenance action: on (enable), off (disable), or status
      --bypass-key=<key>   Custom preview key for maintenance bypass
      --python=<path>      Specify path to Python interpreter (default: python3)
      --rebuild-venv       Force rebuild of Python virtual environment
      --skip-backup        Skip pre-deployment database backup
      --skip-frontend      Skip frontend compilation and sync
      --config=<path>      Custom production environment file (default: /etc/tvet-site/tvet.env)
  -n, --dry-run            Simulate operations without modifying the server
  -f, --force              Bypass safety confirmations where applicable
  -h, --help               Display this help manual

${BOLD}EXAMPLES:${NC}
  sudo bash scripts/deploy.sh --mode=check
  sudo bash scripts/deploy.sh --mode=deploy
  sudo bash scripts/deploy.sh --mode=install
  sudo bash scripts/deploy.sh --mode=https --domain=loima-tvc.ac.ke
  sudo bash scripts/deploy.sh --maintenance=on
  sudo bash scripts/deploy.sh --maintenance=off
  sudo bash scripts/deploy.sh --mode=backup
EOF
    exit 0
}

# ------------------------------------------------------------------------------
# 5. CLI Argument Parsing
# ------------------------------------------------------------------------------
parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -m|--mode)
                MODE="$2"
                shift 2
                ;;
            --mode=*)
                MODE="${1#*=}"
                shift
                ;;
            -b|--branch)
                GIT_BRANCH="$2"
                CLI_BRANCH="$2"
                shift 2
                ;;
            --branch=*)
                GIT_BRANCH="${1#*=}"
                CLI_BRANCH="${1#*=}"
                shift
                ;;
            -c|--commit)
                TARGET_COMMIT="$2"
                CLI_COMMIT="$2"
                shift 2
                ;;
            --commit=*)
                TARGET_COMMIT="${1#*=}"
                CLI_COMMIT="${1#*=}"
                shift
                ;;
            --domain)
                DOMAIN="$2"
                CLI_DOMAIN="$2"
                shift 2
                ;;
            --domain=*)
                DOMAIN="${1#*=}"
                CLI_DOMAIN="${1#*=}"
                shift
                ;;
            --python)
                PYTHON_BIN="$2"
                CLI_PYTHON="$2"
                shift 2
                ;;
            --python=*)
                PYTHON_BIN="${1#*=}"
                CLI_PYTHON="${1#*=}"
                shift
                ;;
            --rebuild-venv)
                REBUILD_VENV=true
                shift
                ;;
            --config)
                ENV_FILE="$2"
                shift 2
                ;;
            --config=*)
                ENV_FILE="${1#*=}"
                shift
                ;;
            --skip-backup)
                SKIP_BACKUP=true
                shift
                ;;
            --skip-frontend)
                SKIP_FRONTEND=true
                shift
                ;;
            --maintenance)
                MODE="maintenance"
                MAINTENANCE_ACTION="$2"
                CLI_MAINTENANCE="$2"
                shift 2
                ;;
            --maintenance=*)
                MODE="maintenance"
                MAINTENANCE_ACTION="${1#*=}"
                CLI_MAINTENANCE="${1#*=}"
                shift
                ;;
            --bypass-key)
                MAINTENANCE_BYPASS_KEY="$2"
                CLI_BYPASS_KEY="$2"
                shift 2
                ;;
            --bypass-key=*)
                MAINTENANCE_BYPASS_KEY="${1#*=}"
                CLI_BYPASS_KEY="${1#*=}"
                shift
                ;;
            -n|--dry-run)
                DRY_RUN=true
                shift
                ;;
            -f|--force)
                FORCE_DEPLOY=true
                shift
                ;;
            -h|--help)
                usage
                ;;
            *)
                log_error "Unknown option: $1"
                usage
                ;;
        esac
    done
}

# ------------------------------------------------------------------------------
# 6. Environment & Configuration Loading
# ------------------------------------------------------------------------------
resolve_python_bin() {
    local requested_python=""
    local candidate=""
    local candidate_version=""
    local candidate_major=0
    local candidate_minor=0
    local selected_major=0
    local selected_minor=0
    local selected_python=""
    local -a candidates=()

    if [ -n "$CLI_PYTHON" ]; then
        requested_python="$CLI_PYTHON"
    elif [ "$PYTHON_BIN" != "python3" ]; then
        requested_python="$PYTHON_BIN"
    fi

    if [ -n "$requested_python" ]; then
        if ! command -v "$requested_python" >/dev/null 2>&1; then
            log_error "Requested Python interpreter '$requested_python' was not found."
            exit 1
        fi
        candidate_version=$("$requested_python" -c 'import sys; print("%d.%d" % sys.version_info[:2])') || {
            log_error "Could not determine the version of '$requested_python'."
            exit 1
        }
        IFS=. read -r candidate_major candidate_minor <<< "$candidate_version"
        if [ "$candidate_major" -lt 3 ] || { [ "$candidate_major" -eq 3 ] && [ "$candidate_minor" -lt 12 ]; }; then
            log_error "Python 3.12 or newer is required by Django 6; '$requested_python' is $candidate_version."
            exit 1
        fi
        PYTHON_BIN="$requested_python"
        return 0
    fi

    mapfile -t candidates < <(compgen -c | grep -E '^python3(\.[0-9]+)?$' | sort -u)
    for candidate in "${candidates[@]}"; do
        command -v "$candidate" >/dev/null 2>&1 || continue
        candidate_version=$("$candidate" -c 'import sys; print("%d.%d" % sys.version_info[:2])' 2>/dev/null) || continue
        IFS=. read -r candidate_major candidate_minor <<< "$candidate_version"
        if [ "$candidate_major" -lt 3 ] || { [ "$candidate_major" -eq 3 ] && [ "$candidate_minor" -lt 12 ]; }; then
            continue
        fi
        if [ "$candidate_major" -gt "$selected_major" ] || \
           { [ "$candidate_major" -eq "$selected_major" ] && [ "$candidate_minor" -gt "$selected_minor" ]; }; then
            selected_python="$candidate"
            selected_major="$candidate_major"
            selected_minor="$candidate_minor"
        fi
    done

    if [ -z "$selected_python" ]; then
        log_error "Django 6 requires Python 3.12 or newer, but no compatible installed interpreter was found."
        log_error "Install Python 3.12+ with its venv support, or specify it with --python=/path/to/python3.12."
        exit 1
    fi

    PYTHON_BIN="$selected_python"
    log_info "Selected highest compatible installed Python: $PYTHON_BIN ($selected_major.$selected_minor)"
}

load_environment() {
    local target_file=""
    if [ -f "$ENV_FILE" ]; then
        target_file="$ENV_FILE"
    elif [ -f "$PROJECT_ROOT/backend/.env" ]; then
        target_file="$PROJECT_ROOT/backend/.env"
    elif [ -f "$DEPLOY_CONFIG_FILE" ]; then
        target_file="$DEPLOY_CONFIG_FILE"
    fi

    if [ -n "$target_file" ]; then
        log_info "Loading configuration from: $target_file"
        while IFS= read -r line || [ -n "$line" ]; do
            line="${line%"${line##*[![:space:]]}"}"
            if [[ -n "$line" && ! "$line" =~ ^[[:space:]]*# && "$line" == *=* ]]; then
                local key="${line%%=*}"
                local val="${line#*=}"
                key="${key%"${key##*[![:space:]]}"}"
                if [[ "$val" == \"*\" && "$val" == *\" ]]; then
                    val="${val#\"}"
                    val="${val%\"}"
                elif [[ "$val" == \'*\' && "$val" == *\' ]]; then
                    val="${val#\'}"
                    val="${val%\'}"
                fi
                export "$key=$val"
            fi
        done < "$target_file"
    fi

    # Apply strict CLI argument overrides so user flags are never overwritten by files
    if [ -n "$CLI_DOMAIN" ]; then
        DOMAIN="$CLI_DOMAIN"
    fi
    if [ -n "$CLI_BRANCH" ]; then
        GIT_BRANCH="$CLI_BRANCH"
    fi
    if [ -n "$CLI_COMMIT" ]; then
        TARGET_COMMIT="$CLI_COMMIT"
    fi
    if [ -n "$CLI_PYTHON" ]; then
        PYTHON_BIN="$CLI_PYTHON"
    fi
    if [ -n "$CLI_BYPASS_KEY" ]; then
        MAINTENANCE_BYPASS_KEY="$CLI_BYPASS_KEY"
    fi
    if [ -n "$CLI_MAINTENANCE" ]; then
        MAINTENANCE_ACTION="$CLI_MAINTENANCE"
    fi

    export DOMAIN="${DOMAIN:-loima-tvc.ac.ke}"
    export DB_PORT="${DB_PORT:-5432}"
    export DB_ENGINE="${DB_ENGINE:-django.db.backends.sqlite3}"
    export MAINTENANCE_BYPASS_KEY="${MAINTENANCE_BYPASS_KEY:-tvet-preview-2026}"
    export DJANGO_ENV="production"
    export PYTHONPATH="${BACKEND_DIR}:${PYTHONPATH:-}"

    log_info "Active Target Domain: $DOMAIN"
}

get_db_settings() {
    if [ ! -d "$VENV_DIR" ] || ! "$VENV_DIR/bin/python" -c "import django" >/dev/null 2>&1; then
        return
    fi

    local db_info
    db_info=$(cd "$BACKEND_DIR" && "$VENV_DIR/bin/python" -c "
import os, sys, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tvet_backend.settings')
os.environ.setdefault('DJANGO_ENV', 'production')
try:
    django.setup()
    from django.conf import settings
    db = settings.DATABASES.get('default', {})
    print(f\"{db.get('ENGINE','')}|{db.get('NAME','')}|{db.get('USER','')}|{db.get('HOST','')}|{db.get('PORT','')}|{db.get('PASSWORD','')}\")
except Exception:
    sys.exit(1)
" 2>/dev/null | grep '|' | tail -n 1 || true)

    if [ -n "$db_info" ]; then
        local parsed_engine=""
        IFS='|' read -r parsed_engine DB_NAME DB_USER DB_HOST DB_PORT DB_PASSWORD <<< "$db_info"
        if [ -n "$parsed_engine" ]; then
            DB_ENGINE="$parsed_engine"
        fi
    fi
}

# ------------------------------------------------------------------------------
# 7. Database Connectivity & Backup Routines
# ------------------------------------------------------------------------------
check_database_connectivity() {
    log_info "Verifying database configuration ($DB_ENGINE)..."

    if [[ "$DB_ENGINE" == *"sqlite"* ]]; then
        local db_path="${DB_NAME:-$BACKEND_DIR/db.sqlite3}"
        log_success "Using SQLite database at: $db_path"
        return 0
    fi

    log_info "Connecting to PostgreSQL database [$DB_NAME] on [$DB_HOST:$DB_PORT] as [$DB_USER]..."
    if command -v systemctl >/dev/null 2>&1 && [[ "$DB_HOST" == "127.0.0.1" || "$DB_HOST" == "localhost" ]]; then
        if ! systemctl is-active --quiet postgresql 2>/dev/null; then
            log_warn "Local PostgreSQL service appears inactive. Starting it..."
            systemctl start postgresql 2>/dev/null || true
        fi
    fi

    if command -v pg_isready >/dev/null 2>&1; then
        if pg_isready -h "$DB_HOST" -p "$DB_PORT" -q 2>/dev/null; then
            log_success "PostgreSQL server at $DB_HOST:$DB_PORT is accepting connections."
        else
            log_error "PostgreSQL server at $DB_HOST:$DB_PORT is not responding."
            return 1
        fi
    fi
}

backup_database() {
    if [ "$SKIP_BACKUP" = true ]; then
        log_warn "Database backup skipped via --skip-backup flag."
        return 0
    fi

    log_step "Pre-Deployment Database Backup"
    mkdir -p "$BACKUP_DIR"

    local timestamp
    timestamp=$(date +'%Y%m%d_%H%M%S')

    if [[ "$DB_ENGINE" == *"sqlite"* ]]; then
        local db_path="${DB_NAME:-$BACKEND_DIR/db.sqlite3}"
        if [ -f "$db_path" ]; then
            local backup_file="$BACKUP_DIR/tvet_sqlite_${timestamp}.sqlite3.gz"
            log_info "Backing up SQLite database to: $backup_file"
            gzip -c "$db_path" > "$backup_file"
            log_success "SQLite backup created successfully ($(du -h "$backup_file" | cut -f1))."
        else
            log_info "No SQLite database found yet; skipping backup."
        fi
        return 0
    fi

    local backup_file="$BACKUP_DIR/tvet_${DB_NAME}_${timestamp}.sql.gz"
    log_info "Creating compressed PostgreSQL backup at: $backup_file"

    if [ "$DRY_RUN" = true ]; then
        log_info "[DRY-RUN] Would execute pg_dump for $DB_NAME."
        return 0
    fi

    export PGPASSWORD="${DB_PASSWORD:-}"
    if pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME" | gzip > "$backup_file"; then
        log_success "Database backup created successfully ($(du -h "$backup_file" | cut -f1))."
        find "$BACKUP_DIR" -type f -name "tvet_*.sql.gz" -mtime +14 -delete 2>/dev/null || true
    else
        log_error "Database backup failed! Check PostgreSQL credentials."
        rm -f "$backup_file"
        exit 1
    fi
    unset PGPASSWORD
}

# ------------------------------------------------------------------------------
# 8. Git Workflow & Synchronization
# ------------------------------------------------------------------------------
sync_git_repository() {
    log_step "Git Repository Synchronization"

    if [ ! -d "$PROJECT_ROOT/.git" ]; then
        log_warn "Directory $PROJECT_ROOT is not a Git repository. Skipping git sync."
        return 0
    fi

    cd "$PROJECT_ROOT"
    local remote_url
    remote_url=$(git config --get "remote.$GIT_REMOTE.url" || echo "")
    if [ -z "$remote_url" ]; then
        log_warn "Remote '$GIT_REMOTE' not configured. Skipping remote fetch."
        return 0
    fi

    log_info "Git Remote: $GIT_REMOTE ($remote_url)"
    git config core.fileMode false 2>/dev/null || true

    if git status -s 2>/dev/null | grep -q "backend/media"; then
        git checkout -- "$PROJECT_ROOT/backend/media" 2>/dev/null || true
    fi

    if ! git diff-index --quiet HEAD -- 2>/dev/null; then
        log_warn "Local uncommitted modifications detected in repository:"
        git status -s
        log_info "Automatically stashing local changes for clean deployment..."
        git stash save "tvet_auto_stash_$(date +%s)" 2>/dev/null || true
    fi

    if [ "$DRY_RUN" = true ]; then
        log_info "[DRY-RUN] Would fetch $GIT_REMOTE $GIT_BRANCH and checkout target commit."
        return 0
    fi

    log_info "Fetching latest commits from $GIT_REMOTE..."
    git fetch "$GIT_REMOTE" "$GIT_BRANCH" --tags

    if [ -n "$TARGET_COMMIT" ]; then
        log_info "Checking out specific target commit: $TARGET_COMMIT"
        git checkout "$TARGET_COMMIT"
    else
        log_info "Fast-forwarding branch '$GIT_BRANCH' to $GIT_REMOTE/$GIT_BRANCH..."
        git checkout "$GIT_BRANCH"
        git merge --ff-only "$GIT_REMOTE/$GIT_BRANCH" || {
            log_warn "Fast-forward merge failed; resetting cleanly to $GIT_REMOTE/$GIT_BRANCH..."
            git reset --hard "$GIT_REMOTE/$GIT_BRANCH"
        }
    fi

    local current_commit
    current_commit=$(git rev-parse --short HEAD)
    log_success "Repository synchronized to commit: $current_commit"
}

# ------------------------------------------------------------------------------
# 9. Backend Deployment Routine
# ------------------------------------------------------------------------------
deploy_backend() {
    log_step "Django Backend Deployment"

    cd "$BACKEND_DIR"
    export PYTHONPATH="${BACKEND_DIR}:${PYTHONPATH:-}"

    resolve_python_bin
    log_info "Base Python interpreter: $PYTHON_BIN ($($PYTHON_BIN --version 2>&1 | head -n1))"

    if [ "$REBUILD_VENV" = true ] && [ -d "$VENV_DIR" ]; then
        log_warn "Rebuilding virtual environment at $VENV_DIR..."
        rm -rf "$VENV_DIR"
    fi

    if [ ! -d "$VENV_DIR" ]; then
        log_info "Creating Python virtual environment at $VENV_DIR..."
        "$PYTHON_BIN" -m venv "$VENV_DIR"
    fi

    log_info "Activating Python virtual environment..."
    # shellcheck disable=SC1091
    source "$VENV_DIR/bin/activate"

    log_info "Validating Python dependencies from requirements.txt..."
    if [ -f "$BACKEND_DIR/requirements.txt" ]; then
        pip install --upgrade pip setuptools wheel -q
        pip install -r "$BACKEND_DIR/requirements.txt" -q
    fi

    if ! pip show gunicorn >/dev/null 2>&1; then
        log_info "Installing gunicorn inside virtual environment..."
        pip install "gunicorn>=23.0.0" -q
    fi

    export DJANGO_ENV="production"

    log_info "Applying database migrations (python manage.py migrate --no-input)..."
    python "$BACKEND_DIR/manage.py" migrate --no-input

    log_info "Checking master data catalog..."
    python "$BACKEND_DIR/manage.py" seed_tvet_data || {
        log_warn "seed_tvet_data reported warnings or was already initialized."
    }

    log_info "Collecting static assets (python manage.py collectstatic --no-input)..."
    export STATIC_ROOT="$STATIC_DEST"
    python "$BACKEND_DIR/manage.py" collectstatic --no-input

    log_info "Configuring permissions on static ($STATIC_DEST) and media ($MEDIA_DEST)..."
    mkdir -p "$STATIC_DEST" "$MEDIA_DEST" "$BACKEND_DIR/media"
    
    if [ "$MEDIA_DEST" != "$BACKEND_DIR/media" ] && [ ! -L "$MEDIA_DEST" ]; then
        cp -rn "$BACKEND_DIR/media"/* "$MEDIA_DEST"/ 2>/dev/null || true
    fi

    chown -R "$SERVICE_USER":"$SERVICE_GROUP" "$STATIC_DEST" "$MEDIA_DEST" "$BACKEND_DIR/media"
    find "$STATIC_DEST" -type d -exec chmod 755 {} + 2>/dev/null || true
    find "$STATIC_DEST" -type f -exec chmod 644 {} + 2>/dev/null || true
    chmod -R 775 "$MEDIA_DEST" "$BACKEND_DIR/media" 2>/dev/null || true

    log_success "Django backend deployed successfully."
}

# ------------------------------------------------------------------------------
# 10. Frontend Deployment Routine (Vite + React)
# ------------------------------------------------------------------------------
deploy_frontend() {
    log_step "Frontend Build & Publishing"

    if [ "$SKIP_FRONTEND" = true ]; then
        log_warn "Frontend deployment skipped via --skip-frontend flag."
        return 0
    fi

    cd "$FRONTEND_SRC"
    log_info "Checking Node.js & npm..."
    if ! command -v npm >/dev/null 2>&1; then
        log_error "npm is required to build the frontend. Install Node.js (v18+) and npm."
        exit 1
    fi

    log_info "Node.js $(node --version), npm $(npm --version)"

    log_info "Installing frontend dependencies..."
    if [ -f "$FRONTEND_SRC/package-lock.json" ]; then
        npm ci --prefer-offline --no-audit || npm install
    else
        npm install
    fi

    log_info "Compiling production build with Vite (base: '/')..."
    export VITE_BASE_PATH="/"
    export VITE_OUT_DIR="dist"
    npm run build

    local build_out="$FRONTEND_SRC/dist"
    if [ ! -d "$build_out" ] && [ -d "$FRONTEND_SRC/docs" ]; then
        build_out="$FRONTEND_SRC/docs"
    fi

    if [ ! -f "$build_out/index.html" ]; then
        log_error "Frontend build failed: $build_out/index.html was not generated!"
        exit 1
    fi

    log_info "Publishing frontend bundle to $FRONTEND_DEST..."
    mkdir -p "$FRONTEND_DEST"
    local stage_dir="/var/www/tvet-site-frontend.stage"
    rm -rf "$stage_dir"
    mkdir -p "$stage_dir"

    cp -r "$build_out"/* "$stage_dir"/
    if [ -f "$PROJECT_ROOT/deployment/maintenance.html" ]; then
        cp "$PROJECT_ROOT/deployment/maintenance.html" "$stage_dir/maintenance.html"
    fi

    if command -v rsync >/dev/null 2>&1; then
        rsync -a --delete "$stage_dir"/ "$FRONTEND_DEST"/
    else
        cp -r "$stage_dir"/* "$FRONTEND_DEST"/
    fi
    rm -rf "$stage_dir"

    chown -R "$SERVICE_GROUP":"$SERVICE_GROUP" "$FRONTEND_DEST"
    find "$FRONTEND_DEST" -type d -exec chmod 755 {} +
    find "$FRONTEND_DEST" -type f -exec chmod 644 {} +

    log_success "Frontend published successfully to $FRONTEND_DEST."
}

# ------------------------------------------------------------------------------
# 11. Systemd & Gunicorn Service Management
# ------------------------------------------------------------------------------
manage_gunicorn_service() {
    log_step "Service Management (Gunicorn)"

    if [ ! -f "$SYSTEMD_FILE" ]; then
        log_info "Installing systemd service file from deployment template..."
        if [ -f "$PROJECT_ROOT/deployment/tvet_backend.service" ]; then
            cp "$PROJECT_ROOT/deployment/tvet_backend.service" "$SYSTEMD_FILE"
            sed -i "s|/var/www/tvet-site/backend|$BACKEND_DIR|g" "$SYSTEMD_FILE"
            systemctl daemon-reload
            systemctl enable "$GUNICORN_SERVICE"
        else
            log_error "Template $PROJECT_ROOT/deployment/tvet_backend.service not found."
            exit 1
        fi
    fi

    if [ "$DRY_RUN" = true ]; then
        log_info "[DRY-RUN] Would restart systemd service $GUNICORN_SERVICE."
        return 0
    fi

    log_info "Restarting $GUNICORN_SERVICE systemd service..."
    systemctl daemon-reload
    systemctl restart "$GUNICORN_SERVICE"

    sleep 2
    if systemctl is-active --quiet "$GUNICORN_SERVICE"; then
        log_success "Service $GUNICORN_SERVICE is active and running."
    else
        log_error "Service $GUNICORN_SERVICE failed to start! Recent logs:"
        journalctl -u "$GUNICORN_SERVICE" -n 25 --no-pager
        exit 1
    fi
}

# ------------------------------------------------------------------------------
# 12. Nginx Validation & Service Management
# ------------------------------------------------------------------------------
manage_nginx() {
    log_step "Nginx Validation & Service Management ($DOMAIN)"

    if ! command -v nginx >/dev/null 2>&1; then
        log_error "Nginx is not installed on this system."
        exit 1
    fi

    local bypass_key="${MAINTENANCE_BYPASS_KEY:-tvet-preview-2026}"

    # Determine server_name string: check if www sub-variant resolves or if apex domain
    local server_names="$DOMAIN"
    local dot_count
    dot_count=$(echo "$DOMAIN" | tr -cd '.' | wc -c)
    local is_apex=false
    if [ "$dot_count" -le 1 ]; then
        is_apex=true
    elif [[ "$DOMAIN" =~ \.(ac|co|go|or|ne|sc|me)\.ke$ ]] && [ "$dot_count" -eq 2 ]; then
        is_apex=true
    fi

    if [ "$is_apex" = true ]; then
        server_names="$DOMAIN www.$DOMAIN"
    elif command -v host >/dev/null 2>&1 && host "www.$DOMAIN" >/dev/null 2>&1; then
        server_names="$DOMAIN www.$DOMAIN"
    fi

    # Install or update site configuration if missing or if domain changed
    if [ ! -f "$NGINX_AVAILABLE" ] || ! grep -q "$DOMAIN" "$NGINX_AVAILABLE" 2>/dev/null || ! grep -q "$bypass_key" "$NGINX_AVAILABLE" 2>/dev/null; then
        log_info "Writing Nginx site configuration for [$DOMAIN] ($server_names)..."
        cp "$PROJECT_ROOT/deployment/nginx.conf" "$NGINX_AVAILABLE"
        sed -i "s/__SERVER_NAMES__/${server_names}/g" "$NGINX_AVAILABLE"
        sed -i "s/__DOMAIN__/${DOMAIN}/g" "$NGINX_AVAILABLE"
        sed -i "s/__MAINTENANCE_BYPASS_KEY__/${bypass_key}/g" "$NGINX_AVAILABLE"

        if command -v certbot >/dev/null 2>&1 && certbot certificates 2>/dev/null | grep -q "$DOMAIN"; then
            log_info "Preserving existing Certbot SSL configuration on updated Nginx site..."
            certbot --nginx -d "$DOMAIN" --non-interactive --redirect 2>/dev/null || true
        fi
    fi

    if [ ! -L "$NGINX_ENABLED" ] && [ ! -f "$NGINX_ENABLED" ]; then
        log_info "Enabling Nginx site for $DOMAIN..."
        ln -sf "$NGINX_AVAILABLE" "$NGINX_ENABLED"
    fi
    rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

    log_info "Validating Nginx configuration syntax (nginx -t)..."
    if nginx -t; then
        log_info "Reloading Nginx web server..."
        systemctl reload nginx
        log_success "Nginx reloaded successfully for $DOMAIN."
    else
        log_error "Nginx configuration syntax validation failed!"
        exit 1
    fi
}

# ------------------------------------------------------------------------------
# 13. SSL / HTTPS Automation (Certbot)
# ------------------------------------------------------------------------------
manage_ssl() {
    log_step "Automated SSL / HTTPS Configuration (Let's Encrypt)"

    if ! command -v certbot >/dev/null 2>&1; then
        log_info "Installing certbot and python3-certbot-nginx..."
        apt-get update -y -q && apt-get install -y certbot python3-certbot-nginx -q
    fi

    log_info "Checking DNS resolution for $DOMAIN..."
    if command -v host >/dev/null 2>&1; then
        host "$DOMAIN" || log_warn "DNS lookup failed for $DOMAIN. Ensure DNS A-record points to this VPS IP."
    fi

    # Build certbot domain flags based on active DNS resolution
    local certbot_domains=("-d" "$DOMAIN")
    local dot_count
    dot_count=$(echo "$DOMAIN" | tr -cd '.' | wc -c)
    local is_apex=false
    if [ "$dot_count" -le 1 ]; then
        is_apex=true
    elif [[ "$DOMAIN" =~ \.(ac|co|go|or|ne|sc|me)\.ke$ ]] && [ "$dot_count" -eq 2 ]; then
        is_apex=true
    fi

    # Only include www if it resolves in DNS, or if apex without host utility
    if command -v host >/dev/null 2>&1; then
        if host "www.$DOMAIN" >/dev/null 2>&1; then
            certbot_domains+=("-d" "www.$DOMAIN")
        else
            log_info "Subdomain www.$DOMAIN is not pointed in DNS yet. Certbot will provision certificate for $DOMAIN only."
        fi
    elif [ "$is_apex" = true ]; then
        certbot_domains+=("-d" "www.$DOMAIN")
    fi

    log_info "Requesting/Renewing SSL certificate for ${certbot_domains[*]} via Certbot..."
    if certbot --nginx "${certbot_domains[@]}" --non-interactive --agree-tos --register-unsafely-without-email --redirect 2>/dev/null || \
       certbot --nginx "${certbot_domains[@]}" --non-interactive --agree-tos --register-unsafely-without-email --redirect; then
        log_success "SSL Certificate verified & configured successfully for $DOMAIN."
    else
        log_warn "Certbot could not obtain certificate automatically. Verify DNS propagation and run:"
        echo -e "${CYAN}sudo certbot --nginx -d $DOMAIN${NC}"
    fi
}

# ------------------------------------------------------------------------------
# 14. Post-Deployment Verification & Health Checks
# ------------------------------------------------------------------------------
run_health_checks() {
    log_step "Post-Deployment Verification & Health Checks"

    log_info "Testing local Gunicorn backend API (http://127.0.0.1:$GUNICORN_PORT/api/v1/branding/)..."
    local api_res
    api_res=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:$GUNICORN_PORT/api/v1/branding/" || echo "000")
    if [ "$api_res" -eq 200 ]; then
        log_success "Backend API is responding with HTTP 200 OK."
    else
        log_warn "Backend API returned HTTP $api_res (expected 200). Check /var/log/tvet_gunicorn_error.log."
    fi

    log_info "Testing Nginx web server response (http://127.0.0.1/)..."
    local web_res
    web_res=$(curl -s -o /dev/null -w "%{http_code}" -H "Host: $DOMAIN" "http://127.0.0.1/" || echo "000")
    if [ "$web_res" -eq 200 ] || [ "$web_res" -eq 301 ] || [ "$web_res" -eq 302 ]; then
        log_success "Web server is responding with HTTP $web_res."
    else
        log_warn "Web server returned HTTP $web_res. Check Nginx access/error logs."
    fi
}

# ------------------------------------------------------------------------------
# 15. Maintenance Mode Controller
# ------------------------------------------------------------------------------
manage_maintenance_mode() {
    log_step "Portal Maintenance Controller"
    mkdir -p "$(dirname "$MAINTENANCE_FLAG_FILE")"

    case "$MAINTENANCE_ACTION" in
        on|enable)
            touch "$MAINTENANCE_FLAG_FILE"
            log_warn "Maintenance mode ENABLED. Public requests will receive HTTP 503 Maintenance Page."
            echo -e "\n${BOLD}Private Preview Access Link:${NC}"
            echo -e "${CYAN}https://${DOMAIN}/preview-access?key=${MAINTENANCE_BYPASS_KEY}${NC}\n"
            ;;
        off|disable)
            rm -f "$MAINTENANCE_FLAG_FILE"
            log_success "Maintenance mode DISABLED. Portal is fully accessible to the public."
            ;;
        status)
            if [ -f "$MAINTENANCE_FLAG_FILE" ]; then
                log_warn "Maintenance mode is currently ACTIVE."
                echo -e "Preview bypass link: ${CYAN}https://${DOMAIN}/preview-access?key=${MAINTENANCE_BYPASS_KEY}${NC}"
            else
                log_success "Maintenance mode is INACTIVE (Portal is LIVE)."
            fi
            ;;
        *)
            log_error "Unknown maintenance action: $MAINTENANCE_ACTION. Use on, off, or status."
            exit 1
            ;;
    esac
}

# ------------------------------------------------------------------------------
# 16. First-Time Provisioning Routine (Install Mode)
# ------------------------------------------------------------------------------
install_full_stack() {
    log_step "First-Time VPS Provisioning (Loima TVC Full Stack)"

    if [ "$(id -u)" -ne 0 ]; then
        log_error "Initial provisioning requires root privileges. Please run with sudo."
        exit 1
    fi

    log_info "Updating system packages via apt..."
    apt-get update -y -q
    apt-get install -y -q \
        curl wget git rsync ufw build-essential \
        python3 python3-pip python3-venv python3-dev \
        libpq-dev libjpeg-dev zlib1g-dev \
        nginx postgresql postgresql-contrib \
        certbot python3-certbot-nginx

    resolve_python_bin
    log_info "Provisioning will use Python $("$PYTHON_BIN" --version 2>&1 | awk '{print $2}') from $PYTHON_BIN."

    if ! command -v node >/dev/null 2>&1; then
        log_info "Installing Node.js LTS (v20)..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt-get install -y -q nodejs
    fi

    log_info "Creating production directory tree..."
    mkdir -p "$ENV_DIR" "$FRONTEND_DEST" "$STATIC_DEST" "$MEDIA_DEST" "$BACKUP_DIR"

    if [ ! -f "$ENV_FILE" ]; then
        log_info "Creating production environment file at $ENV_FILE..."
        cp "$DEPLOY_CONFIG_FILE" "$ENV_FILE"
        chmod 600 "$ENV_FILE"
        log_warn "Created default $ENV_FILE. Update DB_PASSWORD and SECRET_KEY as required."
    fi

    load_environment

    if [[ "$DB_ENGINE" == *"postgresql"* ]]; then
        log_info "Configuring PostgreSQL user [$DB_USER] and database [$DB_NAME]..."
        sudo -u postgres psql -c "CREATE USER \"$DB_USER\" WITH PASSWORD '$DB_PASSWORD';" 2>/dev/null || true
        sudo -u postgres psql -c "CREATE DATABASE \"$DB_NAME\" OWNER \"$DB_USER\";" 2>/dev/null || true
        sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE \"$DB_NAME\" TO \"$DB_USER\";" 2>/dev/null || true
    fi

    deploy_backend
    deploy_frontend
    manage_gunicorn_service
    manage_nginx

    echo -e "\n${BOLD}Create Django Admin Superuser? (y/n)${NC}"
    read -r create_admin || create_admin="n"
    if [[ "$create_admin" =~ ^[Yy]$ ]]; then
        "$VENV_DIR/bin/python" "$BACKEND_DIR/manage.py" createsuperuser
    fi

    run_health_checks
    log_success "Loima TVC Full-Stack Provisioning completed successfully!"
}

# ------------------------------------------------------------------------------
# 17. Diagnostic System Audit (Check Mode)
# ------------------------------------------------------------------------------
audit_system() {
    log_step "System Health & Diagnostic Audit"

    echo -e "${BOLD}1. Host & OS Information:${NC}"
    uname -a
    [ -f /etc/os-release ] && grep -E '^(PRETTY_NAME|VERSION)=' /etc/os-release

    echo -e "\n${BOLD}2. Core Runtimes:${NC}"
    echo "Python: $(python3 --version 2>&1 || echo 'Not installed')"
    echo "Node.js: $(node --version 2>&1 || echo 'Not installed')"
    echo "npm: $(npm --version 2>&1 || echo 'Not installed')"
    echo "Nginx: $(nginx -v 2>&1 || echo 'Not installed')"

    echo -e "\n${BOLD}3. Systemd Services:${NC}"
    systemctl status "$GUNICORN_SERVICE" --no-pager -l || true
    systemctl status nginx --no-pager -l || true

    echo -e "\n${BOLD}4. Database Connectivity:${NC}"
    load_environment
    get_db_settings
    check_database_connectivity || true

    echo -e "\n${BOLD}5. Nginx Configuration:${NC}"
    nginx -t || true

    echo -e "\n${BOLD}6. SSL Certificates:${NC}"
    if command -v certbot >/dev/null 2>&1; then
        certbot certificates 2>/dev/null || echo "No active certbot certificates."
    fi

    echo -e "\n${BOLD}7. Local Health Probe:${NC}"
    run_health_checks || true
}

# ------------------------------------------------------------------------------
# 18. Main Execution Controller
# ------------------------------------------------------------------------------
main() {
    parse_args "$@"
    acquire_lock

    case "$MODE" in
        install)
            install_full_stack
            ;;
        deploy)
            load_environment
            get_db_settings
            check_database_connectivity
            backup_database
            sync_git_repository
            deploy_backend
            deploy_frontend
            manage_gunicorn_service
            manage_nginx
            run_health_checks
            log_success "Deployment completed successfully!"
            ;;
        check)
            audit_system
            ;;
        database)
            load_environment
            get_db_settings
            check_database_connectivity
            log_info "Applying migrations..."
            "$VENV_DIR/bin/python" "$BACKEND_DIR/manage.py" migrate
            log_success "Database verified and up to date."
            ;;
        backup)
            load_environment
            get_db_settings
            backup_database
            ;;
        https|ssl)
            load_environment
            manage_nginx
            manage_ssl
            run_health_checks
            ;;
        maintenance)
            load_environment
            manage_maintenance_mode
            ;;
        *)
            log_error "Unknown mode: $MODE"
            usage
            ;;
    esac
}

main "$@"
