<template>
  <div class="new_music">

    <div class="header_tab_box">
      <div class="top_tab_box">
        <header-tab :data="top_tab_data" tab-type="iview_tab" @tabClick="tabOneClick"></header-tab>
      </div>
      <header-tab class="bottom_tab" @tabClick="tabTwoClick" :data="header_tab_data" type="left" cl-type="three_tab">
        <template>
          <div class="tab_right tab_right_active">推荐</div>
          <div class="ver_line"></div>
          <div class="tab_right">全部</div>
        </template>
      </header-tab>
    </div>

    <base-table v-if="router_type.one_tab == 'new_music'" :data="table_data.data" :config="table_data.config" stripe="stripe">
      <template slot="header" slot-scope="data">
        <div class="table_header">
          <div class="play_all">
            <!--<base-tool-button type="icon"
                              icon-class="icon-music_play"
                              border-width="0"
                              font-color="#cd2929"
                              font-size="12px"></base-tool-button>-->
            <base-tool-button type="icon"
                              icon-class="icon-music_play1"
                              border-width="0"
                              font-color="#cd2929"
                              font-size="24px"></base-tool-button>
            <span>播放全部</span>
          </div>
          <base-tool-button type="beforeicon"
                            icon-class="icon-add_file"
                            border-color="#e1e1e2"
                            font-color="#333333"
                            padding="3px 8px"
                            background-color="#ffffff"
                            class="collection_all"
                            font-size="12px">收藏全部</base-tool-button>
        </div>
      </template>
      <template slot="content" slot-scope="data">
        <div class="new_song_content">
          <div class="left_img" v-if="data.data.img">
            <img :src="data.data.img" alt="">
            <div class="img_cover">
              <div class="abs_center play_icon">
                <i class="iconfont icon-music_play"></i>
              </div>
            </div>
          </div>
          <div class="right_info">
            <span v-if="data.data.song_name">{{data.data.song_name}}</span>
            <span class="right_info_des" v-if="data.data.des">({{data.data.des}})</span>
            <base-tool-button v-if="data.data.video" type="icon" cl-type="play_video_icon_button" icon-class="icon-music_play"></base-tool-button>
            <base-tool-button v-if="data.data.superQuality" type="" cl-type="sq_button">SQ</base-tool-button>
            <!--<span v-if="data.data.singer">{{data.data.singer}}</span>-->
          </div>
        </div>
      </template>
    </base-table>

    <base-sing-list v-else class="" :list-data="new_album_data" :cols-num="new_album_data.colsNum"></base-sing-list>
  </div>
</template>

<script>
  import {
    header_tab_data,
    new_album_data,
    new_music_data} from "./new_music_data";

  export default {
    name: "new_music",
    data() {
      return {
        table_data: {},
        header_tab_data: [],
        new_album_data: {},
        router_type: {
          one_tab: 'new_music',
          two_tab: 'all'
        },
        top_tab_data: [
          {
            id: 'new_music',
            name: '新歌速递',
            path: '/home/new_music'
          },
          {
            id: 'new_album',
            name: '新碟上架',
            path: '/home/new_music'
          }
        ]
      }
    },
    computed: {
     /* header_tab_data(){
        let result = [];
        this.route_params = this.$route.params;
        if(this.route_params.id == 'music'){
          result =  this.$deepClone(header_tab_data);
        }else if(this.route_params.id == 'album'){
          result =  this.$deepClone(header_tab_data_album);
        }
        return result;
      }*/
    },
    components: {},
    created() {
      this.table_data = this.$deepClone(new_music_data);
      this.header_tab_data = this.$deepClone(header_tab_data);
      this.new_album_data = this.$deepClone(new_album_data);
    },
    mounted() {

    },
    methods: {
      tabTwoClick(data){
        this.router_type.two_tab = data.id;
        this.$router.push({
          path: this.$route.path,
          query: this.router_type
        });
        console.log(data,'111222')
      },
      tabOneClick(data){
        this.router_type.one_tab = data.id;
        this.$router.push({
          path: this.$route.path,
          query: this.router_type
        });
        console.log(data,'111222')
      }
    },
    watch: {
      '$route': function (to, from) {
        this.route_params = to.params;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/css/common";
.new_music{

  .header_tab_box{
    text-align: center;
    margin-top: 30px;
    .top_tab_box{

    }
    .bottom_tab{
      height: 28px;
    }
  }

  .tab_right{
    font-size: 12px;
    color: rgba(136,136,136,1);
    padding: 0 12px;
    cursor: pointer;
    &.tab_right_active{
      color: rgba(51,51,51,1);
    }
    &:hover{
      color: rgba(51,51,51,1);
    }
  }
  .ver_line{
    width: 0px;
    height: 12px;
    border-right: 1px solid rgba(204,204,204,1);
  }

  .new_song_content{
    display: flex;
    align-items: center;
    padding: 10px 0;
    .left_img{
      position: relative;
      width: 40px;
      height: 40px;
      img{
        width: 100%;
        height: 100%;
      }
      .img_cover{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    .right_info{
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: center;
      margin-left: 10px;
      color: #333333;
      &>*{
        margin-right: 5px;
      }
      .right_info_des{
        flex: 1;
        color: #888888;
        .ellipsis(1)
      }
    }
  }

  .table_header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: #fafafa;
  }
  .play_all{
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #333333;
    &>span{
      margin-left: 8px;
    }
  }
}
</style>
<style lang="less">
  .new_music{
    .ivu-table-wrapper{
      /*margin-right: -1px;*/
      border: 1px solid rgba(237,237,237,1);
    }
    .sub_header_nav{
      margin-bottom: 10px;
      .list{

      }
    }
    .ivu-table-title{
      height: 35px;
      line-height: 35px;
      border-bottom: none;
    }
    .collection_all{
      .button_wrap{
        border-radius: 3px;
        cursor: pointer;
        &:hover{
          background: #f5f5f7!important;
        }
      }
      i{
        font-size: 18px!important;
        margin-right: 5px;
      }
    }
    .play_all{
      /*.button_wrap{
        border: 1px solid #cd2929!important;
        border-radius: 50%;
        padding: 2px;
        i{
          transform: scale(0.85);
        }
      }*/
    }
  }
</style>
