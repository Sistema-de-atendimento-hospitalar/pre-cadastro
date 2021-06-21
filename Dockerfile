FROM nginx:1.21.0-alpine

COPY /dist/buble-medical /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

