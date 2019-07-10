<style lang='less'>
  .menu-index{
    /*.menulist{
      font-size: 26px;
    }*/
  }
</style>
<template>
  <div class="menu-index table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">菜单管理</span></div>
    <div class="h-panel-body">
      <Row :space="9">
        <Cell width="8" >
          <Row :space-y="9">
            <Cell width="24" ><Button color="primary" icon="h-icon-plus" >添加</Button></Cell>
            <Cell width="24" ><menulist v-on:menuItemInfo="menuItemInfo" class="menulist"></menulist></Cell>
          </Row>
        </Cell>
        <Cell width="16" ><div><menuedit :menuItem="menuItem"></menuedit></div></Cell>
      </Row>
    </div>
  </div>
</template>

<script>
import menulist from './menu-list';
import menuedit from './menu-edit';
export default {
  data () {
    return {
      menuItem: ''
    };
  },
  mounted () {
    this.menuItemInfo();
  },
  methods: {
    menuItemInfo: function (res) {
      this.menuItem = res;
    }
  },
  components: {
    menulist,
    menuedit
  }
};
</script>
