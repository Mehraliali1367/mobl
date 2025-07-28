FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf

ADD ./apps/docker/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
ADD ./apps/docker/nginx/vargan.crt /etc/nginx/ssl/vargan.crt
ADD ./apps/docker/nginx/vargan.key /etc/nginx/ssl/vargan.key

CMD ["nginx-debug", "-g", "daemon off;"]