<template>
  <div><Tree :option="param" ref="menus" :toggleOnSelect=true s @loadDataSuccess="loadDataSuccess"></Tree></div>
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
    initMenu () {
      R.Menu.commonlist().then(resp => {
        if (resp.ok) {
          if (resp.code === 0) {
            this.param = {
              keyName: 'id',
              parentName: 'parent_id',
              titleName: 'name',
              dataMode: 'list',
              datas: resp.data
            };
            this.open(resp.data[0]);
          }
        }
      });
    },
    loadDataSuccess () {
      this.$emit('menuItemInfo', this.item);
      this.$refs.menus.expandAll();
    }
  }
};
</script>
