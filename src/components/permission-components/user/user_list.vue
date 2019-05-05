<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">用户管理</span></div>
    <div class="h-panel-body">
      <p>
        <Button color="primary" icon="h-icon-plus" :disabled="level>=5" @click="open('0')">添加用户</Button>
      </p>
      <Table :loading="loading" :datas="datas">
        <TableItem :width="100" title="序号" fixed="left">
          <template slot-scope="{index}">{{index + 1}} </template>
        </TableItem>
        <TableItem :width="100" prop="account" title="账号" fixed="left"></TableItem>
        <TableItem :width="200" prop="name" title="名称" ></TableItem>
        <TableItem :width="300"  title="角色">
          <template slot-scope="{data}">
            <ul v-if="data.role==null||data.role.length===0">
              <span class="h-tag h-tag-gray">麻瓜</span>
            </ul>
            <ul v-else>
              <span v-for="item in data.role" class="h-tag h-tag-yellow">{{item.name}}</span>
            </ul>
          </template>
        </TableItem>
        <TableItem :width="300" prop="email" title="邮件" ></TableItem>
        <TableItem :width="300" prop="mobile" title="手机号码" ></TableItem>
        <TableItem :width="100" prop="sex" title="性别" ></TableItem>
        <TableItem :width="200" prop="create_time" title="创建时间" :render="tranCreateTime" ></TableItem>
        <TableItem :width="200" prop="update_time" title="修改时间" :render="tranUpdateTime" ></TableItem>
        <TableItem title="操作" :width="100" fixed="right">
          <template slot-scope="{data}">
            <button class="h-btn h-btn-s h-btn-primary" :disabled="level>=data.level"  @click="open('1',data)"><i class="h-icon-edit"></i></button>
            <button class="h-btn h-btn-s h-btn-red"  :disabled="level>=data.level" @click="remove(data.id,data.level)"><i class="h-icon-trash"></i></button>
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
import EditWindow from './user_edit';
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
  mounted() {
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

    remove(id, level) {
      if (this.level >= level) {
        this.$Message['error']('坏人你想干嘛');
      } else {
        this.$Confirm('确定不是你手残点到的？', '删除角色').then(() => {
          Ajax.post('/sys/user/delete', { id: id }).then(resp => {
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
        if (res.code === 0) {
          maxpri = res.data + 1;
        }
      }
      return maxpri;
    },

    getRoles: async function () {
      let roles = [];
      let res = await Ajax.get('/sys/role/getRoles');
      if (res.ok) {
        if (res.code === 0) {
          roles = res.data;
        }
      }
      return roles;
    },

    getLevels: async function () {
      let levels = [];
      let res = await Ajax.get('/sys/role/getLevel');
      if (res.ok) {
        if (res.code === 0) {
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
      return time.replace('T', ' ').substring(0, 16);
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
      let resp = await Ajax.post('/sys/user/listPage', param);
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
      if (data != null && data.level != null && this.level >= data.level) {
        this.$Message['error']('坏人你想干嘛');
      } else {
        var datas = {};
        if (data != null && data.is_base === '1') {
          this.$Message['error']('坏人你想干嘛');
        } else {
          if (type === 1) {
            data.levels = await this.getLevels();
            data.roles = await this.getRoles();
            let roleCodes = [];
            if (data.rol != null && data.role.length > 0) {
              for (var i = 0; i < data.role.length; i++) {
                if (data.role[i].code != null && data.role[i].code !== '') {
                  roleCodes.push(data.role[i].code);
                }
              }
            }
            data.roleCodes = roleCodes;
            datas = { title: '修改', modelData: data };
          } else {
            datas = { title: '新增', modelData: { name: '', account: '', email: '', password: '123456', roles: await this.getRoles(), roleCodes: [], mobile: '', sex: '男' } };
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
    }
  },
  computed: {
  }
};
</script>
