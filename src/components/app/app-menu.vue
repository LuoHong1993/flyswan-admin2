<style lang="less">

.app-menu{
  .h-menu{
    font-size: 14px;
    .h-menu-li-selected{
      .h-menu-show:after {
        width: 4px;
      }
    }
    > li >.h-menu-show {
      font-size: 15px;
      .h-menu-show-icon {
        font-size: 20px;
      }
      .h-menu-show-desc{
        transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
  }
  .h-menu.h-menu-size-collapse > .h-menu-li > .h-menu-show {
    padding-left: 24px;
    .h-menu-show-icon {
      font-size: 20px;
    }
  }
  .h-menu.h-menu-white {
    color: rgb(49, 58, 70);
  }

}

</style>
<template>
  <div class="app-menu">
    <appLogo></appLogo>
    <Menu :datas="Menus" :inlineCollapsed="siderCollapsed" @click="trigger" ref='menu' :className="`h-menu-${theme}`"></Menu>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import appLogo from './app-logo';

export default {
  props: {
    theme: String
  },
  data () {
    return {
      // Menus: menuConfig
    };
  },
  watch: {
    $route () {
      this.menuSelect();
    }
  },
  mounted () {
    setTimeout(() => { this.menuSelect(); }, 2000);
  },
  computed: {
    ...mapState(['Menus']),
    ...mapState(['siderCollapsed'])
  },
  methods: {
    menuSelect () {
      if (this.$route.name) {
        this.$refs.menu.select(this.$route.name);
      }
      this.$router.addRoutes([{
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
        },
        {
          path: '/login_log',
          name: 'login_log',
          component: (resolve) => require(['components/log-components/login_log'], resolve),
          meta: { title: '登录日志' }
        }]
      }]);
      this.$router.beforeEach((to, from, next) => {
        HeyUI.$LoadingBar.start();
        if (to.meta && to.meta.title) {
          document.title = to.meta.title + ' - 管理应用';
        } else {
          document.title = '管理系统';
        }
        next();
      });
      this.$router.afterEach(() => {
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
    },
    trigger (data) {
      if (data.children.length > 0) return;
      this.$router.push({ name: data.key });
    }
  },
  components: {
    appLogo
  }
};
</script>
