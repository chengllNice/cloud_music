<template>
  <div class="expand_lrc">
    <div id="expand_lrc" ref="expand_lrc">
      <div v-if="row.lyrics.length" v-for="(item, index) in row.lyrics" :key="index">
        <span v-html="item"></span>
      </div>
    </div>

    <div class="copy" @click="copy_lrc">
      复制歌词
    </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'
  export default {
    name: "expand_lrc",
    props: {
      row: {
        type: Object,
        default: function () {
          return {}
        }
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
      copy_lrc(){
        let vue = this;
        let clipboard = new Clipboard('.copy', {
          text: function () {
            return $(vue.$refs.expand_lrc).text();
          }
        });
        clipboard.on('success', function(e) {
          e.clearSelection();
          vue.$Notice.success({
            desc: '已复制到剪切板',
            duration: 1
          });
          clipboard.destroy();
        });

        clipboard.on('error', function(e) {
          vue.$Notice.error({
            desc: '复制失败',
            duration: 1
          });
          clipboard.destroy();
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .expand_lrc{
    position: relative;
    .copy{
      position: absolute;
      right: 20px;
      top: 0px;
      border: 1px solid #e1e1e2;
      color: #333333;
      width: 72px;
      height: 28px;
      line-height: 28px;
      border-radius: 3px;
      background: #fafafa;
      text-align: center;
      cursor: pointer;
      &:hover{
        background: #f5f5f7;
      }
    }
  }
</style>

<style lang="less">
.expand_lrc{
  color: #888;
  line-height: 20px;
  b{
    font-weight: normal;
    color: #0c73c2;
  }
}
</style>
