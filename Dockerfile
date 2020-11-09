FROM node:14.15.0-alpine3.10
WORKDIR /app
RUN apk add --no-cache bash
RUN npm install -g nodemon
EXPOSE 3000