<template>
  <div class="base_table" :class="{'stripe_color': stripe == 'stripe'}">
    <!--<Table border :columns="data[0].t_head" :data="data[0].t_body"></Table>-->
    <!--一列表格-->
    <div class="" v-if="config_data.colsNum == '1'" v-loading="tableDataLen">
      <iview-table :stripe="config_data.stripe"
                   :size="config_data.size"
                   :show-header="config_data.showheader"
                   :disabled-hover="config_data.disabledhover"
                   :highlight-row="config_data.highlightrow"
                   @on-current-change="currentChange"
                   @on-row-dblclick="dbClickRow"
                   @on-row-click="clickRow"
                   :columns="tableData.t_head"
                   :data="tableData.t_body">
        <template slot="header">
          <slot name="header"></slot>
        </template>
        <template v-for="(slot_item, slot_index) in tableData.t_head"
                  v-if="slot_item.table_slot && slot_item.table_slot != ''"
                  :slot="slot_item.table_slot" slot-scope="rowData">
          <div class="sort_num" v-if="slot_item.table_slot == 'sort_num'">
            <i class="iconfont icon-volume_high" v-if="rowData.rowData.playStatus == 'play'"></i>
            <i class="iconfont icon-volume_close" v-else-if="rowData.rowData.playStatus == 'pause'"></i>
            <span v-else>{{rowData.rowData.sort_num || '0'}}</span>
          </div>
          <slot v-else :name="slot_item.table_slot" :data="rowData.rowData"></slot>
        </template>
        <template slot="footer">
          <slot name="footer"></slot>
        </template>
      </iview-table>
    </div>

    <!--两列表格-->
    <div class="base_table_cols_two" v-if="config_data.colsNum == '2'"
         v-loading="tableDataLen">
      <div class="base_table_cols_two_item_one">
        <iview-table :stripe="config_data.stripe"
                     :size="config_data.size"
                     :show-header="config_data.showheader"
                     :disabled-hover="config_data.disabledhover"
                     :highlight-row="config_data.highlightrow"
                     @on-current-change="currentChange"
                     @on-row-dblclick="dbClickRow"
                     @on-row-click="clickRow"
                     :columns="tableData.t_head[0]"
                     :data="tableData.t_body[0]">

          <template v-for="(slot_item, slot_index) in tableData.t_head[0]"
                    v-if="slot_item.table_slot && slot_item.table_slot != ''"
                    :slot="slot_item.table_slot" slot-scope="rowData">
            <div class="sort_num" v-if="slot_item.table_slot == 'sort_num'">
              <i class="iconfont icon-volume_high" v-if="rowData.rowData.playStatus == 'play'"></i>
              <i class="iconfont icon-volume_close" v-else-if="rowData.rowData.playStatus == 'pause'"></i>
              <span v-else>{{rowData.rowData.sort_num || '0'}}</span>
            </div>
            <slot v-else :name="slot_item.table_slot" :data="rowData.rowData"></slot>
          </template>
        </iview-table>
      </div>
      <div class="base_table_cols_two_item_center" v-if="config_data.space" :style="{width: config_data.space}"></div>
      <div class="base_table_cols_two_item_two">
        <iview-table :stripe="config_data.stripe"
                     :size="config_data.size"
                     :show-header="config_data.showheader"
                     :disabled-hover="config_data.disabledhover"
                     :highlight-row="config_data.highlightrow"
                     @on-current-change="currentChange"
                     @on-row-dblclick="dbClickRow"
                     @on-row-click="clickRow"
                     :columns="tableData.t_head[1]"
                     :data="tableData.t_body[1]">
          <template v-for="(slot_item, slot_index) in tableData.t_head[1]"
                    v-if="slot_item.table_slot && slot_item.table_slot != ''"
                    :slot="slot_item.table_slot" slot-scope="rowData">
            <div class="sort_num" v-if="slot_item.table_slot == 'sort_num'">
              <i class="iconfont icon-volume_high" v-if="rowData.rowData.playStatus == 'play'"></i>
              <i class="iconfont icon-volume_close" v-else-if="rowData.rowData.playStatus == 'pause'"></i>
              <span v-else>{{rowData.rowData.sort_num || '0'}}</span>
            </div>
            <slot v-else :name="slot_item.table_slot" :data="rowData.rowData"></slot>
          </template>
        </iview-table>
      </div>
    </div>
    <toolPage v-if="tableData.t_page && tableData.t_page.page" :pageData="tableData.t_page" @pageChange="pageChange"></toolPage>
  </div>
</template>

<script>
  let vue = null;
  import {mapState} from 'vuex'

  export default {
    name: "baseTable",
    props: {
      data: {
        type: Object,
        default: function () {
          return {
            t_body: [],
            t_head: []
          }
        }
      },
      config: {
        type: Object,
        default: function () {
          return {}
        }
      },
      // 配置偶数行和奇数行背景颜色
      stripe: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        oldRowData: [],
        config_default: {
          colsNum: '1',
          size: "small",
          showheader: true,
          disabledhover: false,//禁用鼠标悬停时的高亮
          highlightrow: true,//是否支持高亮选中的行，即单选
          stripe: 'stripe',//斑马纹
          space: '',//两列表格时，表格之间的间距，默认无间距，值为距离px
        }
      }
    },
    computed: {
      ...mapState(['music_info']),
      config_data() {
        let config = this.config_default;
        let arr = Object.keys(this.config);
        if (arr.length) {
          Object.keys(this.config).forEach(_item => {
            if (config[_item] !== '') {
              config[_item] = this.config[_item];
            }
          });
        }
        return config;
      },
      tableData() {
        let result = this.data;
        let t_head = result.t_head;
        let t_body = result.t_body;
        let t_page = result.t_page || {};
        if (t_head.length && this.config.colsNum == '2') {
          t_head.forEach(head_item => {
            head_item.forEach((item, index) => {
              if (item.key == 'sort_num' && item.table_slot == 'sort_num') {
                t_body.forEach((body_item, body_index) => {
                  let len = body_item.length;
                  body_item.forEach((body_item_01, body_index_01) => {
                    if (this.$typeOf(body_item_01) == 'object' && !body_item_01.sort_num) {
                      let sort_num = (body_index * len) + (body_index_01 + 1);
                      if(t_page.page && t_page.pageSize){
                        sort_num = (t_page.page-1)*t_page.pageSize + sort_num
                      }
                      if (sort_num < 10) {
                        sort_num = '0' + sort_num;
                      }
                      body_item_01.sort_num = sort_num;
                    }
                    body_item_01.playStatus = !body_item_01.playStatus ? '' : body_item_01.playStatus;
                    // if (this.music_info.id == body_item.id) {
                    //   body_item.playStatus = this.music_info.playStatus;
                    // }
                  })
                });
              }
            });
          });
        } else if (t_head.length) {
          t_head.forEach((head_item, head_index) => {
            if (head_item.key == 'sort_num' && head_item.table_slot == 'sort_num') {
              t_body.forEach((body_item, body_index) => {
                if (this.$typeOf(body_item) == 'object' && !body_item.sort_num) {
                  let sort_num = (body_index + 1);
                  if(t_page.page && t_page.pageSize){
                    sort_num = (t_page.page-1)*t_page.pageSize + sort_num
                  }
                  if (sort_num < 10) {
                    sort_num = '0' + sort_num;
                  }
                  body_item.sort_num = sort_num;
                }
                body_item.playStatus = !body_item.playStatus ? '' : body_item.playStatus;
                // if (this.music_info.id == body_item.id) {
                //   body_item.playStatus = this.music_info.playStatus;
                // }
              });
            }
          })
        }
        return result;
      },
      tableDataLen(){
        let result = true;
        if(this.config_data.colsNum == '1'){
          result = this.tableData.t_body.length ? false : true;
        }else if(this.config_data.colsNum == '2'){
          result = (this.tableData.t_body[0].length && this.tableData.t_body[1].length) ? false : true
        }
        return result;
      },
      changePage() {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        // this.tableData1 = this.mockTableData1();
      }
    },
    components: {},
    created() {

    },
    mounted() {
    },
    methods: {
      // 当前行改变
      currentChange(currentRow, oldCurrentRow) {

      },
      // 点击行
      clickRow(data, index){
        this.$emit('clickRow', { data: data, index: index})
      },
      dbClickRow(data, index) {
        this.oldRowData.push({data: data, index: index});
        if (this.oldRowData.length >= 3) {
          this.oldRowData.splice(0, 1)
        }
        this.playStatusChange(data, index, 'play');
        this.$emit('dbclick', {data: data, index: index});
      },
      playStatusChange(data, index, status) {
        data.playStatus = status;
        if (this.config_data.colsNum == '1') {
          this.tableData.t_body.splice(index, 1, data);
        } else if (this.config_data.colsNum == '2') {
          if (this.tableData.t_body[0].length < (data.sort_num - 0)) {
            this.tableData.t_body[1].splice(index, 1, data);
          } else {
            this.tableData.t_body[0].splice(index, 1, data);
          }
        }
      },
      pageChange(page){
        this.$emit('pageChange',page)
      }
    },
    destroyed() {

    },
    watch: {
      'oldRowData': function (new_val, old_val) {
        if (new_val.length >= 2) {
          let a = new_val[0];
          let a1 = new_val[1];
          if ((a.data.id == a1.data.id) && (a.index == a1.index)) {
            return;
          }
          a.data.playStatus = '';
          let index = a.index;
          if (this.config_data.colsNum == '1') {
            this.tableData.t_body.splice(index, 1, a.data);
          } else if (this.config_data.colsNum == '2') {
            if (this.tableData.t_body[0].length < (a.data.sort_num - 0)) {
              this.tableData.t_body[1].splice(index, 1, a.data);
            } else {
              this.tableData.t_body[0].splice(index, 1, a.data);
            }
          }
        }
      },
      'music_info.playStatus': function (new_val, old_val) {
        if (this.oldRowData.length) {
          let data = this.oldRowData[this.oldRowData.length - 1];
          let status = new_val == 'play' ? 'play' : 'pause';
          this.playStatusChange(data.data, data.index, status);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .base_table {
    width: 100%;
    .sort_num {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .icon-volume_high {
      color: #e83c3c;
      font-size: 18px;
    }
    .icon-volume_close {
      color: #e83c3c;
      font-size: 18px;
    }
    .base_table_cols_two {
      display: flex;
      .base_table_cols_two_item_center {

      }
      .base_table_cols_two_item_one {
        width: calc(50% - 2px);
      }
      .base_table_cols_two_item_two {
        width: calc(50% - 2px);
      }
    }
  }
</style>
<style lang="less">
  .ivu-table {
    cursor: default;
    color: #666666;
    &:before {
      width: 0;
    }
    &:after {
      width: 0;
    }
    .table_index {
      text-align: right;
    }
    .table-cell-operate {
      i {
        font-size: 14px;
        color: #b0b0b1;
        cursor: pointer;
        &:nth-of-type(1) {
          margin-right: 4px;
          font-weight: 100;
          /*font-weight: 900;*/
        }
        &:nth-of-type(2) {
          font-size: 16px;
          font-weight: 400;
        }
        &:hover {
          color: #333333;
        }
      }
    }
    .ivu-table-cell {
      padding-left: 5px;
      padding-right: 5px;
    }
    th {
      height: 30px;
      border-right: 1px solid #e1e1e2;
      border-top: 1px solid #e1e1e2;
      background: #fafafa;
      &:nth-last-of-type(1) {
        border-right: none;
      }
    }
  }

  .ivu-table-wrapper {
    margin-right: -1px;
    border: none;
  }

  .ivu-table-small td {
    height: 28px;
  }

  .ivu-table td {
    border-bottom: none;
  }

  .ivu-table th {

  }

  /*.ivu-table-cell-noshow{
    position: absolute;
    left: 0;
    display: none;
    padding: 0px!important;
    width: 0px!important;
    overflow: hidden!important;
  }*/

  .stripe_color {
    /*偶数行颜色*/
    .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
    .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
      background: #fafafa;
    }
    /*奇数行颜色*/
    .ivu-table td {
      background: #f5f5f7;
    }
  }

  /*偶数行颜色*/
  .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
  .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
    background: #f5f5f7;
  }

  /*奇数行颜色*/
  .ivu-table td {
    background: #fafafa;
  }

  /*hover的颜色*/
  .ivu-table-stripe {
    .ivu-table-body {
      tr.ivu-table-row-hover {
        td {
          background: #ebeced !important;
        }
      }
    }
  }

  /*点击选中时的颜色*/
  .ivu-table-row-highlight td,
  .ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td,
  .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-highlight:nth-child(2n) td,
  tr.ivu-table-row-highlight.ivu-table-row-hover td {
    background: #e3e3e5 !important;
  }

  .base_table_cols_two {
    .ivu-table-wrapper {
      /*margin-right: -1px;*/
      border: 1px solid #e1e1e2;
    }
  }
</style>
