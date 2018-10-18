<template>
  <div class="tool_button">
    <base-button>
      <div class="button_wrap"
           :class="clType"
           :style="{
             'width': width,
             'height': height,
             'padding': padding,
             'border-width': borderWidth,
            'border-style': borderStyle,
            'border-color': borderColor,
            'color': fontColor,
            'font-size': fontSize,
            'background-color': backgroundColor}">
        <div class="" v-if="type == 'icon'">
          <i v-if="iconType" :style="{'font-size': fontSize}" class="iconfont" :class="iconClass"></i>
          <Icon v-else :type="iconClass"></Icon>
        </div>
        <div class="" v-if="type == 'aftericon'">
          <slot></slot>
          <i v-if="iconType" :style="{'font-size': fontSize}" class="iconfont" :class="iconClass"></i>
          <Icon v-else :type="iconClass"></Icon>
        </div>
        <div class="" v-if="type == 'beforeicon'">
          <i v-if="iconType" :style="{'font-size': fontSize}" class="iconfont" :class="iconClass"></i>
          <Icon v-else :type="iconClass"></Icon>
          <slot></slot>
        </div>
      </div>

    </base-button>
  </div>
</template>

<script>
  export default {
    name: "baseToolButton",
    props: {
      type: {
        type: String,
        default: '' //icon 纯图标  beforeicon 图标在前 aftericon 图标在后
      },
      iconType: {
        type: Boolean,
        default: true
      },
      clType: {
        type: String,
        default: 'nomarl_button'
      },
      iconClass: {
        type: String,
        default: ''
      },
      borderWidth: {
        type: String,
        default: '1px'
      },
      borderStyle: {
        type: String,
        default: 'solid'
      },
      borderColor: {
        type: String,
        default: '#c62f2f'
      },
      fontColor: {
        type: String,
        default: '#c62f2f'
      },
      backgroundColor: {
        type: String,
        default: '#f2f2f2'
      },
      fontSize: {
        type: String,
        default: '14px'
      },
      width: {
        type: String,
        default: ''
      },
      height: {
        type: String,
        default: ''
      },
      padding: {
        type: String,
        default: ''
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
    methods: {}
  }
</script>

<style lang="less" scoped>
.tool_button{
  line-height: 1;
  height: 100%;
  .button_wrap{
    display: inline-block;
    border: 1px solid #ccc;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    &>div{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .icon_button{
    color: #d15858!important;
    border: 1px solid #a82828!important;
    background: rgba(0,0,0,0)!important;
    font-size: 20px!important;
    padding: 0 3px;
    line-height: 0;
  }
}
</style>
