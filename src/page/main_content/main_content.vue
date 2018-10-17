<template>
  <div class="main_content">
    <common-header></common-header>
    <div class="main_content_wrap">
      <left-nav></left-nav>
      <div class="main_content_view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../common_header/common_header'
  import leftNav from '../left_nav/left_nav'
  export default {
    name: "main_content",
    data() {
      return {}
    },
    computed: {},
    components: {
      commonHeader,
      leftNav
    },
    created() {
    },
    mounted() {
      this.height_calc();
    },
    methods: {
      height_calc(){
        let h = $('.main_content').height() - 50;
        $('.main_content_wrap').height(h);
      }
    }
  }
</script>

<style lang="less" scoped>
.main_content{
  height: 100%;
  .main_content_wrap{
    display: flex;
    .left_nav{
      width: 195px;
    }
    .main_content_view{
      flex: 1;
      background: #fafafa;
    }
  }
}
</style>
