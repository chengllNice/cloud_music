<template>
  <div class="tool_filter_select">
    <div class="tool_filter_select_box">
      <div class="filter_select_label">{{data.name}} :</div>
      <div class="filter_select_list">
        <div class="filter_select_item"
             v-for="(item, index) in data.data" :key="index"
             :class="{'filter_select_active': type && active == index}">
          <span class="line" v-if="index != '0'"></span>
          <span class="name" @click="subCatClick(item, index)">
            {{item.name}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "toolFilterSelect",
    props: {
      data: {
        type: Object,
        default: function () {
          return {}
        }
      },
      // 是否需要选中状态
      type: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: '0'
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      subCatClick(data, index){
        this.active = index;
        this.$emit('click', data)
      }
    }
  }
</script>

<style lang="less" scoped>
  .tool_filter_select {
    .tool_filter_select_box{
      display: flex;
      flex-wrap: wrap;
      font-size: 12px;
      margin-bottom: 5px;
      line-height: 25px;
      .filter_select_label {
        margin-right: 18px;
        color: #333333;
      }
      .filter_select_list{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .filter_select_item {
          display: flex;
          align-items: center;
          height: 25px;
          .line {
            width: 0;
            height: 12px;
            margin-right: 18px;
            border-left: 1px solid #ceccd4;
          }
          .name {
            cursor: pointer;
            margin-right: 18px;
            padding: 0 4px;
            border-radius: 3px;
            height: 75%;
            line-height: 1.6;
            &:hover {
              color: #333333;
            }
          }
        }
        .filter_select_active{
          .name{
            background: #8f9096;
            color: #ffffff!important;
          }
        }
      }
    }
  }
</style>
