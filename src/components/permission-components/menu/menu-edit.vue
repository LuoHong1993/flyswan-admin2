<template>
  <div v-width="800" v-if="menuItem">
  <Form :label-width="200"  :model="menuItem" showErrorTip>
    <FormItem label="父级节点" prop="parent_id">
      <TreePicker :option="treepickerparam" :useConfirm="false" :disabled="menuItem.is_base==='1'" ref="treepicker" v-model="menuItem.parent_id" @select="selectParent"></TreePicker>
    </FormItem>
    <FormItem label="名称" prop="name">
      <input type="text"  v-model="menuItem.name"/>
      <template slot="error">
        <span class="link" ></span>
      </template>
    </FormItem>
    <FormItem label="标识" prop="code">
      <input type="text"  v-model="menuItem.code" :disabled="menuItem.is_base==='1'"/>
      <template slot="error">
        <span class="link" ></span>
      </template>
    </FormItem>
    <FormItem label="图标" prop="icon">
      <div class="h-input-group" v-width="600" @click="chooseIcon" style="cursor: pointer">
        <span class="h-input-addon" style="width: 40px;"><i :class="menuItem.icon"></i></span>
        <input type="text"  v-model="menuItem.icon" readonly="readonly" />
      </div>
    </FormItem>
    <FormItem label="同级排序" prop="pri">
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
    <FormItem label="类型" prop="name">
      <Select  keyName="code" titleName="name" v-model="menuItem.type" placeholder="请选择类型" null-option-text="--请选择类型--" :datas="types" :disabled="menuItem.is_base==='1'">
        <template slot-scope="{item}" slot="item">
          <div>{{item.name}}</div>
        </template>
      </Select>
    </FormItem>
    <FormItem :label="menuItem.type==='1'?'组件':'外部地址'" prop="component" v-if="menuItem.type!=='0'">
      <input type="text"  v-model="menuItem.component" :disabled="menuItem.is_base==='1'"/>
      <template slot="error">
        <span class="link" ></span>
      </template>
    </FormItem>
    <FormItem label="访问路径" prop="path" v-if="menuItem.type!=='0'">
      <input type="text"  v-model="menuItem.path" :disabled="menuItem.is_base==='1'"/>
      <template slot="error">
        <span class="link" ></span>
      </template>
    </FormItem>
    <FormItem label="打开方式" prop="open_type" v-if="menuItem.type!=='0'">
      <Select  keyName="code" titleName="name" v-model="menuItem.open_type" placeholder="请选择打开类型" null-option-text="--请选择打开类型--" :datas="openTypes" :disabled="menuItem.is_base==='1'">
        <template slot-scope="{openTypeItem}" slot="openTypeItem">
          <div>{{openTypeItem.name}}</div>
        </template>
      </Select>
    </FormItem>
  </Form>
    <div style="text-align: center">
      <button class="h-btn h-btn-primary" @click="saveMenu" :disabled="menuItem.is_base==='1'">保存</button>
      <button class="h-btn h-btn-red" @click="deleteMenu" v-if="menuId!=='new'" :disabled="menuItem.is_base==='1'">删除</button>
      <button class="h-btn h-btn-white" @click="cancelMenu" v-if="menuId==='new'">取消</button>
    </div>
  </div>
</template>
<script>
import IconsWindow from '../../other/icons';
import store from '../../../js/vuex/store';
export default {
  props: ['menuId'],
  data () {
    return {
      menuItem: {},
      oldMenuId: '0001',
      types: [ { code: '0', name: '父栏目' }, { code: '1', name: '组件' }, { code: '2', name: '外部页面' } ],
      openTypes: [{ code: '0', name: '框内打开' }, { code: '1', name: '新窗口' }],
      treepickerparam: {
        keyName: 'id',
        parentName: 'parent_id',
        titleName: 'name',
        dataMode: 'list',
        getTotalDatas: (resolve) => {
          R.Menu.commonlist().then(resp => {
            let list = [];
            list.push({ id: '0', name: '管理系统' });
            for (var i = 0; i < resp.data.length; i++) {
              var dataItem = resp.data[i];
              if (dataItem.type !== '0') {
                dataItem['disabled'] = true;
              }
              list.push(dataItem);
            }
            resolve(list);
          });
        }
      }
    };
  },
  mounted () {
    this.getMenuItem();
  },
  watch: {
    menuId () {
      if (this.menuId === 'new') {
        this.menuItem = {
          component: '',
          icon: '',
          id: '',
          is_base: '0',
          code: '',
          mark: '',
          name: '',
          open_type: '0',
          parent_id: '0',
          path: '',
          pri: '',
          type: '1'
        };
      } else {
        this.oldMenuId = this.menuId;
        this.getMenuItem();
      }
    }
  },
  methods: {
    getMenuItem: function () {
      R.Menu.getMenuItemById({ id: (this.menuId == null || this.menuId === undefined || this.menuId === '') ? '0001' : this.menuId }).then(resp => {
        if (resp.ok) {
          if (resp.code === 0) {
            this.menuItem = resp.data;
          }
        }
      });
    },
    chooseIcon: function () {
      this.$Modal({
        component: {
          vue: IconsWindow
        },
        middle: true,
        width: 1300,
        hasCloseIcon: true,
        closeOnMask: false,
        events: {
          success: (modal, data) => {
            this.menuItem.icon = data;
          }
        }
      });
    },
    saveMenu: function () {
      R.Menu.save(this.menuItem).then(resp => {
        if (resp.ok) {
          if (resp.code === 0) {
            this.initMenu();
            this.$emit('updatedata', '0');
            this.$Message['success']('保存成功');
          } else {
            this.$Message['error'](resp.message);
          }
        } else {
          this.$Message['error']('保存失败');
        }
      });
    },
    deleteMenu: function () {
    },
    cancelMenu: function () {
      this.$emit('updatedata', this.oldMenuId);
    },
    selectParent: function (data) {
      this.menuItem.parent_id = data.id;
    },
    initMenu () {
      R.Menu.list().then(resp => {
        if (resp.ok) {
          if (resp.code === 0) {
            store.dispatch('updateMenu', resp.data);
          }
        }
      });
    },
  }
};
</script>
