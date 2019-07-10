<template>
  <div v-width="800">
  <Form :label-width="120"  :model="menuItem" showErrorTip>
    <FormItem label="父级节点" prop="parent_id">
      <input type="text"  v-model="menuItem.parent_id" />
      <template slot="error">
        <span class="link" ></span>
      </template>
    </FormItem>
    <FormItem label="名称" prop="name">
      <input type="text"  v-model="menuItem.name" />
      <template slot="error">
        <span class="link" ></span>
      </template>
    </FormItem>
    <FormItem label="类型" prop="name">
      <Select  keyName="code" titleName="name" v-model="menuItem.type" placeholder="请选择类型" null-option-text="--请选择类型--" :datas="types">
        <template slot-scope="{item}" slot="item">
          <div>{{item.name}}</div>
        </template>
      </Select>
    </FormItem>
  </Form>
  </div>
</template>

<script>
export default {
  props: ['menuItem'],
  data () {
    return {
      types: [ { code: '0', name: '父栏目' }, { code: '1', name: '组件' }, { code: '2', name: 'frame' } ]
    };
  },
  mounted () {

  }
};
</script>
