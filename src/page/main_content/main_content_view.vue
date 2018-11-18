<template>
  <div class="main_content_view">
    <div class="main_content_view_box">
      <left-nav></left-nav>
      <div class="main_content_view_wrap" ref="mainView">
        <vue-scroll :ops="scroll_option" @handle-scroll="handleScroll">
          <div class="main_content_view_content">
            <router-view></router-view>
          </div>
        </vue-scroll>
      </div>
      <transition name="lrc">
        <div class="common_lrx_view" v-if="lrc_panal_show">
          <vue-scroll :ops="scroll_option">
            <common-lrc></common-lrc>
          </vue-scroll>
        </div>
      </transition>
      <common-footer></common-footer>
    </div>
  </div>
</template>

<script>
  import commonFooter from '../components/common_footer/common_footer'
  import commonLrc from '../components/common_lrc/common_lrc'
  import leftNav from '../components/left_nav/left_nav'
  import BScroll from 'better-scroll'
  import { mapState } from 'vuex'
  export default {
    name: "main_content_view",
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
    computed: {
      ...mapState(['lrc_panal_show'])
    },
    components: {
      leftNav,
      commonLrc,
      commonFooter
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        // this.height_calc();
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
        $('.main_content_view_wrap').height(h);
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
  .main_content_view{
    height: 100%;
    .main_content_view_box {
      height: 100%;
      position: relative;
      display: flex;
      padding-bottom: 50px;
      .left_nav {
        width: 195px;
      }
      .main_content_view_wrap {
        flex: 1;
        min-width: 822px;
        background: #fafafa;
        height: 100%;
        overflow: hidden;
      }
      .common_lrx_view{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        background: #fafafa;
        overflow: hidden;
        padding-bottom: 50px;
      }
      .lrc-enter-active, .lrc-leave-active{
        transition: all 0.3s;
      }
      .lrc-enter, .lrc-leave-to{
        transform: scale(0);
        transform-origin: left bottom;
      }
    }
  }
</style>
<style lang="less">
  .main_content{
    .main_content_view{
      .__vuescroll .__view{
        width: 100%!important;
      }
    }

  }

</style>
