<template>
  <div class="songlist_detail">
    <div class="songlist_info_box">
      <div class="songlist_cover">
        <img :src="songlist.data.coverImgUrl" alt="">
      </div>
      <div class="songlist_info">
        <div class="songlist_title">
          <div class="title_left">
            <div class="title_tip">歌单</div>
            <div class="title_box">
              <span class="title">{{songlist.data.name}}</span>
              <base-tool-button type="icon" class="title_edit" iconClass="icon-edit" borderWidth='0' fontSize="19px" fontColor="#a1a1a1" height="21px"></base-tool-button>
            </div>
          </div>

          <div class="play_count_box">
            <div class="songlist_count">
              <div>歌曲数</div>
              <div class="count">{{songlist.data.trackCount}}</div>
            </div>
            <div class="line"></div>
            <div class="play_count">
              <div>播放数</div>
              <div class="count">{{songlist.data.playCount}}</div>
            </div>
          </div>
        </div>
        <div class="songlist_creater_info">
          <div class="creater_img">
            <img :src="songlist.data.creator.avatarUrl" alt="">
          </div>
          <span class="creater_name">{{songlist.data.creator.nickname}}</span>
          <span class="creater_time">{{songlist.data.createTime}}创建</span>
        </div>
        <div class="songlist_opear">
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
            <span>收藏 <span v-if="songlist.data.subscribedCount">({{songlist.data.subscribedCount}})</span></span>
          </div>
          <div class="shape">
            <i class="iconfont icon-shape"></i>
            <span>分享 <span v-if="songlist.data.shareCount">({{songlist.data.shareCount}})</span></span>
          </div>
          <div class="download">
            <i class="iconfont icon-download"></i>
            <span>下载全部</span>
          </div>
        </div>
        <div class="songlist_label">
          <div class="label">标签：</div>
          <div class="name">
            <div v-for="(item, index) in songlist.data.tags" :key="index"> <span v-if="index != 0">/</span>{{item}}</div>
          </div>
        </div>
        <div class="songlist_des">
          <span class="label">
            简介：
            <span class="name">{{songlist.data.description}}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="songlist_bottom">
      <div class="table_tab">
        <header-tab class="home_header_tab" tab-type="iview_tab_song" :data="header_tab_data" @tabClick="tabClick"></header-tab>
      </div>
      <div class="table_box" v-if="tab_active == '0'">
        <base-table @dbclick="tableClick" :data="songlist.data.table_data">
          <template slot="song_name" slot-scope="data">
            <div class="song_name ellipsis_1">
              <div class="ellipsis_1">{{data.data.song_name}}</div>
              <span class="ellipsis_1" v-if="data.data.alia && data.data.alia.length" v-for="(item, index) in data.data.alia">({{item}})</span>
            </div>
          </template>
          <template slot="lastRank" slot-scope="data">
            <div class="lastRank">
              <i class="iconfont icon-sort_new" v-if="!data.data.lastRank"></i>
              <i v-else-if="data.data.lastRank < data.data._index" class="iconfont icon-sort_down"></i>
              <i v-else-if="data.data.lastRank > data.data._index" class="iconfont icon-sort_up"></i>
              <span v-else-if="data.data.lastRank == data.data._index">-</span>
            </div>
          </template>
          <template slot="trackIds" slot-scope="data">
            <div class="trackIds">
              {{data.data.trackIds+'%'}}
            </div>
          </template>
          <template slot="artists" slot-scope="data">
            <div class="artists_name ellipsis_1">
              <span v-for="(item, index) in data.data.artists" :key="index">{{item.name}}</span>
            </div>
          </template>
          <template slot="album" slot-scope="data">
            <div class="album_name ellipsis_1">
              {{data.data.album_name.name}}
            </div>
          </template>
        </base-table>
      </div>
      <div class="comment_tab" v-if="tab_active == '1'">
        <tool-comment :comment-all-data="commentData.comment" :comment-hot-data="commentData.hot" :pageData="pageData" @pageChange="pageChange" @submitComment="submitComment" :totalComment="pageData.total"></tool-comment>
      </div>
      <div class="collection_tab" v-if="tab_active == '2'">
        <div class="collection_tab_item" v-for="(item, index) in songlist.data.subscribers" :key="index" @click="subscribersInfoHandler(item.userId)">
          <div class="user_avatar">
            <img :src="item.avatarUrl" alt="">
          </div>
          <div class="user_name">{{item.nickname}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { songlist_data} from "./songlist_detail_data";

  export default {
    name: "songlistDetail",
    props: {

    },
    data(){
      return {
        tab_active: '0',
        songlist_id: '',
        songlist_type: '',
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
            name: '收藏者',
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
        songlist: {},
        collectionItemCols: 5
      }
    },
    components: {
    },
    computed: {

    },
    created(){
      this.songlist_id = this.$route.query.id || '';
      this.songlist_type = this.$route.query.type || '';
      this.songlist = this.$deepClone(songlist_data);
    },
    mounted(){
      this.get_songlist_detail_data();
      this.getSonglistComment();
    },
    methods: {
      async get_songlist_detail_data(){
        let get_data = {
          id: this.songlist_id,
          s: 100
        };
        this.$commonApi.getSonglistDetail(get_data).then(res=>{
          // let format_data = this.$uiconfigFormat(res.result,this.songlist.uiconfig);
          this.songlist_format(res.playlist);
        }).catch(err=>{
          console.log('err', err);
        })
      },
      songlist_format(data){
        Object.keys(this.songlist.uiconfig).forEach(key=>{
          let text = this.$getObjectValue(data, key);
          this.songlist.data[key] = text;
        });
        // 飙升榜up
        if(this.songlist_type == 'up'){
          this.songlist.data.tracks.forEach((item, index)=>{
            item.trackIds = data.trackIds[index].ratio || ''
          });
          this.songlist.data.table_data.t_head.forEach(item=>{
            if(item.key == 'trackIds'){
              this.$setObjectValue(item, 'noshow', false)
            }
          })
        }
        if(this.songlist_type == 'lastRank'){
          this.songlist.data.tracks.forEach((item, index)=>{
            item.lastRank = (data.trackIds[index].lr === 0) ? '0' : (data.trackIds[index].lr || '');
          });
          this.songlist.data.table_data.t_head.forEach(item=>{
            if(item.key == 'lastRank'){
              this.$setObjectValue(item, 'noshow', false)
            }
          })
        }

        // let format_data = this.$uiconfigFormat(this.songlist.data.tracks,this.songlist.uiconfig);
        this.$tableListInit(this.songlist.data.tracks, this.songlist.data.table_data);
        let time = this.$timeFormat(this.songlist.data.createTime, 'yy-mm-dd');
        this.$setObjectValue(this.songlist.data, 'createTime', time);
        this.$unitFormat(this.songlist.data, 'playCount');//播放量的单位转换
        console.log(this.songlist.data)
      },
      tabClick(data){
        this.tab_active = data.id;
      },
      tableClick(data){
        let get_data = {
          id: data.data.id
        };
        this.$commonApi.getSongUrl(get_data).then(res=>{
          if(res.data && res.data.length){
            let url = res.data[0].url;
            let info = {
              id: data.data.id,
              url: url,
              playStatus: 'play',
              picUrl: data.data.picUrl,
              song_name: data.data.song_name,
              artists: data.data.artists,
              album: data.data.album_name,
              alias: data.data.alias
            };
            this.$store.commit('get_music_info',info);
          }
        }).catch(err=>{
          console.log('err',err)
        });
        console.log(data,'===')
      },
      getSonglistComment(){
        let get_data = {
          id: this.songlist_id,
          limit: this.pageData.pageSize,
          offset: (this.pageData.page-1)*this.pageData.pageSize
        };
        this.commentData.comment = [];
        this.commentData.hot = [];
        this.$commonApi.getSonglistComment(get_data).then(res=>{
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
        this.getSonglistComment();
      },
      submitComment(value){
        let post_data = {
          t: 1,
          type: 2,
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
          console.log(res)
        }).catch(err=>{
          console.log(err)
          this.$Message.warning('需要登录')
          console.log('err',err)
        })
      },
      subscribersInfoHandler(uid){

      }
    },
    watch: {
      '$route': function () {
        this.songlist_id = this.$route.query.id || '';
        this.pageData.page = 1;
        this.get_songlist_detail_data();
        this.getSonglistComment();
      }
    }
  }
</script>

<style lang="less" scoped>
.songlist_detail{
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #fafafa;
  padding-top: 20px;
  padding-bottom: 50px;
  .songlist_info_box{
    display: flex;
    padding: 0 30px;
    .songlist_cover{
      width: 198px;
      height: 198px;
      margin-right: 30px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .songlist_info{
      flex: 1;
      .songlist_title{
        display: flex;
        align-items: start;
        justify-content: space-between;
        .title_left{
          flex: 1;
          display: flex;
          align-items: start;
          .title_tip{
            color: #e03f40;
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
        .play_count_box{
          /*width: 115px;*/
          padding-left: 10px;
          display: flex;
          align-items: center;
          color: #999999;
          font-size: 12px;
          text-align: right;
          .count{
            font-weight: bolder;
          }
          .songlist_count{

          }
          .line{
            width: 0px;
            height: 32px;
            border-left: 1px solid #e1e1e2;
            margin: 0 10px;
          }
          .play_count{

          }
        }
      }
      .songlist_creater_info{
        display: flex;
        align-items: center;
        margin-top: 5px;
        .creater_img{
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .creater_name{
          margin-left: 10px;
          margin-right: 25px;
          color: #666666;
          font-size: 16px;
        }
        .creater_time{
          color: #9688a4;
          font-size: 12px;
        }
      }
      .songlist_opear{
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
      .songlist_label{
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
      .songlist_des{
        font-size: 12px;
        line-height: 22px;
      }
    }
  }

  .songlist_bottom{
    margin-top: 30px;
  }

  .table_tab{
    border-bottom: 1px solid #c62f2f;
    padding-left: 35px;
  }
  .table_box{
    .song_name{
      display: flex;
      align-items: center;
      div{
        flex: none;
      }
      span{
        color: #888888;
      }
    }
    .lastRank{
      width: 100%;
      text-align: center;
      color: #999;
      i{
        font-size: 14px;
        &.icon-sort_down{
          color: #2875ce;
        }
        &.icon-sort_up{
          color: #cd2929;
        }
        &.icon-sort_new{
          font-size: 18px;
          color: #089c19;
        }
      }
    }
  }

  .collection_tab{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    .collection_tab_item{
      width: 160px;
      text-align: center;
      margin: 20px 0;
      .user_avatar{
        width: 50px;
        height: 50px;
        margin: auto;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        text-align: center;
        img{
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
      }
      .user_name{
        cursor: pointer;
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
}
</style>
<style lang="less">
  .songlist_detail{
    .songlist_title{
      .button_wrap{
        border-radius: 2px!important;
        .text{
          padding-top: 4px;
          padding-left: 6px;
          padding-right: 6px;
        }
      }

      .title_edit{
        i{
          cursor: pointer!important;
        }
      }
    }
  }

</style>
