<template>
  <div class="songlist_detail">
    <div class="songlist_info_box">
      <div class="songlist_cover">
        <img src="" alt="">
      </div>
      <div class="songlist_info">
        <div class="songlist_title">
          <base-tool-button height="21px">歌单</base-tool-button>
          <div class="title_box">
            <span class="title"></span>
            <base-tool-button type="icon" iconClass="icon-" height="21px"></base-tool-button>
          </div>
          <div class="play_count_box">
            <span class="songlist_count"></span>
            <span class="line"></span>
            <span class="play_count"></span>
          </div>
        </div>
        <div class="songlist_creater_info">
          <span class="creater_img"></span>
          <span class="creater_name"></span>
          <span class="creater_time"></span>
        </div>
        <div class="songlist_opear">
          <div class="play_all">
            <i class="iconfont icon-video_play"></i>
            <span>播放全部</span>
            <i class="iconfont icon-plus_add"></i>
          </div>
          <base-tool-button type="aftericon" iconClass="icon-" height="21px"></base-tool-button>
          <base-tool-button type="aftericon" iconClass="icon-" height="21px"></base-tool-button>
          <base-tool-button type="aftericon" iconClass="icon-" height="21px"></base-tool-button>
        </div>
        <div class="songlist_label">
          <span class="label">标签：</span>
          <span class="name"></span>
        </div>
        <div class="songlist_des">
          <span class="label">简介：</span>
          <span class="name"></span>
        </div>
      </div>
    </div>
    <div class="table_box"></div>
  </div>
</template>

<script>
  export default {
    name: "songlistDetail",
    props: {

    },
    data(){
      return {

      }
    },
    computed: {

    },
    created(){

    },
    mounted(){

    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>

</style>
