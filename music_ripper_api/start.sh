ENV_TYPE="${ENV_TYPE:+${ENV_TYPE^^}}"

[[ -z "${ENV_TYPE:-}" ]] && {
  >&2 echo "[WARNING] No ENV_TYPE specified, setting to 'PROD' ..."
  ENV_TYPE="PROD"
}
export ENV_TYPE

function start_env_prod() {
    echo "[INFO] Starting gunicorn workers for the API ..."
    exec gunicorn src.endpoints.api:app \
        --bind 0.0.0.0:80 \
        --workers 2 \
        --graceful-timeout 900 \
        --timeout 1200 \
        -k uvicorn.workers.UvicornWorker \
        --log-level debug
}

function start_env_dev() {
    echo "[INFO] Starting uvicorn workers for the API ..."
    exec uvicorn src.endpoints.api:app \
        --host 0.0.0.0 \
        --port 80 \
        --workers 2 \
        --log-level debug \
        --timeout-keep-alive 240 \
        --reload \
        --reload-dir /src
}

case "${ENV_TYPE}" in
  PROD)
    start_env_prod
    ;;
  DEV)
    start_env_dev
    ;;
  *)
    >&2 echo "[ERROR] Attempted to start with invalid ENV_TYPE specified: '$ENV_TYPE'"
    exit 1
    ;;
esac