<template>
  <div><Tree :option="param" ref="menus" :toggleOnSelect=false  @loadDataSuccess="loadDataSuccess" @select="select" ></Tree></div>
</template>

<script>
export default {
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
            // param中的dataMode同样对这里的数据有效
            let list = resp.data;
            this.item = list[0];
            resolve(list);
          });
        }
      }
    };
  },
  mounted () {
  },
  methods: {
    loadDataSuccess () {
      this.$refs.menus.updateSelect(this.item.id);
      this.$emit('menuItemInfo', this.item.id);
      this.$refs.menus.expandAll();
    },
    select (data) {
      this.$emit('menuItemInfo', data.id);
    },
    refresh () {
      this.$refs.menus.refresh();
      this.$emit('menuItemInfo', '0001');
    }
  }
};
</script>
