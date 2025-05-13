#!/bin/bash

/app/web/venv/bin/python manage.py makemigrations --noinput
/app/web/venv/bin/python manage.py migrate --noinput