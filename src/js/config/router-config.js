import Vue from 'vue';
import VueRouter from 'vue-router';
import routerServiceConfig from './router-service-config';

Vue.use(VueRouter);

const Authorization = Utils.getLocal('token');
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
          let asyncConfig = await routerServiceConfig();
          let userRoutes = router.options.routes.concat(asyncConfig);
          router.addRoutes(asyncConfig);
          router.options.routes = userRoutes;
          next({ ...to, replace: true });
        } else {
          next();
        }
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
