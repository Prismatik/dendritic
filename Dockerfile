FROM node:6

MAINTAINER Prismatik Pty. Ltd. <david@prismatik.com.au>

COPY ./package.json /opt/app/

WORKDIR /opt/app

RUN NODE_ENV=null npm install

ADD . /opt/app

CMD ["npm", "test"]
