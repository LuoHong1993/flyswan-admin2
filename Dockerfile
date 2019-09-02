FROM node:8.16.1 as builder
MAINTAINER luohong <luohong_studio@163.com>
WORKDIR /flyswan-admin-ui
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.14.2
MAINTAINER luohong <luohong_studio@163.com>
ENV TZ="Asia/Shanghai"
VOLUME /tmp
WORKDIR /flyswan-admin-ui
COPY --from=builder /dist .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4001
