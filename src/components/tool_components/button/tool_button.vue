<template>
  <div class="tool_button">
    <base-button>
      <div class="button_wrap"
           :class="classes"
           ref="buttonWrap"
           @mouseover="mouse_over"
           @mouseout="mouse_out"
           @click="btn_click"
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
        <div class="text" v-if="type == '' || type == 'text'">
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
        default: '' //icon 纯图标  beforeicon 图标在前 aftericon 图标在后  默认纯文本
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
        default: ''
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
      },
      hoverColor: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        baseButton: 'base-button'
      }
    },
    computed: {
      classes(){
        return [
          `${this.clType}`,
          // {
          //   [`${this.baseButton}-hover`]: this.hoverColor
          // }
        ]
      }
    },
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      mouse_over(){
        if(this.hoverColor){
          $(this.$refs.buttonWrap).css({
            'color': this.hoverColor
          })
        }
      },
      mouse_out(){

      },
      btn_click(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less" scoped>
.tool_button{
  line-height: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .button_wrap{
    display: inline-block;
    border: 1px solid #ccc;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    vertical-align: bottom;
    &>div{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .text{
      display: block;
      padding: 5px 10px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
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
  .play_music_icon_button{
    border: 1px solid #c73333!important;
    i{
      color: #c73333;
      font-size: 12px!important;
      transform: scale(0.7);
    }
  }
  .play_video_icon_button{
    border: 1.5px solid #c73333!important;
    border-radius: 3px;
    padding: 0 1px;
    height: 13px;
    cursor: pointer;
    i{
      color: #c73333;
      font-size: 12px!important;
      transform: scale(0.7);
      /*line-height: 0.8;*/
    }
    &:hover{
      border-color: rgba(214,85,85,1);
      i{
        color: rgba(214,85,85,1);
      }
    }
  }
  .sq_button{
    border: 1.2px solid #fd8152!important;
    border-radius: 3px;
    padding: 0 1px;
    height: 13px;
    .text{
      padding: 0;
      font-size: 12px;
      transform: scale(0.8);
      color: #fe6830;
    }
  }
  .default_button{
    border: 1px solid rgba(153,153,153,0.8)!important;
    color: #333333!important;
    padding: 12px 10px;
    border-radius: 3px;
    font-size: 14px!important;
    background: rgba(252,252,252,0.4)!important;
    cursor: pointer;
    font-weight: 100;
    /*line-height: 1;*/
    i{
      margin-right: 5px;
    }
  }
}
</style>
