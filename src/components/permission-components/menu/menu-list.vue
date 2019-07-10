<template>
  <Tree :option="param" ref="menus" :toggleOnSelect=true @open="open"></Tree>
</template>

<script>
export default {
  data () {
    return {
      param: {
        keyName: 'id',
        parentName: 'parent_id',
        titleName: 'name',
        dataMode: 'list',
        datas: []
      }
    };
  },
  mounted () {
    this.initMenu();
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
          }
        }
      });
    },
    open (data) {
      alert(JSON.stringify(data))
      this.$emit('test', data.name);
    }
  }
};
</script>
