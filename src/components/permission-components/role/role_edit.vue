<template>
  <div>
    <header class="h-modal-header">{{title}}角色</header>
    <div v-width="600">
      <Form :label-width="110"  :model="data" :rules="validationRules" ref="form" :top="0.8" showErrorTip>
        <FormItem label="角色名称" prop="name">
          <input type="text" placeholder="请输入角色名称，限20字内" v-wordlimit='20' v-model="data.name" />
          <template slot="error">
            <span class="link" ></span>
          </template>
        </FormItem>
        <FormItem label="角色标识" prop="code">
          <input type="text" placeholder="请输入角色标识，限20字内" v-wordlimit='20' v-model="data.code" />
        </FormItem>
        <FormItem label="级别" prop="level">
          <Select v-model="data.level" :datas="data.levels" placeholder="请选择级别" null-option-text="--请选择级别--"></Select>
        </FormItem>
        <FormItem label="排序" >
          <NumberInput  :useOperate="true" v-width="200" v-model="data.pri" :min=1></NumberInput>
        </FormItem>
        <FormItem label="备注" >
          <textarea v-model="data.remark" placeholder="不说些什么吗？"></textarea>
        </FormItem>
      </Form>
    </div>
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="success">确定</button>
      <button class="h-btn" @click="close">关闭</button>
    </footer>
    <Loading text="保存中..." :loading="loading" style="text-align: center"></Loading>
  </div>
</template>

<script>
import Ajax from '../../../js/common/ajax';
export default {
  props: {
    title: String,
    modelData: Object
  },
  mounted () {
    if (this.title == '修改') {
      this.apiUrl = '/sys/role/update';
    } else {
      this.apiUrl = '/sys/role/add';
    }
  },
  data () {
    return {
      loading: false,
      data: this.modelData,
      validationRules: {
        rules: {
        },
        required: [
          'name',
          'code',
          'level'
        ]
      },
      apiUrl: ''
    };
  },
  methods: {
    success () {
      if (this.checkForm()) {
        let param = {
          id: this.data.id,
          name: this.data.name,
          code: this.data.code,
          pri: this.data.pri,
          remark: this.data.remark,
          level: this.data.level
        };
        this.loading = true;
        Ajax.post(this.apiUrl, param).then(resp => {
          if (resp.ok) {
            if (resp.code == '0') {
              this.$Message['success']('保存成功');
              this.loading = false;
              this.$emit('event', 'success');
              this.close();
            } else {
              this.$Message['error'](resp.message);
              this.loading = false;
            }
          } else {
            this.$Message['error'](`新增失败`);
            this.loading = false;
          }
        });
      }
      // this.$emit('success', this.value);
      // this.close();
    },
    checkForm() {
      if (this.data.name == null || this.data.name == '') {
        this.$Message['error'](`角色名称不能为空`);
        return false;
      } else if (this.data.name.length > 20) {
        this.$Message['error'](`角色名称限20字`);
        return false;
      } else if (this.data.code == null || this.data.code == '') {
        this.$Message['error'](`角色标识不能为空`);
        return false;
      } else if (this.data.code.length > 20) {
        this.$Message['error'](`角色标识限20字`);
        return false;
      } else if (this.data.level == null || this.data.level == '') {
        this.$Message['error'](`请选择级别`);
        return false;
      } else if (this.data.remark.length > 200) {
        this.$Message['error'](`备注写这么多，你废话可真多！`);
        return false;
      }
      return true;
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
