<template>
  <div class="menu-choose-vue h-panel frame-page" ref="menuList">
    <Loading text="保存中..." :loading="loading"></Loading>
    <div class="h-panel-body">
      <div><Tree :option="param" ref="menus" :toggleOnSelect=false  @loadDataSuccess="loadDataSuccess" @select="select" :multiple="true" choose-mode="some" ></Tree></div>
      <div style="text-align: center">
        <button class="h-btn h-btn-primary" @click="saveMenu" :disabled="myLevel>level">保存</button>
        <button class="h-btn h-btn-white" @click="cancelMenu">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    level: String,
    roleId: String,
    myLevel: String
  },
  data () {
    return {
      loading: false,
      chooseed: null,
      param: {
        keyName: 'id',
        parentName: 'parent_id',
        titleName: 'name',
        dataMode: 'list',
        getTotalDatas: (resolve) => {
          R.Menu.commonlist().then(resp => {
            let list = [];
            if (resp.data.length > 0) {
              for (let i = 0; i < resp.data.length; i++) {
                let item = resp.data[i];
                if (this.myLevel > this.level) {
                  item.disabled = true;
                }
                list.push(item);
              }
            }
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
    async loadDataSuccess () {
      // this.$refs.menus.updateSelect(this.item.id);
      this.$refs.menus.expandAll();
      if (await this.getMenuIdByRole() != null ) {
        this.$refs.menus.updateChoose(this.chooseed);
      }
    },
    select (data) {
    },
    refresh () {
      this.$refs.menus.refresh();
    },
    saveMenu () {
      this.loading = true;
      let list = [];
      let options = this.$refs.menus.getFullChoose();
      if (options.length > 0) {
        for (let i = 0; i < options.length; i++) {
          let item = options[i];
          list.push(item.id);
        }
      }
      let param = {
        id: this.roleId,
        menuIds: JSON.stringify(list)
      };
      R.Role.saveRoleMenu(param).then(async resp => {
        if (resp.ok) {
          if (resp.code === 0) {
            this.loading = false;
            this.$Message['success']('保存成功，需要您重新刷新整个页面才能生效');
            this.$emit('close');
          } else {
            this.loading = false;
            this.$Message['error'](resp.message);
          }
        } else {
          this.loading = false;
          this.$Message['error']('保存失败');
        }
      });
    },
    cancelMenu () {
      this.$emit('close');
    },
    async getMenuIdByRole () {
      let resp = await R.Role.getMenuIdByRole( { id: this.roleId });
      if (resp.ok) {
        if (resp.code === 0) {
          this.chooseed = resp.data;
          if (JSON.stringify(this.chooseed) !== [] && JSON.stringify(this.chooseed) !== '[]') {
            return resp.data;
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }
};
</script>
