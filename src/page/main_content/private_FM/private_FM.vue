<template>
  <div class="private_FM">
    <div class="lrc_main">
      <div class="lrc_main_left">
        <div class="album_cover_box">
          <div class="album_cover_wrap" :class="{'album_rotate': current_play_fm.playStatus == 'play'}">
            <div class="album_cover"></div>
            <div class="song_cover">
              <img :src="current_play_fm.picUrl" alt="">
            </div>
          </div>
        </div>
        <div class="album_cover_bottom">
          <base-tool-button type="beforeicon" clType="default_button" iconClass="icon-left_like" height="21px">喜欢</base-tool-button>
          <base-tool-button type="beforeicon" clType="default_button" iconClass="icon-add_file" height="21px">收藏</base-tool-button>
          <base-tool-button type="beforeicon" clType="default_button" iconClass="icon-left_down" height="21px">下载</base-tool-button>
          <base-tool-button type="beforeicon" clType="default_button" iconClass="icon-shape" height="21px">分享</base-tool-button>
        </div>
      </div>
      <div class="lrc_main_right">
        <div class="song_info">
          <div class="song_name_box">
            <span class="song_name">{{current_play_fm.song_name}}</span>
            <span class="song_maxbr">
              {{current_play_fm.maxbr.substring(0,3)}}k
            </span>
          </div>
          <div class="song_album_box">
            <div class="album_info ellipsis_1">
              <span class="label">专辑： </span>
              <span class="name ellipsis_1" v-if="music_info.album">{{music_info.album.name}}</span>
            </div>
            <div class="artists_info ellipsis_1">
              <span class="label">歌手： </span>
              <span class="name ellipsis_1" v-if="music_info.artists.length">
                  <span v-for="(item, index) in music_info.artists" :key="index"><span v-if="index != 0">/</span>{{item.name}}</span>
                </span>
            </div>
            <div class="alias_info ellipsis_1" v-if="music_info.alias.length">
              <span class="label">来源： </span>
              <span class="name ellipsis_1">{{// music_info.source_path}</span>
            </div>
          </div>
        </div>
        <div class="panel lyric">
          <div class="lyric_wrap">
            <vue-scroll ref="vs" :ops="option">
              <ul id="lyric">
                <li v-if="lrc_loading"><img class="loading" src="../../../../static/img/loading.svg"/>歌词加载中...</li>
                <li v-else-if="lrc_data.toString() == '{}'">歌词加载失败...</li>
                <li v-else v-for="(val, key, index) in lrc_data" :key="index" :data_index="key" :class="{'on': lrc_row_active.index == val.index}">{{val.text}}</li>
              </ul>
            </vue-scroll>
          </div>
          <div class=""></div>
        </div>
      </div>
    </div>
    <div class="song_comment">
      <div class="left">
        <div class="title">
          <span class="text">听友评论</span>
          <span class="total">(已有{{pageData.total}}条评论)</span>
        </div>
        <tool-comment :comment-all-data="commentData.comment" :comment-hot-data="commentData.hot" :pageData="pageData" @pageChange="pageChange" @submitComment="submitComment" :totalComment="pageData.total"></tool-comment>
      </div>
      <div class="right">
        <div class="simi_playlist">
          <div class="title">
            <span class="text">包含这首歌的歌单</span>
          </div>
          <div class="simi_playlist_item" v-for="(item, index) in simi_playlist_data" :key="index">
            <div class="play_img">
              <img :src="item.coverImgUrl+'?param=180y180'" alt="">
            </div>
            <div class="play_info">
              <div class="play_name ellipsis_1">{{item.name}}</div>
              <div class="play_count">播放：{{item.playCount}}</div>
            </div>
          </div>
        </div>

        <div class="simi_songs">
          <div class="title">
            <span class="text">相似歌曲</span>
          </div>
          <div class="simi_song_item" v-for="(item, index) in simi_song_data" :key="index">
            <div class="mv_cover_img">
              <img :src="item.album.picUrl+'?param=180y180'" alt="">
              <div class="cover">
                <i class="iconfont icon-music_play1"></i>
              </div>
            </div>
            <div class="simi_song_info">
              <div class="song_name">
                <span class="ellipsis_1">{{item.name}}</span>
                <span class="alias ellipsis_1" v-for="(alias_item, alias_index) in item.alias" :key="alias_index">({{alias_item}})</span>
              </div>
              <div class="song_singer ellipsis_1">
                  <span v-for="(artists_item, artists_index) in item.artists" :key="artists_index">
                    <span v-if="artists_index != '0'">/</span><span>{{artists_item.name}}</span>
                  </span>
              </div>
            </div>
          </div>
        </div>

        <div class="like_song_user">
          <div class="title">
            <span class="text">喜欢这首歌的人</span>
          </div>
          <div class="like_song_user_item" v-for="(item, index) in like_song_user" :key="index">
            <div class="user_item_left">
              <div class="avatar_img">
                <img :src="item.avatarUrl" alt="">
              </div>
              <div class="user_name ellipsis_1">{{item.nickname}}</div>
              <div class="user_sex">
                <i v-if="item.gender" class="iconfont icon-sex_men"></i>
                <i v-else class="iconfont icon-sex_women"></i>
              </div>
            </div>
            <div class="user_item_right ellipsis_1">{{item.recommendReason}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { get_personal_fm} from "../../../server/private_FM_api";

  export default {
    name: "private_FM",
    data() {
      return {
        songId: '',
        lrc_data: {},
        lrc_loading: true,
        lrc_row_active: {},
        lrc_arr: [],
        text_temp: '',
        option: {
          vuescroll: {},
          scrollPanel: {
            // initialScrollY: 300
          },
          rail: {
            gutterOfSide: '0px',//滚动轨道距离侧边的距离
            gutterOfEnds: '0px',
            opacity: 0,
          },
          bar: {
            background: '#b6b6bc',
            keepShow: true,
            opacity: 0.5,
            hoverStyle: {
              background: '#8a8a8a'
            }
          }
        },
        pageData: {
          total: 0,
          page: 1,
          pageSize: 20
        },
        commentData: {
          hot: [],
          comment: []
        },
        fm_list_data: [],
        current_play_fm: {},
        pre_play_fm: {},
      }
    },
    computed: {
      ...mapState(['fm_info'])
    },
    components: {},
    created() {

    },
    mounted() {
      // this.init();
    },
    methods: {
      init(){
        this.get_personal_fm();
        this.get_song_lrc_handler();
        this.getSongComment();
      },
      get_personal_fm(){
        get_personal_fm().then((res)=>{
          this.fm_list_data = res.data;
          this.current_play_fm = this.fm_list_data[0];
        }).catch(err=>{
          console.log('err',err)
        })
      },
      fm_list_format(){
        let info = {
          type: 'fm',
          id: this.current_play_fm.id,
          url: url,
          playStatus: 'play',
          picUrl: this.current_play_fm.picUrl,
          song_name: this.current_play_fm.name,
          artists: this.current_play_fm.artists,
          album: this.current_play_fm.album_name,
          alias: this.current_play_fm.alias,
          data: this.current_play_fm,
        };
        this.$store.commit('get_music_info', info)
      },
      // 获取歌曲lrc
      get_song_lrc_handler(){
        this.lrc_loading = true;
        let get_data = {
          id: this.music_info.id
        };
        this.$commonApi.getSongLrc(get_data).then(res=>{
          // this.lrc_data = res.lrc.lyric;
          this.lrc_data = this.parseLyric(res.lrc.lyric);
          this.lrc_arr = Object.keys(this.lrc_data);
          this.lrc_loading = false;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      // 解析歌词
      parseLyric(lrc) {
        var lyrics = lrc.split("\n");
        var lrcObj = {};
        for(var i=0;i<lyrics.length;i++){
          var lyric = decodeURIComponent(lyrics[i]);
          var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
          var timeRegExpArr = lyric.match(timeReg);
          if(!timeRegExpArr)continue;
          var clause = lyric.replace(timeReg,'');
          for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
              sec = Number(String(t.match(/\:\d*/i)).slice(1)),
              msec = Number(String(t.match(/\.\d*/i)).slice(1));
            var time = min * 60 * 1000 + sec*1000 + msec;
            lrcObj[time] = {
              index: i,
              text: clause
            };
          }
        }
        return lrcObj;
      },
      // 歌词滚动
      updateLyric(){
        let vue = this;
        let currentTime = Math.round(this.music_info.currentTime)*1000;//当前时间点
        if(!currentTime){
          return
        }
        let lrc_show = {};

        let len = this.lrc_arr.length;
        let _i = lrc_show.index || 0;
        for(let i = _i; i <= len; i++){
          if(currentTime < this.lrc_arr[i]){
            let index = (i-1) || 0;
            lrc_show = this.lrc_data[this.lrc_arr[index]];
            break;
          }
        }
        // 判断如果一致的时候滚动
        if(lrc_show.index && this.lrc_row_active.index == lrc_show.index){
          return;
        }
        this.lrc_row_active = lrc_show;
        // 滚动
        let li_h = $('.lyric_wrap').find('li').eq(this.lrc_row_active.index).height();
        let dy = (this.lrc_row_active.index-4) <= 0 ? 0 : (this.lrc_row_active.index-4) * li_h;
        $('.lyric_wrap .__panel').animate({scrollTop: dy + 'px' }, 300);
        // $('.__panel').scrollTop(dy);
        // vue.$refs.vs.scrollTo({
        //   x: 0,
        //   y: dy
        // },true);
      },
      getSongComment(){

      }
    },
    watch: {
      'current_play_fm': {
        handler(){
          this.fm_list_format();
        },
        deep: true
      }
    }
  }
</script>

<style lang='less' scoped>
.private_FM{
  width: 761px;
  margin: auto;
  .lrc_main{
    height: 445px;
    position: relative;
    display: flex;
    /*align-items: center;*/
    justify-content: center;

    .lrc_main_left{
      position: relative;
      z-index: 3;
      padding-top: 53px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-bottom: 10px;

      .album_cover_box{
        width: 325px;
        height: 325px;
        position: relative;
        .album_cover_wrap{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 325px;
          height: 325px;
          .album_cover{
            position: absolute;
            top: 0;
            left: 0;
            /*border-radius: 50%;*/
            overflow: hidden;
            width: 325px;
            height: 325px;
            background: url("../../../../static/img/cd-mine.png") no-repeat;
            background-size: 100% 100%;
            /*<!--background-position: -222px -919px;-->*/
            /*background-size: 185%;*/
          }
          .song_cover{
            width: 210px;
            height: 210px;
            border-radius: 50%;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }

        .album_swith{
          position: absolute;
          top: -53px;
          left: 50%;
          /*overflow: hidden;*/
          width: 105px;
          height: 130px;
          background: url("../../../../static/img/swith.png") no-repeat;
          background-size: 80%;
          background-position: 0 -6px;
          transform: rotate(-30deg);
          transform-origin: 10px top;
          transition: all 1s;
        }

      }
      .album_cover_bottom{

        display: flex;
        align-items: center;
        justify-content: space-between;
      }

    }
    .lrc_main_right{
      width: 510px;
      padding-left: 120px;
      position: relative;
      z-index: 3;

      .song_info{
        padding-top: 30px;
        .song_name_box{
          display: flex;
          align-items: center;
          .song_name{
            font-size: 22px;
            /*font-weight: bold;*/
            color: #1f2020;
          }
          .song_maxbr{
            font-size: 12px;
            color: #c34142;
            border: 1px solid #c34142;
            position: relative;
            padding: 0 5px;
            border-radius: 2px;
            letter-spacing: 1px;
            margin-left: 5px;
            line-height: 1.2;
            cursor: pointer;
            &:after{
              content: '';
              position: absolute;
              top: -8px;
              left: 0;
              right: 0;
              margin: auto;
              width: 0;
              height: 0;
              /*line-height: 0;*/
              border-left: 4px solid transparent;
              border-top: 4px solid transparent;
              border-right: 4px solid transparent;
              border-bottom: 4px solid #c34142;
            }
            &:hover{
              color: #b82525;
              border-color: #b82525;
              &:after{
                border-bottom-color: #b82525;
              }
            }
          }
        }
        .song_album_box{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 5px;
          padding-bottom: 20px;
          .album_info, .artists_info, .alias_info{
            display: flex;
            align-items: center;
            flex: 1;

            .label{
              min-width: 45px;
              font-size: 13px;
              color: #2d2a28;
            }
            .name{
              /*min-width: 50px;*/
              font-size: 13px;
              color: #3c6cb5;
              cursor: pointer;
              padding-right: 5px;
              &:hover{
                color: #0a4bad;
              }
            }
          }

        }
      }

      .panel.lyric{
        color: #2d2a28;
        border-right: 1px solid rgba(207,207,209,0.8);
        #lyric{
          transition: all 0.3s ease;
        }
        .lyric_wrap{
          height: 330px;
        }
        /*.lyric_wrap{
          position: absolute;
          bottom: 15px;
          left: 0;
          width: 100%;
          top: 15px;
          overflow: hidden;
          #lyric{
            padding: 5px;
            -webkit-transition:500ms ease-out;
            li{
              text-align: center;
              font-size: 15px;
              padding: 5px 0;
              &.on{
                font-weight: bold;
                color: #36a3e1;
              }
            }
          }
        }*/
      }
    }
  }

  .song_comment{
    display: flex;
    justify-content: center;
    margin-top: 60px;
    .left{
      width: 545px;
      margin-right: 70px;

    }
    .right{
      width: 246px;
      .simi_playlist{
        margin-bottom: 50px;
        .simi_playlist_item{
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #333333;
          padding: 5px 0;
          *{
            cursor: pointer;
          }
          &:hover{
            background: #ecedee;
          }
          .play_img{
            width: 40px;
            img{
              width: 100%;
            }
          }
          .play_info{
            flex: 1;
            padding-left: 5px;
            .play_name{

            }
            .play_count{
              color: #888;
            }
          }
        }
      }
      .simi_songs{
        margin-bottom: 50px;
        .simi_song_item{
          display: flex;
          padding: 4px 0;
          &:hover{
            background: #ecedee;
          }
          .mv_cover_img{
            position: relative;
            cursor: pointer;
            img{
              width: 40px;
            }
            .cover{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              color: #ffffff;
              background: linear-gradient(left, rgba(232,234,236,0.1), rgba(0,0,0,0.3));
              font-size: 12px;
              text-align: right !important;
              padding: 2px 5px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              i{
                font-size: 12px;
                margin-right: 1px;
              }
              .icon-music_play1{
                font-size: 20px;
              }
            }
          }
          .simi_song_info{
            font-size: 12px;
            padding-left: 15px;
            line-height: 16px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .song_name{
              display: flex;
              align-items: center;
              span:nth-of-type(1){
                flex: none;
              }
              .alias{
                color: #888;
              }
            }
            .song_duration,.song_singer{
              color: #888;
            }
          }
        }
      }
      .like_song_user{
        margin-bottom: 50px;
        .like_song_user_item{
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          padding: 5px 0;
          &:hover{
            background: #ecedee;
          }
          *{
            cursor: pointer;
          }
          .user_item_left{
            display: flex;
            align-items: center;
            flex: 1;
            .avatar_img{
              width: 30px;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 5px;
              img{
                width: 100%;
              }
            }
            .user_name{
              color: #333333;
              margin-right: 5px;
              flex: none;
            }
            .user_sex{
              .icon-sex_men{
                color: #1379ab;
                font-size: 10px;
              }
              .icon-sex_women{
                color: #e494d2;
                font-size: 12px;
              }
            }
          }
          .user_item_right{
            text-align: right;
          }
        }
      }
    }
    .title{
      display: flex;
      align-items: flex-end;
      border-bottom: 1px solid #e1e1e2;
      padding: 3px 0;
      margin-bottom: 3px;
      .text{
        font-size: 18px;
        color: #333333;
      }
      .total{
        font-size: 12px;
        color: #666666;
        margin-left: 10px;
      }
    }
  }
}
</style>
<style lang="less">
  .common_lrc{
    .tool_button{
      .icon-add_file{
        font-size: 16px!important;
      }
      .icon-shape{
        font-size: 12px!important;
      }
    }
    .comment{
      padding-left: 0!important;
      padding-right: 0!important;
    }
  }
  .lrc_main_right{
    li{
      line-height: 35px;
      min-height: 35px;
      font-size: 14px;
      font-family: Arial;
    }
    .on{
      color: #ffffff!important;
    }
    .lyric_wrap{
      .__vuescroll .__panel{
        margin-right: -9px!important;
      }
    }
  }
</style>
