FROM python:3.12.3-slim


RUN mkdir app
RUN mkdir app/web

WORKDIR /app/web/

RUN python3 -m venv /app/web/venv

COPY ./apps/web/ .
# RUN    apt-get update 
RUN    /app/web/venv/bin/pip install pip --upgrade 
RUN    /app/web/venv/bin/pip install -r requirements.txt 
RUN    chmod +x /app/web/scripts/entrypoint.sh 
RUN    chmod +x /app/web/scripts/createsuperuser.sh
RUN    chmod +x /app/web/scripts/migrations.sh
RUN    chmod +x /app/web/scripts/collectstatic.sh 
# RUN    bash /app/web/scripts/migrations.sh 
# RUN    bash /app/web/scripts/collectstatic.sh
# RUN    bash /app/web/scripts/createsuperuser.sh


CMD ["/app/web/scripts/entrypoint.sh"]