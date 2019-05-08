import Vue from 'vue';
import VueRouter from 'vue-router';
import defalutcomponets from './defalut-componets';
import Ajax from '../common/ajax';
Vue.use(VueRouter);
const Authorization = Utils.getLocal('token');
const initMenu = async () => {
  let routerConfig = [];
  routerConfig = defalutcomponets;
  let res = await Ajax.get('/sys/menu/list');
  if (res.ok) {
    if (res.code === 0) {
      if (res.data != null && res.data.length > 0) {
        let buildList = [];
        for (let i = 0; i < res.data.length; i++) {
          let item = res.data[i];
          let buildConfigs = buildConfig(item);
          if (buildConfigs !== null && buildConfigs !== {} && JSON.stringify(buildConfigs) !== '{}') {
            buildList.push(buildConfigs);
          }
          if (item.children != null && item.children.length > 0) {
            for (let j = 0; j < item.children.length; j++) {
              let buildConfigs2 = buildConfig(item.children[j]);
              if (buildConfigs2 !== null && buildConfigs2 !== {} && JSON.stringify(buildConfigs2) !== '{}') {
                buildList.push(buildConfigs2);
              }
            }
          }
        }
        buildList.push(defalutcomponets[0].children[1]);
        buildList.push(defalutcomponets[0].children[2]);
        buildList.push(defalutcomponets[0].children[3]);
        buildList.push(defalutcomponets[0].children[4]);
        routerConfig = [{
          path: '/',
          component: (resolve) => require(['components/app/app-frame'], resolve),
          children: buildList
        }];
      }
    }
  }
  return routerConfig;
};
const buildConfig = (data) => {
  let buildMap = {};
  let rpath = data.path;
  const rcomponent = data.component;
  let rtitle = data.title == null ? '' : data.title;
  let ricon = data.icon;
  let rkey = data.key;
  if (rpath !== null && rkey !== null) {
    if (rcomponent !== null && rcomponent !== '') {
      buildMap['path'] = rpath;
      buildMap['name'] = rkey;
      let pathSrc = rcomponent;
      buildMap['component'] = (resolve) => require([`@/${pathSrc}.vue`], resolve);
      let metaMap = { title: rtitle };
      if (ricon !== null && ricon !== '') {
        metaMap['icon'] = ricon;
      }
      buildMap['meta'] = metaMap;
    }
  }

  return buildMap;
};
const initRouter = () => {
  const routerParam = {
    mode: 'history',
    routes: [{
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['components/login/index'], resolve)
    }]
  };

  let router = new VueRouter(routerParam);

  router.beforeEach(async(to, from, next) => {
    HeyUI.$LoadingBar.start();
    if (to.meta && to.meta.title) {
      document.title = to.meta.title + ' - 管理应用';
    } else {
      document.title = '管理系统';
    }

    if (to.path !== '/login') {
      if (Authorization == null || Authorization === '' || Authorization === 'null') {
        next({ path: '/login' });
      } else {
        if (router.options.routes.length <= 1) {
          let asyncConfig = await initMenu();
          log(JSON.stringify(asyncConfig));
          log(JSON.stringify(defalutcomponets));
          let userRoutes = router.options.routes.concat(asyncConfig);
          router.addRoutes(asyncConfig);
          router.options.routes = userRoutes;
          next({ ...to, replace: true });
        } else {
          next();
        }

        // next( {path: to.path});
      }
    } else {
      next();
    }
  });
  router.afterEach(() => {
    HeyUI.$LoadingBar.success();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    let layoutContent = document.querySelector('.h-layout-content');
    if (layoutContent) {
      layoutContent.scrollTop = 0;
    }
    // baidu 统计，如果有自己的统计，请至index.html修改至自己的埋点
    if (window._hmt) {
      window._hmt.push(['_trackPageview', window.location.pathname]);
    }
  });
  return router;
};

export default initRouter;
