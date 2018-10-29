<template>
  <div class="main_content">
    <common-header></common-header>
    <div class="main_content_wrap">
      <left-nav></left-nav>
      <div class="main_content_view" ref="mainView">
        <vue-scroll :ops="scroll_option" @handle-scroll="handleScroll">
          <div class="main_content_view_content">
            <router-view></router-view>
          </div>
        </vue-scroll>
        <!--<div class="main_content_view_content">
          <router-view></router-view>
        </div>-->
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
      return {
        scroll_option: {
          vuescroll: {},
          scrollPanel: {},
          rail: {
            gutterOfSide: '1px',//滚动轨道距离侧边的距离
          },
          bar: {
            background: '#e1e1e2',
            keepShow: true,
            hoverStyle: {
              background: '#cfcfd1'
            }
          }
        }
      }
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
      this.$nextTick(() => {
        this.height_calc();
        // this.scroll_init();
      });
      let vue = this;
      vue.get_device_info();
      window.onresize = function () {
        vue.get_device_info();
      }
    },
    methods: {
      get_device_info() {
        let info = {
          clientWidth: document.body.clientWidth,
          clientHeight: document.body.clientHeight
        };
        this.$store.commit('get_device_info', info);
      },
      handleScroll(vertical,horizontal,nativeEvent){
        let info = {
          process: vertical.process
        };
        this.$store.commit('get_scroll_info', info);
      },
      height_calc() {
        let h = $('#app').height() - 50 - 50;
        $('.main_content_wrap').height(h);
      },
      scroll_init() {
        let vue = this;
        let scroll = new BScroll(vue.$refs.mainView, {
          click: true,
          mouseWheel: true,
          scrollY: true,
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .main_content {
    height: 100%;
    .main_content_wrap {
      display: flex;
      padding-bottom: 50px;
      .left_nav {
        width: 195px;
      }
      .main_content_view {
        flex: 1;
        min-width: 822px;
        background: #fafafa;
        height: 100%;
        overflow: hidden;
      }
    }
  }
</style>
<style>
  .__vuescroll .__view{
    width: 100%!important;
  }
</style>
