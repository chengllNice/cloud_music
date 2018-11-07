<template>
    <div class="common_lrc">

      <i class="iconfont icon-close lrc_close" @click="lrc_panal_close"></i>

      <div class="lrc_main">
        <div class="bg_blur_box" :style="{'background-image': 'url('+music_info.picUrl+')'}"></div>
        <!--<div class="bg_opacity_blur_box"></div>-->
        <div class="lrc_main_left">
          <div class="album_cover_box">
            <div class="album_cover_wrap" :class="{'album_rotate': music_info.playStatus == 'play'}">
              <div class="album_cover"></div>
              <div class="song_cover">
                <img :src="music_info.picUrl" alt="">
              </div>
            </div>
            <div class="album_swith" :class="{'album_switch': music_info.playStatus == 'play'}"></div>
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
              <span class="song_name">{{music_info.song_name}}</span>
              <span class="song_maxbr">
                {{music_info.maxbr.substring(0,3)}}k
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
                <span class="name ellipsis_1">{{music_info.alias[0]}}</span>
              </div>
            </div>
          </div>
          <div class="panel lyric">
            <div class="lyric_wrap">
              <vue-scroll ref="vs" :ops="option">
                  <ul id="lyric">
                    <li v-if="lrc_loading"><img class="loading" src="../../../../static/img/loading.svg"/>歌词加载中...</li>
                    <li v-else-if="lrc_data.toString() == '{}'">歌词加载失败...</li>
                    <li v-else v-for="(val, key, index) in lrc_data" :key="index" :data_index="key" :class="{'on': lrc_row_active.index == index}">{{val.text}}</li>
                  </ul>
              </vue-scroll>
            </div>
            <div class=""></div>
          </div>
        </div>
      </div>
      <div class="song_comment"></div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { lrc} from "./lrc";
  import commonFooter from '../common_footer/common_footer'

  export default {
      name: "commonLrc",
      mixins: [commonFooter],
      props: {

      },

      data(){
          return {
            initAlbumCoverRotate: 0,
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
              },
              bar: {
                background: '#8a8a8a',
                keepShow: true,
                opacity: 0.5,
                hoverStyle: {
                  background: '#b6b6bc'
                }
              }
            }
          }
      },
      computed: {
        ...mapState(['music_info', 'lrc_panal_show'])
      },
      mounted(){
        this.get_song_lrc_handler();
      },
      methods: {
        // 获取歌曲url
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
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
              var time = min * 60 + sec;
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
          let currentTime = Math.round(this.music_info.currentTime);//当前时间点
          if(!currentTime){
            return
          }
          let lrc_show = {};
          let len = this.lrc_arr.length;
          for(let i = 0; i <= len; i++){
            if(currentTime < this.lrc_arr[i]){
              let index = (i-1) || 0;
              lrc_show = this.lrc_data[this.lrc_arr[index]];
              break;
            }
          }
          // 判断如果一致的时候滚动
          if(lrc_show && this.lrc_row_active.index == lrc_show.index){
            return;
          }
          this.lrc_row_active = lrc_show;
          // 滚动

          let dy = (this.lrc_row_active.index-3) <= 0 ? 0 : (this.lrc_row_active.index-3) * 34;
          $('.lyric_wrap .__panel').animate({scrollTop: dy + 'px' }, 300);
          // $('.__panel').scrollTop(dy);
          // vue.$refs.vs.scrollTo({
          //   x: 0,
          //   y: dy
          // },true);
        },
        lrc_panal_close(){
          this.$store.commit('set_lrc_panal_show', false)
        }
      },
      watch: {
        'music_info.id': function (new_val, old_val) {
          this.get_song_lrc_handler();
        },
        'music_info.currentTime': function (new_val, old_val) {
          this.updateLyric();
        }
      }
    }
</script>

<style lang="less" scoped>
.common_lrc{
  width: 100%;
  background: #f2f2f2;
  position: relative;

  .lrc_close{
    position: absolute;
    right: 50%;
    top: 33px;
    transform: translateX(465px);
    z-index: 100;
    border-radius: 2px;
    font-size: 18px;
    padding: 2px 8px;
    color: #666666;
    line-height: 1;
    cursor: pointer;
    border: 1px solid #dfdfe1;
    background: #f8f8f9;
    &:hover{
      border-color: #e2e2e2;
      background: #fafafb;
    }
  }

  .lrc_main{
    height: 445px;
    position: relative;
    display: flex;
    /*align-items: center;*/
    justify-content: center;

    .bg_blur_box{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      /*border-radius: 50%;*/
      background-image: url("../../../../static/img/test/music_cover.jpg");
      background-repeat: no-repeat;
      background-size: 90% 100%;
      background-position: -100px -80px;
      filter: blur(75px);
    }

    .lrc_main_left{
      position: relative;
      z-index: 2;
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
      z-index: 1;

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
        border-right: 1px solid rgba(138,139,143,0.4);
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
}
</style>
<style lang="less">
  .lrc_main_right{
    li{
      /*height: 35px;*/
      /*line-height: 35px;*/
      padding-bottom: 12px;
      font-size: 15px;
      font-family: Arial;
    }
    .on{
      color: #ffffff!important;
    }
  }

</style>
