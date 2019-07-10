<template>
  <Row :space="9">
    <Cell width="8" >
      <Row :space-y="9">
        <Cell width="24" >
          <Button color="primary" icon="h-icon-plus" >添加</Button>
        </Cell>
        <Cell width="24" ><menulist v-on:test="show"></menulist></Cell>
      </Row>
    </Cell>
    <Cell width="16" ><div><menuedit :test="test"></menuedit></div></Cell>
  </Row>
</template>

<script>
import menulist from './menu-list';
import menuedit from './menu-edit';
export default {
  data () {
    return {
      test: ''
    };
  },
  mounted () {
    this.show();
  },
  methods: {
    show:function(res){
      this.test = res
    }
  },
  components: {
    menulist,menuedit
  }
};
</script>
