<template>
  <div class="video">
    <!--<sub-header-nav :data="home_header_nav_data"></sub-header-nav>-->
    <header-tab class="video_header_tab" :data="header_tab_data"></header-tab>
    <div class="video_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { video_header_tab_data} from "./video_data.js";

  export default {
    name: "video",
    data() {
      return {
        header_tab_data: [],
      }
    },
    computed: {},
    components: {

    },
    created() {
      this.header_tab_data = this.$deepClone(video_header_tab_data);
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .video{
    height: 100%;
    padding: 0 30px;
    padding-bottom: 30px;
    background: #fafafa;
    .video_header_tab{
      margin-bottom: 20px;
    }
    .video_content{
      max-width: 1040px;
      margin: auto;
    }
  }
</style>
