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
      },
      //table类型
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
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
      ...mapState(['music_info','play_music_list','history_music_list']),
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
          t_head.forEach((head_item, head_index) => {
            t_body[head_index].forEach((body_item_01, body_index_01) => {
              if (this.$typeOf(body_item_01) == 'object' && !body_item_01.sort_num) {
                let sort_num = (head_index * t_body[head_index].length) + (body_index_01 + 1);
                if(t_page.page && t_page.pageSize){
                  sort_num = (t_page.page-1)*t_page.pageSize + sort_num
                }
                if (sort_num < 10) {
                  sort_num = '0' + sort_num;
                }
                body_item_01.sort_num = sort_num;
              }
              // body_item_01.playStatus = !body_item_01.playStatus ? '' : body_item_01.playStatus;
            })
          });
        } else if (t_head.length) {
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
            // body_item.playStatus = !body_item.playStatus ? '' : body_item.playStatus;
          });
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
        // if(this.type == 'music'){
          // this.play_list_change(data, index);
          // this.playStatusChange(data, index, 'play');
        // }
        this.$emit('dbclick', {data: data, index: index, type: this.type});
      },
      // play_list_change(data, index){
      //   // 播放列表
      //   if(JSON.stringify(this.play_music_list.ids) != JSON.stringify(this.ids_list)){
      //     let music_list = {
      //       ids: this.ids_list,
      //       data: []
      //     };
      //     if(this.config_data.colsNum == '2'){
      //       music_list.data.push(...this.tableData.t_body[0],...this.tableData.t_body[1]);
      //     }else{
      //       music_list.data = this.tableData.t_body;
      //     }
      //     this.$store.state.play_music_list.ids = music_list.ids;
      //     this.$store.state.play_music_list.data = this.$deepClone(music_list.data);
      //     this.$localStorage.setStore('play_music_list', music_list);
      //   }
      // },
      // playStatusChange(data, index, status) {
      //   if(this.type != 'music'){
      //     return
      //   }
      //   data = this.$deepClone(data);
      //   data.playStatus = status;
      //   let pre_data = this.$deepClone(this.current_data);
      //   if (this.config_data.colsNum == '1') {
      //     if(pre_data.data){
      //       pre_data.data.playStatus = '';
      //       this.tableData.t_body.splice(pre_data.index,1,pre_data.data);
      //     }
      //     this.tableData.t_body.splice(index, 1, data);
      //   } else if (this.config_data.colsNum == '2') {
      //     if(pre_data.data && pre_data.data.sort_num != data.sort_num){
      //       pre_data.data.playStatus = '';
      //       if(this.tableData.t_body[0].length < (pre_data.data.sort_num-0)){
      //         this.tableData.t_body[1].splice(pre_data.index,1,pre_data.data);
      //       }else{
      //         this.tableData.t_body[0].splice(pre_data.index,1,pre_data.data);
      //       }
      //     }
      //     if (this.tableData.t_body[0].length < (data.sort_num - 0)) {
      //       this.tableData.t_body[1].splice(index, 1, data);
      //     } else {
      //       this.tableData.t_body[0].splice(index, 1, data);
      //     }
      //   }
      // },
      pageChange(page){
        this.$emit('pageChange',page)
      }
    },
    destroyed() {

    },
    watch: {
      // 'music_info.playStatus': function (new_val, old_val) {
      //   if (this.current_data.data) {
      //     let status = new_val == 'play' ? 'play' : 'pause';
      //     let data = this.$deepClone(this.current_data);
      //     this.playStatusChange(data.data, data.index, status);
      //   }
      // },
      // 'music_info.id': function (new_val, old_val) {
      //   let path_id = this.$route.query.id || '';
      //   if(this.music_info.source_path.path == this.$route.path && this.music_info.source_path.id == path_id && this.ids_list.indexOf(new_val) != -1){
      //     let index = this.play_music_list.ids.indexOf(new_val);
      //     let data = {
      //       data: this.play_music_list.data[index],
      //       index: index,
      //     };
      //     if(this.config_data.colsNum == '2'){
      //       data.index = data.index - this.tableData.t_body[0].length;
      //     }
      //     this.playStatusChange(data.data, data.index, 'play');
      //   }
      // },
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
