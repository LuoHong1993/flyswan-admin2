#！/bin/bash
fly='docker container ls | grep "flyswan-admin-ui"'
if [ -n "$fly" ]
then
  docker stop  flyswan-admin-ui
  docker rm  flyswan-admin-ui
else
   echo "No flyswan-admin-ui"
fi
docker pull registry.cn-zhangjiakou.aliyuncs.com/ruke/flyswan-admin-ui:$version
docker rmi $(docker images | grep "none" | awk '{print $3}')
docker run -p 1994:1994 --name flyswan-admin-ui -d registry.cn-zhangjiakou.aliyuncs.com/ruke/flyswan-admin-ui:$version
