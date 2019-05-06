export default [{
  path: '/',
  component: (resolve) => require(['components/app/app-frame'], resolve),
  children: [{
    path: '',
    name: 'Home',
    component: (resolve) => require(['components/home/index'], resolve),
    meta: { title: '首页', icon: 'icon-monitor' }
  }, {
    path: '/system-error',
    name: 'SystemError',
    component: (resolve) => require(['components/error-pages/500'], resolve),
    meta: { title: '系统错误' }
  }, {
    path: '/permission-error',
    name: 'PermissionError',
    component: (resolve) => require(['components/error-pages/403'], resolve),
    meta: { title: '权限错误' }
  },
  {
    path: '/notfound-error',
    name: 'NotfoundError',
    component: (resolve) => require(['components/error-pages/404'], resolve),
    meta: { title: '页面找不到' }
  },
  {
    path: '*',
    component: (resolve) => require(['components/error-pages/404'], resolve),
    meta: { title: '页面找不到' }
  }]
}
];
