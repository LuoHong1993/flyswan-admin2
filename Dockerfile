FROM node:8.16.1 as builder
MAINTAINER luohong <luohong_studio@163.com>
ENV TZ="Asia/Shanghai"
WORKDIR /app
COPY . .
RUN npm install && npm run build && cp -r dist/* /data/projects/flyswan-admin-ui/dist && rm -rf /app
