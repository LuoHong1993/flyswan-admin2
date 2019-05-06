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
import defalutcomponets from '../../js/config/defalut-componets';

export default {
  props: {
    theme: String
  },
  data () {
    return {
      Menus: []
    };
  },
  watch: {
    $route () {
      this.menuSelect();
    }
  },
  mounted () {
    this.initMenu();
    setTimeout(() => { this.menuSelect(); }, 2000);
  },
  computed: {
    ...mapState(['siderCollapsed'])
  },
  methods: {
    async initMenu () {
      let menuData = await R.Menu.list();
      if (menuData.ok && menuData.code === 0) {
        this.Menus = menuData.data;
      }
    },
    menuSelect () {
      if (this.$route.name) {
        this.$refs.menu.select(this.$route.name);
      }
      this.$router.addRoutes([...defalutcomponets]);
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
