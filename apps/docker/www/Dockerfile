FROM node:alpine


RUN mkdir app
RUN mkdir app/www

WORKDIR /app/www

COPY ./apps/www/ .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]