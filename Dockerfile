FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

# Bundle app source
COPY . /usr/src/app

# A little hardcode here, because our server is very small
RUN npm install express
RUN npm install colors

EXPOSE 80

RUN node ./dist/server.js http://69.89.12.90:8080/v1/api/
