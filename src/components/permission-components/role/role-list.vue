<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">角色管理</span></div>
    <div class="h-panel-body">
      <p>
        <Button color="primary" icon="h-icon-plus" :disabled="level>=4"  @click="open('0')">添加角色</Button>
      </p>
      <Table :loading="loading" :datas="datas">
        <TableItem :width="100" title="序号">
          <template slot-scope="{index}">{{index+1}} </template>
        </TableItem>
        <TableItem :width="200" prop="name" title="角色名称"></TableItem>
        <TableItem :width="200" prop="code" title="角色标识"></TableItem>
        <TableItem :width="100" prop="level" title="级别" sort="auto" sortProp='level'></TableItem>
        <TableItem :width="200" prop="create_time" title="创建时间" :render="tranCreateTime" sort="auto" sortProp='create_time'></TableItem>
        <TableItem :width="200" prop="update_time" title="修改时间" :render="tranUpdateTime" sort="auto" sortProp='update_time'></TableItem>
        <TableItem :width="350" prop="remark" title="备注"></TableItem>
        <TableItem title="操作" :width="150" fixed="right">
          <template slot-scope="{data}">
            <button class="h-btn h-btn-s h-btn-green"   @click="addPermission(data)"><i class="h-icon-plus"></i></button>
            <button class="h-btn h-btn-s h-btn-primary" :disabled="(data.is_base == 1)||(data.maxPower>=data.level)" @click="open('1',data)"><i class="h-icon-edit"></i></button>
            <button class="h-btn h-btn-s h-btn-red"  :disabled="(data.is_base == 1)||(data.maxPower>=data.level)" @click="remove(data.id,data.is_base)"><i class="h-icon-trash"></i></button>
          </template>
        </TableItem>
      </Table>
      <p></p>
      <Pagination v-if="pagination.total>0" :size="pagination.size" :cur="pagination.page" align="right" :total="pagination.total" @change="changePage" />
    </div>
  </div>
</template>
<script>
import Ajax from '../../../js/common/ajax';
import EditWindow from './role_edit';
import MenuList from '../menu/menu-choose';
export default {
  data() {
    return {
      level: '',
      keyword: '',
      index: 0,
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      datas: [],
      loading: false,
      pageData: {}
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    init() {
      this.getData(true);
      this.level = this.$store.state.User.level;
    },
    changePage(page) {
      this.pagination.page = page.cur;
      this.pagination.size = page.size;
      this.getData(false);
    },

    remove(id, isbase) {
      if (isbase == '1') {
        this.$Message['error']('坏人你想干嘛');
      } else {
        this.$Confirm('确定不是你手残点到的？', '删除角色').then(() => {
          Ajax.post('/sys/role/delete', { id: id }).then(resp => {
            if (resp.ok) {
              if (resp.code == '0') {
                this.$Message['success']('删除成功');
                this.init();
              } else {
                this.$Message['error'](resp.messgae);
              }
            } else {
              this.$Message['error']('删除失败');
            }
          });
        }).catch(() => {
        });
      }
    },

    getMaxPri: async function () {
      let maxpri = 0;
      let res = await Ajax.get('/sys/role/maxpri');
      if (res.ok) {
        if (res.code == 0) {
          maxpri = res.data + 1;
        }
      }
      return maxpri;
    },

    getLevels: async function () {
      let levels = [];
      let res = await Ajax.get('/sys/role/getLevel');
      if (res.ok) {
        if (res.code == 0) {
          levels = res.data;
        }
      }
      return levels;
    },

    tranCreateTime(data) {
      return this.tranTime(data.create_time);
    },

    tranUpdateTime(data) {
      return this.tranTime(data.update_time);
    },

    tranTime(time) {
      return time.replace('T', ' ').substring(0,16);
    },

    async getData(reload) {
      if (reload) {
        this.index = 0;
        this.pagination.page = 1;
      } else {
        // this.index = Math.floor(this.pagination.total / (this.pagination.page -1));
        this.index = (this.pagination.page - 1) * this.pagination.size;
      }
      this.loading = true;
      let param = { index: this.index, pageSize: this.pagination.size };
      let resp = await Ajax.post('/sys/role/listPage',param);
      if (resp.ok) {
        if (resp.code == '0') {
          this.datas = resp.data.items;
          this.pagination.total = resp.data.total;
          this.loading = false;
        } else {
          this.loading = false;
        }
      } else {
        this.loading = false;
      }
    },
    async open(type, data) {
      if (this.level >= 4) {
        this.$Message['error']('坏人你想干嘛');
      } else {
        var datas = {};
        if (data != null && data.is_base === '1') {
          this.$Message['error']('坏人你想干嘛');
        } else {
          if (type == 1) {
            data.levels = await this.getLevels();
            datas = { title: '修改', modelData: data };
          } else {
            datas = { title: '新增', modelData: { name: '', code: '', remark: '', pri: await this.getMaxPri(), levels: await this.getLevels() } };
          }
          this.$Modal({
            component: {
              vue: EditWindow,
              datas: datas
            },
            middle: true,
            width: 800,
            closeOnMask: false,
            events: {
              success: (modal) => {
                this.init();
              }
            }
          });
        }
      }
    },
    addPermission: function (data) {
      this.$Modal({
        component: {
          vue: MenuList,
          datas: { level: data.level, roleId: data.id, myLevel: this.level }
        },
        middle: true,
        width: 1000,
        hasCloseIcon: true,
        closeOnMask: false,
        events: {
          success: (modal, data) => {
            this.menuItem.icon = data;
          }
        }
      });
    }
  },
  computed: {
  }
};
</script>
