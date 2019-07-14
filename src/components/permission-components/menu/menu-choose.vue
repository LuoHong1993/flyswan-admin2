<template>
  <div class="menu-choose-vue h-panel frame-page" ref="menuList">
    <div class="h-panel-body">
      <div><Tree :option="param" ref="menus" :toggleOnSelect=true  @loadDataSuccess="loadDataSuccess" @select="select" :multiple="true"></Tree></div>
      <div style="text-align: center">
        <button class="h-btn h-btn-primary" @click="saveMenu" :disabled="level==='1'">保存</button>
        <button class="h-btn h-btn-white" @click="cancelMenu">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    level: String
  },
  data () {
    return {
      item: {},
      param: {
        keyName: 'id',
        parentName: 'parent_id',
        titleName: 'name',
        dataMode: 'list',
        getTotalDatas: (resolve) => {
          R.Menu.commonlist().then(resp => {
            let list = resp.data;
            this.item = list[0];
            resolve(list);
          });
        }
      }
    };
  },
  mounted () {
    this.$refs.menuList.style.maxHeight = (document.body.clientHeight * 0.7) + 'px';
  },
  methods: {
    loadDataSuccess () {
      this.$refs.menus.updateSelect(this.item.id);
      this.$refs.menus.expandAll();
    },
    select (data) {
    },
    refresh () {
      this.$refs.menus.refresh();
    },
    saveMenu () {
    },
    cancelMenu () {
      this.$emit('close');
    }
  }
};
</script>
