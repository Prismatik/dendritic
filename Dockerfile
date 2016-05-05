FROM mhart/alpine-node:4

MAINTAINER Prismatik Pty. Ltd. <david@prismatik.com.au>

COPY ./package.json /opt/app/

WORKDIR /opt/app

RUN npm install
ADD . /opt/app

CMD ["npm", "test"]
