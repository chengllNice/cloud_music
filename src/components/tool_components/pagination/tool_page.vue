<template>
  <div class="tool_page">
    <!--分页-->
    <div style="padding: 10px;overflow: hidden" v-if="pageData.total">
      <div style="float: right;">
        <Page :total="pageData.total" :current="pageData.page" :page-size="pageData.pageSize" :show-sizer="showSizer" :show-elevator="showElevator" :show-total="showTotal" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "toolPage",
    props: {
      pageData: {
        type: Object,
        default: function () {
          return {
            total: 0,
            page: 1,
          }
        }
      },
      showSizer: {
        type: Boolean,
        default: false
      },
      showElevator: {
        type: Boolean,
        default: false
      },
      showTotal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      changePage(page){
        this.$emit('pageChange', page);
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
<style lang="less">
  .tool_page{
    font-size: 12px;
    li{
      border-radius: 2px;
    }
    a{
      color: #333333;
      font-size: 12px;
    }
    .ivu-page-item,
    .ivu-page-item-jump-next,
    .ivu-page-item-jump-prev,
    .ivu-page-next,
    .ivu-page-prev,
    .ivu-select-selection,
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .ivu-select-single .ivu-select-selection .ivu-select-selected-value,
    .ivu-page-options-elevator,
    .ivu-page-options-elevator input,
    .ivu-page-next{
      min-width: 24px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      border: 1px solid #c0c0c0;
      color: #333333;
      background: #fafafa;
      &:hover{
        border-color: #c62f2f;
        a{
          color: #c62f2f;
        }
      }
    }
    .ivu-page-item-active{
      border-color: #A2161B;
      background: linear-gradient(to bottom, #e51821, #d10e13, #ca0b0e);
      color: #ffffff;
      a{
        color: #ffffff;
      }
      &:hover{
        a{
          color: #ffffff;
        }
      }
    }
    .ivu-select-selection{
      border: none;
      span.ivu-select-selected-value{
        border-radius: 2px;
      }
    }
    .ivu-select-item-selected,
    .ivu-select-item-selected:hover{
      color: #c62f2f;
    }
    .ivu-page-options-elevator{
      border: none;
    }
  }
</style>
