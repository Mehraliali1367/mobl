#!/bin/bash

APP_PORT=${PORT:-8000}

/app/web/venv/bin/gunicorn --worker-tmp-dir /dev/shm A.wsgi:application --bind "0.0.0.0:${APP_PORT}"
