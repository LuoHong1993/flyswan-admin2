<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">登录日志</span></div>
    <div class="h-panel-body">

      <Table :loading="loading" :datas="datas">
        <TableItem :width="100" title="序号">
          <template slot-scope="{index}">{{index+1}} </template>
        </TableItem>
        <TableItem :width="200" prop="operateAccount" title="登录账号" sort="auto"></TableItem>
        <TableItem :width="200" prop="operateTime" title="登录时间" sort="auto"></TableItem>
        <TableItem :width="200" prop="ip" title="ip" sort="auto"></TableItem>
        <TableItem :width="200"  sortProp="city"  title="地址" sort="auto">
          <template slot-scope="{data}">

              <span v-if="data.country!='' && data.country!=null">{{data.country}}</span>
              <span v-if="data.region!='' && data.region!=null" style="margin-left: 14px">{{data.region}}</span>
              <span v-if="data.city!='' && data.city!=null" style="margin-left: 14px">{{data.city}}</span>
          </template>
        </TableItem>
        <TableItem :width="200" sortProp="result"  title="登录结果" sort="auto" >
          <template slot-scope="{data}">
            <ul v-if="data.result=='0'">
              <span class="h-tag h-tag-bg-green">成功</span>
            </ul>
            <ul v-else>
              <span class="h-tag h-tag-bg-red">失败</span>
            </ul>
          </template>
        </TableItem>
      </Table>
      <p></p>
      <Pagination v-if="pagination.total>0" :size="pagination.size" :cur="pagination.page" align="right" :total="pagination.total" @change="changePage" />
    </div>
  </div>
</template>
<script>
import Ajax from '../../js/common/ajax';
export default {
  data() {
    return {
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
    },
    changePage(page) {
      this.pagination.page = page.cur;
      this.pagination.size = page.size;
      this.getData(false);
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
      let param = {index: this.index, pageSize: this.pagination.size };
      let resp = await Ajax.post('/sys/log/loginLogPage', param);
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
    }
  },
  computed: {
  }
};
</script>
