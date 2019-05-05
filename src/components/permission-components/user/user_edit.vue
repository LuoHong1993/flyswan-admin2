<template>
  <div>
    <header class="h-modal-header">{{title}}用户</header>
    <div v-width="600">
      <Form :label-width="110"  :model="data" :rules="validationRules" ref="form" :top="0.8" showErrorTip>
        <FormItem label="名称" prop="name">
          <input type="text" placeholder="请输入用户名称，限16字内" v-wordlimit='16' v-model="data.name" />
          <template slot="error">
            <span class="link" ></span>
          </template>
        </FormItem>
        <FormItem label="账号" prop="account">
          <input type="text" placeholder="请输入用户账号，限16字内" v-wordlimit='16' v-model="data.account" />
        </FormItem>
        <FormItem label="密码" prop="password">
          <input type="password"  placeholder="请输入用户密码，限20字内" v-wordlimit='20' v-model="data.password" v-width="300" :disabled="defultPwd=='yes'"/>
          <h-switch  v-model="defultPwd" trueValue="yes" falseValue="no" @change="usePwd()">是否使用默认密码</h-switch>
        </FormItem>
        <FormItem label="性别" prop="level">
          <Select v-model="data.sex" :datas="sexType" placeholder="请选择性别" null-option-text="--请选择性别--"></Select>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <input type="text" placeholder="请输入用户邮箱，限50字内" v-wordlimit='50' v-model="data.email" />
        </FormItem>
        <FormItem label="手机号码" prop="mobile">
          <input type="text" placeholder="请输入用户手机号码，限15字内" v-wordlimit='15' v-model="data.mobile" />
        </FormItem>
        <FormItem label="所属角色" prop="roleCodes">
          <Select keyName="code" titleName="name" v-model="data.roleCodes" :datas="data.roles" placeholder="请选择角色" null-option-text="--请选择角色--" :multiple="true">
            <template slot-scope="{item}" slot="item">
              <div>{{item.name}}</div>
            </template>
          </Select>
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
  mounted() {
    if (this.title == '修改') {
      this.apiUrl = '/sys/user/update';
      this.defultPwd = 'no';
    } else {
      this.apiUrl = '/sys/user/add';
    }
  },
  data() {
    return {
      loading: false,
      data: this.modelData,
      defultPwd: 'yes',
      sexType: ['男', '直男', '暖男', '淑女', '腐女', '伪娘', '大屌萝莉', '未知生物'],
      validationRules: {
        rules: {
        },
        required: [
          'name',
          'account',
          'password',
          'email',
          'sex'
        ],
        email: ['email']
      },
      apiUrl: ''
    };
  },
  methods: {
    success() {
      if (this.checkForm()) {
        let param = {
          id: this.data.id,
          name: this.data.name,
          account: this.data.account,
          password: this.data.password,
          email: this.data.email,
          sex: this.data.sex,
          mobile: this.data.mobile,
          role: JSON.stringify(this.data.roleCodes)
        };
        this.loading = true;
        Ajax.post(this.apiUrl, param).then(resp => {
          if (resp.ok) {
            if (resp.code === '0') {
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
    },
    checkForm() {
      if (this.data.name == null || this.data.name === '') {
        this.$Message['error'](`名称不能为空`);
        return false;
      } else if (this.data.name.length > 16) {
        this.$Message['error'](`名称限16字`);
        return false;
      } else if (this.data.account == null || this.data.account === '') {
        this.$Message['error'](`账号不能为空`);
        return false;
      } else if (this.data.account.length > 16) {
        this.$Message['error'](`账号限16字`);
        return false;
      } else if (this.data.password == null || this.data.password === '') {
        this.$Message['error'](`密码不能为空`);
        return false;
      } else if (this.data.password.length > 20) {
        this.$Message['error'](`密码限20字`);
        return false;
      } else if (this.data.email == null || this.data.email === '') {
        this.$Message['error'](`邮件不能为空`);
        return false;
      } else if (this.data.email.length > 50) {
        this.$Message['error'](`邮件限50字`);
        return false;
      }
      return true;
    },
    usePwd() {
      if (this.defultPwd === 'yes') {
        this.data.password = '123456';
      }
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
