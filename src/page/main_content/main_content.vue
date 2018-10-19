<template>
  <div class="main_content">
    <common-header></common-header>
    <div class="main_content_wrap">
      <left-nav></left-nav>
      <div class="main_content_view" ref="mainView">
        <div class="main_content_view_content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
  import commonHeader from '../components/common_header/common_header'
  import commonFooter from '../components/common_footer/common_footer'
  import leftNav from '../components/left_nav/left_nav'
  import BScroll from 'better-scroll'
  export default {
    name: "main_content",
    data() {
      return {}
    },
    computed: {},
    components: {
      commonHeader,
      leftNav,
      commonFooter
    },
    created() {
    },
    mounted() {
      this.$nextTick(()=>{
        this.height_calc();
        this.scroll_init();
      });
    },
    methods: {
      height_calc(){
        let h = $('#app').height() - 50 - 50;
        console.log(h)
        $('.main_content_wrap').height(h);
      },
      scroll_init(){
        let vue = this;
        let scroll = new BScroll(vue.$refs.mainView,{
          click: true,
          mouseWheel: true,
          scrollY: true,
          // disableTouch: true,
          // disableMouse: false,
        });
        // scroll.disable();
      }
    }
  }
</script>

<style lang="less" scoped>
.main_content{
  height: 100%;
  .main_content_wrap{
    display: flex;
    padding-bottom: 50px;
    .left_nav{
      width: 195px;
    }
    .main_content_view{
      flex: 1;
      min-width: 822px;
      background: #fafafa;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>
