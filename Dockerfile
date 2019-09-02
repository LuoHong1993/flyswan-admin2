FROM node:8.16.1 as builder
MAINTAINER luohong <luohong_studio@163.com>
ENV TZ="Asia/Shanghai"
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 4001
