<template>
  <div class="singer_detail_common">
    <div class="singer_detail_box">
      <div class="singer_detail_cover">
        <img :src="singer_detail.img1v1Url" alt="">
      </div>
      <div class="singer_detail_info">
        <div class="singer_detail_title">
          <div class="singer_detail_title_left">
            <div class="title_tip">歌手</div>
            <div class="title_box">
              <div class="name">{{singer_detail.name}}</div>
              <div class="alias">
                <span v-for="(item, index) in singer_detail.alias" :key="index"><span v-if="index != 0">/</span>{{item}}</span></div>
            </div>
          </div>
          <div class="collection_btn">
            <i class="iconfont icon-my_collections"></i>
            <span>收藏</span>
          </div>
        </div>
        <div class="singer_detail_item">
          <i class="iconfont icon-left_music2"></i>
          <div class="label">单曲数：</div>
          <div class="value">{{singer_detail.musicSize}}</div>
        </div>
        <div class="singer_detail_item">
          <i class="iconfont icon-zhuanji"></i>
          <span class="label">专辑数：</span>
          <span class="value">{{singer_detail.albumSize}}</span>
        </div>
        <div class="singer_detail_item">
          <base-tool-button class="icon" type="icon" cl-type="play_video_icon_button" icon-class="icon-music_play"></base-tool-button>
          <span class="label">MV数：</span>
          <span class="value">{{singer_detail.mvSize}}</span>
        </div>
      </div>
    </div>

    <div class="">
      <div class="tab_box">
        <header-tab class="home_header_tab" tab-type="iview_tab_song" :data="header_tab_data" @tabClick="tabClick">
          <template>
            <div class="right_icon_group">
              <div class="icon_item" :class="{'album_icon_active': album_icon_active == 'theme'}" @click="albumListChange('theme')">
                <i class="iconfont icon-theme"></i>
              </div>
              <div class="icon_item" :class="{'album_icon_active': album_icon_active == 'list'}" @click="albumListChange('list')">
                <i class="iconfont icon-list"></i>
              </div>
              <div class="icon_item" :class="{'album_icon_active': album_icon_active == 'theme_list'}" @click="albumListChange('theme_list')">
                <i class="iconfont icon-theme_list"></i>
              </div>
            </div>
          </template>
        </header-tab>
      </div>

      <div class="singer_album">
        <album-info v-if="tab_active == '0'" :tab_active="tab_active" :album_icon_active="album_icon_active"></album-info>
        <mv-info v-if="tab_active == '1'" :tab_active="tab_active"></mv-info>
        <detail-info v-if="tab_active == '2'"></detail-info>
        <simi-singer-info v-if="tab_active == '3'"></simi-singer-info>
      </div>
    </div>
  </div>
</template>

<script>
  import { get_artist_detail} from "../../../server/common_api";
  import albumInfo from './album_info'
  import mvInfo from './mv_info'
  import detailInfo from './detail_info'
  import simiSingerInfo from './simi_singer_info'

  export default {
    name: "singer_detail_common",
    data() {
      return {
        singer_detail: {},
        header_tab_data: [
          {
            id: '0',
            name: '专辑',
            value: ''
          },
          {
            id: '1',
            name: 'MV',
            value: ''
          },
          {
            id: '2',
            name: '歌手详情',
            value: ''
          },
          {
            id: '3',
            name: '相似歌手',
            value: ''
          }
        ],
        album_icon_active: 'theme_list',
        tab_active: '0'
      }
    },
    computed: {
    },
    components: {
      albumInfo,
      mvInfo,
      detailInfo,
      simiSingerInfo
    },
    created() {
    },
    mounted() {
      this.init();
    },
    methods: {
      async init(){
        this.get_artist_desc();
      },
      get_artist_desc(){
        let get_data = {
          id: this.$route.query.id || ''
        };
        get_artist_detail(get_data).then(res=>{
          this.singer_detail = res.artist;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      tabClick(data){
        this.tab_active = data.id;
      },
      albumListChange(type){
        this.album_icon_active = type;
      },
    },
    watch: {
      '$route.query.id': function (new_val, old_val) {
        if(new_val){
          this.init();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.singer_detail_common{
  .singer_detail_box{
    display: flex;
    padding: 30px;
    .singer_detail_cover{
      width: 198px;
      height: 198px;
      margin-right: 30px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .singer_detail_info{
      flex: 1;
      .singer_detail_title{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding-top: 5px;
        margin-bottom: 20px;
        .singer_detail_title_left{
          display: flex;
          align-items: flex-start;
          .title_tip{
            color: #ffffff;
            /*border: 1px solid #e03f40;*/
            background: #c62f2f;
            flex: none;
            padding: 2px 7px;
            border-radius: 2px;
            font-size: 12px;
          }
          .title_box{
            padding-left: 5px;
            .name{
              font-size: 23px;
              color: #333333;
              line-height: 1;
              /*font-weight: bolder;*/
            }
            .alias{
              &>span{
                color: #666;
                font-size: 12px;
              }
            }
          }
        }
        .collection_btn{
          border: 1px solid #e1e1e2;
          border-radius: 3px;
          background: #ffffff;
          font-size: 12px;
          color: #333333;
        }
      }

      .singer_detail_label{
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 22px;
        .label{

        }
        .name{
          display: flex;
          align-items: center;
          div{
            color: #0c73c2;
            cursor: pointer;
          }
          span{
            color: #6a6aaf;
            margin: 0 2px;
          }
        }
      }
      .singer_detail_item{
        font-size: 12px;
        line-height: 22px;
        display: flex;
        align-items: center;
        .label{
          color: #333333;
        }
        .value{
          color: #666666;
        }
        .icon, i{
          width: 25px;
          justify-content: left;
        }
        .icon-left_music2{
          font-size: 20px;
        }
        .icon-zhuanji{
          font-weight: 600;
          font-size: 14px;
          padding-left: 3px;
        }
      }
    }
  }

  .tab_box{
    border-bottom: 1px solid #c62f2f;
    padding: 0 30px;
    .right_icon_group{
      padding-bottom: 5px;
      display: flex;
      align-items: center;
      overflow: hidden;

      .icon_item{
        border: 1px solid #e1e1e2;
        background: #ffffff;
        padding: 1px 8px;
        cursor: pointer;
        i{
          font-size: 12px;
        }
        &:hover{
          background: #f5f5f7;
        }
        &:nth-of-type(1){
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          margin-right: -1px;
        }
        &:nth-of-type(3){
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          margin-left: -1px;
        }
      }
      .album_icon_active{
        background: #7c7d85!important;
        i{
          color: #ffffff!important;
        }
      }
    }
  }

  .singer_album{
    padding: 20px 0;
  }
}
</style>
<style lang="less">
  .singer_detail_common{
    .tool_button{
      padding-left: 2px;
      .play_video_icon_button{
        border-color: #666!important;
        padding: 0!important;
        height: 12px!important;
        i{
          color: #666!important;
          font-size: 12px!important;
        }
      }
    }
  }
</style>
