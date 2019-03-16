FROM nginx
COPY dist /var/www/angular
COPY nginx.conf /etc/nginx/nginx.conf
