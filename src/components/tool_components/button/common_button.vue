<template>
  <div class="common_button">
    <div :class="{'sq_button': type == 'sq'}"></div>
    <div :class="{'play_video_button': type == 'play_video'}"></div>
  </div>
</template>

<script>
  import baseButton from './base_button'
  export default {
    name: "common_button",
    props: {
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    },
    computed: {},
    components: {
      baseButton
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
.common_button{
  .sq_button{

  }
  .play_video_button{
    border: 1.5px solid #c73333!important;
    border-radius: 3px;
    padding: 0 1px;
    height: 13px;
    i{
      color: #c73333;
      font-size: 12px!important;
      transform: scale(0.7);
      line-height: 0.8;
    }
  }
}
</style>
