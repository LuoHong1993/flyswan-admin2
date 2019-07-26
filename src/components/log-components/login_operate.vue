<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">操作日志</span></div>
    <div class="h-panel-body">
      <Row :space="9">
        <Cell width="3" >
          <Row :space-y="9">
            <Tree  :option="modules" ref="modules" :toggleOnSelect=false  @loadDataSuccess="loadDataSuccess" @select="select"></Tree>
          </Row>
        </Cell>
        <Cell width="21" >
          <Table :loading="loading" :datas="datas">
            <TableItem :width="80" title="序号" fixed="left">
              <template slot-scope="{index}">{{index+1}} </template>
            </TableItem>
            <TableItem :width="120" prop="operateAccount" title="操作账号" sort="auto" fixed="left"></TableItem>
            <TableItem :width="180" sortProp="operateModule" title="操作模块" sort="auto">
              <template slot-scope="{data}">
                <span>{{getModule(data.operateModule)}}</span>
              </template>
            </TableItem>
            <TableItem :width="150" prop="operateObject" title="操作内容"></TableItem>
            <TableItem :width="150" prop="ip" title="ip" sort="auto"></TableItem>
            <TableItem :width="200" prop="operateTime" title="操作时间" sort="auto"></TableItem>
            <TableItem :width="300"  title="操作方法">
              <template slot-scope="{data}">
                <span style="color: #bcbcbc">{{data.operateMethod}}</span>
              </template>
            </TableItem>
            <TableItem :width="600" title="操作参数">
              <template slot-scope="{data}">
                <span style="color: #bcbcbc">{{data.operateParam}}</span>
              </template>
            </TableItem>
            <TableItem :width="150" prop="time" title="耗时(ms)" sort="auto" fixed="right"></TableItem>
            <TableItem :width="100" sortProp="result"  title="操作结果" sort="auto" fixed="right">
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
        </Cell>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      index: 0,
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      module: 'all',
      list: [],
      modules: {
        keyName: 'value',
        parentName: 'parent_id',
        titleName: 'name',
        dataMode: 'list',
        getTotalDatas: (resolve) => {
          R.Log.operareModule().then(resp => {
            this.list = resp.data;
            this.list.push({ value: '0', name: '全部' });
            resolve(this.list);
          });
        }
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
    init () {
      this.getData(true);
    },
    changePage (page) {
      this.pagination.page = page.cur;
      this.pagination.size = page.size;
      this.getData(false);
    },
    loadDataSuccess () {
      this.$refs.modules.updateSelect('0');
      this.$refs.modules.expandAll();
    },
    getModule (value) {
      for (var i = 0; i < this.list.length; i++) {
        var item = this.list[i];
        if (item.value === value) {
          return item.name;
        }
      }
      return '';
    },
    async getData (reload) {
      if (reload) {
        this.index = 0;
        this.pagination.page = 1;
      } else {
        // this.index = Math.floor(this.pagination.total / (this.pagination.page -1));
        this.index = (this.pagination.page - 1) * this.pagination.size;
      }
      this.loading = true;
      let param = { index: this.index, pageSize: this.pagination.size, module: this.module };
      let resp = await R.Log.operateLogPage(param);
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
    select (data) {
      this.module = data.value;
      this.getData(true);
    }
  },
  computed: {
  }
};
</script>
