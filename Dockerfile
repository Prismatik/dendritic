FROM node:4

MAINTAINER Prismatik Pty. Ltd. <david@prismatik.com.au>

COPY ./package.json /opt/app/

WORKDIR /opt/app

RUN NODE_ENV=null npm install
RUN npm install -g chokidar-cli mocha

ADD . /opt/app

CMD ["npm", "test"]
