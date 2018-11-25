<template>
  <div class="album_info">
    <div class="info">
      <div class="title">专辑介绍</div>
      <div class="text" v-html="detail_info"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "album_info",
    props: {
      data: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    },
    computed: {
      detail_info(){
        let result = this.data;
        result = result.replace(/\n/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        return result;
      }
    },
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
.album_info{
  padding: 0 30px;
  padding-top: 20px;
  .info{
    margin-bottom: 30px;
    .title{
      font-size: 14px;
      font-weight: bolder;
      color: #333333;
      margin-bottom: 10px;
    }
    .text{
      font-size: 14px;
      color: #666666;
      text-indent: 2em;
      line-height: 30px;
    }
  }
}
</style>
