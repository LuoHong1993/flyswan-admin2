<template>
  <div v-width="800" v-if="menuItem">
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
    <FormItem label="标识" prop="key">
      <input type="text"  v-model="menuItem.key" />
      <template slot="error">
        <span class="link" ></span>
      </template>
    </FormItem>
    <FormItem label="图标" prop="icon">
      <div class="h-input-group" v-width="680">
        <span class="h-input-addon" style="width: 40px;cursor: pointer" @click="chooseIcon"><i class="h-icon-home"></i></span>
        <input type="text"  v-model="menuItem.icon" />
      </div>
    </FormItem>
    <FormItem label="排序" prop="pri">
      <input type="text"  v-model="menuItem.pri" />
      <template slot="error">
        <span class="link" ></span>
      </template>
    </FormItem>
    <FormItem label="备注" prop="mark">
      <input type="text"  v-model="menuItem.mark" />
      <template slot="error">
        <span class="link" ></span>
      </template>
    </FormItem>
    <FormItem label="组件" prop="component">
      <input type="text"  v-model="menuItem.component" />
      <template slot="error">
        <span class="link" ></span>
      </template>
    </FormItem>
    <FormItem label="访问路径" prop="path">
      <input type="text"  v-model="menuItem.path" />
      <template slot="error">
        <span class="link" ></span>
      </template>
    </FormItem>
    <FormItem label="打开方式" prop="open_type">
      <input type="text"  v-model="menuItem.open_type" />
      <template slot="error">
        <span class="link" ></span>
      </template>
    </FormItem>
  </Form>
  </div>
</template>
<script>
import IconsWindow from '../../other/icons';
export default {
  props: ['menuItem'],
  data () {
    return {
      types: [ { code: '0', name: '父栏目' }, { code: '1', name: '组件' }, { code: '2', name: 'frame' } ]
    };
  },
  mounted () {

  },
  methods: {
    chooseIcon: function () {
      this.$Modal({
        component: {
          vue: IconsWindow
        },
        middle: true,
        width: 1200,
        hasCloseIcon: true,
        closeOnMask: false
      });
    }
  }
};
</script>
