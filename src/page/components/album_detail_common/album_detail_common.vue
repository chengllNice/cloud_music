<template>
  <div class="album_detail_common">
    <div class="album_info_box">
      <div class="album_cover">
        <img :src="album_data.data.picUrl" alt="">
      </div>
      <div class="album_info">
        <div class="album_title">
          <div class="title_left">
            <div class="title_tip">专辑</div>
            <div class="title_box">
              <span class="title">{{album_data.data.name}}</span>
              <base-tool-button type="icon" class="title_edit" iconClass="icon-edit" borderWidth='0' fontSize="19px" fontColor="#a1a1a1" height="21px"></base-tool-button>
            </div>
          </div>
        </div>
        <div class="album_opear">
          <div class="play_all">
            <div class="left">
              <i class="iconfont icon-music_play1"></i>
              <span>播放全部</span>
            </div>
            <div class="right">
              <i class="iconfont icon-add1"></i>
            </div>
          </div>
          <div class="collection">
            <i class="iconfont icon-add_file"></i>
            <span>收藏 <span v-if="album_data.data.info&&album_data.data.info.subscribedCount">({{album_data.data.info.subscribedCount}})</span></span>
          </div>
          <div class="shape">
            <i class="iconfont icon-shape"></i>
            <span>分享 <span v-if="album_data.data.info&&album_data.data.info.shareCount">({{album_data.data.info.shareCount}})</span></span>
          </div>
          <div class="download">
            <i class="iconfont icon-download"></i>
            <span>下载全部</span>
          </div>
        </div>
        <div class="singer_info">
          <div class="label">歌手：</div>
          <div class="singer_name">
            <span v-for="(item, index) in album_data.data.artists" :key="index">
              <span v-if="index != 0">/</span><span class="name">{{item.name}}</span>
            </span>
          </div>
        </div>
        <div class="singer_info">
          <div class="label">时间：</div>
          <div class="singer_name">
            {{album_data.data.publishTime}}
          </div>
        </div>
      </div>
    </div>
    <div class="album_bottom">
      <div class="table_tab">
        <header-tab class="home_header_tab" tab-type="iview_tab_song" :data="header_tab_data" @tabClick="tabClick"></header-tab>
      </div>
      <div class="album_main">
        <album-songlist :data="album_song_data" v-if="tab_active == '0'"></album-songlist>
        <tool-comment v-if="tab_active == '1'" :comment-all-data="commentData.comment" :comment-hot-data="commentData.hot" :pageData="pageData" @pageChange="pageChange" @submitComment="submitComment" :totalComment="pageData.total"></tool-comment>
        <album-info v-if="tab_active == '2'" :data="album_data.data.description"></album-info>
      </div>
    </div>
  </div>
</template>

<script>
  import { get_album, get_album_comment} from "../../../server/common_api";
  import { album_data, album_song_data} from "./album_detail_data";
  import albumSonglist from './album_songlist'
  import albumInfo from './album_info'

  export default {
    name: "album_detail_common",
    data() {
      return {
        tab_active: '0',
        album_id: '',
        header_tab_data: [
          {
            id: '0',
            name: '歌曲列表',
            value: ''
          },
          {
            id: '1',
            name: '评论',
            value: ''
          },
          {
            id: '2',
            name: '专辑详情',
            value: ''
          }
        ],
        commentData: {
          hot: [],
          comment: []
        },
        pageData: {
          total: 0,
          page: 1,
          pageSize: 50
        },
        album_data: {},
        album_song_data: {},
        collectionItemCols: 5
      }
    },
    computed: {},
    components: {
      albumSonglist,
      albumInfo
    },
    created() {
      this.album_id = this.$route.query.id || '';
      this.album_data = this.$deepClone(album_data);
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.get_album_detail_data();
        this.getAlbumComment();
      },
      async get_album_detail_data(){
        let get_data = {
          id: this.album_id,
        };
        let table_data = this.$deepClone(album_song_data);
        get_album(get_data).then(res=>{
          let songlists = res.songs;
          this.$tableListInit(songlists,table_data.data);
          this.album_song_data = table_data;

          let album = res.album;
          album.publishTime = this.$timeFormat(album.publishTime,'yy-mm-dd');
          this.album_data.data = album;
        }).catch(err=>{
          console.log('err', err);
        })
      },
      getAlbumComment(){
        let get_data = {
          id: this.album_id,
          limit: this.pageData.pageSize,
          offset: (this.pageData.page-1)*this.pageData.pageSize
        };
        this.commentData.comment = [];
        this.commentData.hot = [];
        get_album_comment(get_data).then(res=>{
          this.commentData.comment = res.comments;
          if(res.hotComments){
            this.commentData.hot = res.hotComments;
          }
          this.pageData.total = res.total;
          this.header_tab_data[1].value = res.total
        }).catch(err=>{
          console.log('err',err)
        })
      },
      pageChange(page){
        this.pageData.page = page;
        this.getAlbumComment();
      },
      submitComment(value){
        let post_data = {
          t: 1,
          type: 3,
          id: this.$route.query.id,
          content: value
        };
        this.$commonApi.postSonglistComment(post_data).then(res=>{
          if(res.code == 200){
            this.$Message.success(res.msg);
            this.pageData.page = 1;
            this.getSonglistComment();
          }else{
            this.$Message.warning(res.msg)
          }
        }).catch(err=>{
          console.log(err)
          this.$Message.warning('需要登录')
          console.log('err',err)
        })
      },
      tabClick(data){
        this.tab_active = data.id;
      },
    },
  }
</script>

<style lang="less" scoped>
.album_detail_common{
  width: 100%;
  background: #fafafa;
  padding-top: 20px;
  padding-bottom: 50px;
  .album_info_box{
    display: flex;
    padding: 0 30px;
    .album_cover{
      width: 198px;
      height: 198px;
      margin-right: 30px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .album_info{
      flex: 1;
      .album_title{
        display: flex;
        align-items: start;
        justify-content: space-between;
        .title_left{
          flex: 1;
          display: flex;
          align-items: start;
          .title_tip{
            background: #c62f2f;
            color: #ffffff;
            border: 1px solid #e03f40;
            flex: none;
            padding: 0 5px;
            border-radius: 2px;
            font-size: 12px;
          }
        }
        .title_box{
          display: flex;
          align-items: start;
          .title{
            font-size: 22px;
            color: #333333;
            margin-left: 5px;
            margin-right: 5px;
            margin-top: -5px;
          }
        }
      }
      .album_opear{
        display: flex;
        align-items: center;
        margin: 15px 0 20px 0;
        .play_all{
          border: 1px solid #e5a7a7;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 122px;
          height: 26px;
          color: #cd2929;
          font-size: 12px;
          background: #ffffff;
          i{
            color: #cd2929;
            cursor: pointer;
          }
          .left{
            height: 100%;
            /*padding-left: 5px;*/
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
            cursor: pointer;
            &:hover{
              background: #f5f5f7;
            }
            span{
              cursor: pointer;
            }
            .icon-music_play1{
              font-size: 20px;
              margin-right: 5px;
            }
          }
          .right{
            width: 32px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            border-left: 1px solid #f4e4e4;
            cursor: pointer;
            &:hover{
              background: #f5f5f7;
            }
            .icon-add1{
              font-size: 12px;
              transform: scale(0.9);
            }
          }
        }
        .collection{
          border: 1px solid #e1e1e2;
          color: #333333;
          padding: 0 10px;
          height: 26px;
          border-radius: 2px;
          margin-left: 10px;
          display: flex;
          align-items: center;
          background: #ffffff;
          font-size: 12px;
          cursor: pointer;
          &:hover{
            background: #f5f5f7;
          }
          span{
            cursor: pointer;
          }
          i{
            font-size: 18px;
            margin-right: 5px;
            color: #666666;
            cursor: pointer;
          }
        }
        .shape{
          border: 1px solid #e1e1e2;
          color: #333333;
          padding: 0 10px;
          height: 26px;
          border-radius: 2px;
          margin-left: 10px;
          display: flex;
          align-items: center;
          background: #ffffff;
          font-size: 12px;
          cursor: pointer;
          &:hover{
            background: #f5f5f7;
          }
          span{
            cursor: pointer;
          }
          i{
            font-size: 14px;
            font-weight: 100;
            margin-right: 5px;
            color: #666666;
            cursor: pointer;
          }
        }
        .download{
          border: 1px solid #e1e1e2;
          color: #333333;
          padding: 0 10px;
          height: 26px;
          border-radius: 2px;
          margin-left: 10px;
          display: flex;
          align-items: center;
          background: #ffffff;
          font-size: 12px;
          cursor: pointer;
          &:hover{
            background: #f5f5f7;
          }
          span{
            cursor: pointer;
          }
          i{
            font-size: 18px;
            margin-right: 5px;
            color: #666666;
            cursor: pointer;
          }
        }
      }
      .singer_info{
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 22px;
        .label{

        }
        .singer_name{
          display: flex;
          align-items: center;
          span.name{
            cursor: pointer;
            color: #666;
            margin: 0 2px;
            &:hover{
              color: #333333;
            }
          }
        }
      }
    }
  }

  .album_bottom{
    margin-top: 30px;
    .table_tab{
      border-bottom: 1px solid #c62f2f;
      padding-left: 35px;
    }
  }
}
</style>
