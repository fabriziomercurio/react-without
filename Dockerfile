FROM node:24.8.0-alpine 

WORKDIR /var/www/html 

COPY package*.json . 

RUN npm install 

COPY . . 

EXPOSE 3000 

CMD ["npm","run","dev","--", "--host"] 