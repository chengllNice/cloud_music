<template>
  <div class="jplayer_mv">
    <div class="jp-video jp-video-360p jp-video_mv" id="jp_container_1" role="application" aria-label="media player">
      <div class="video_play_full" @click="playControl(playStatus)">
        <div class="jp-video-play-icon" v-if="playStatus == 'pause'" tabindex="0"><i class="iconfont icon-music_play"></i></div>
        <div class="play_end_repeat" tabindex="0" v-if="playStatus == 'end'">
          <div class="next_mv_name">
            <span>即将自动为您播放：</span>
            <span>name</span>
          </div>
          <div class="repeat_opear_box">
            <div class="repeat_icon_box">
              <div class="repeat_icon">
                <i class="iconfont icon-repeat_play"></i>
              </div>
              <div class="repeat_name">重新播放</div>
            </div>
            <div class="play_next_box">
              <div class="play_next">
                <i-circle :percent="auto_play_percent" :size='72' stroke-color='#ffffff' :trail-width="2" trail-color="#333333" :stroke-width="4">
                  <i class="iconfont icon-music_play"></i>
                </i-circle>
              </div>
              <div class="next_name">取消自动播放</div>
            </div>
          </div>
        </div>
      </div>
      <div class="jp-type-single">
        <div class="jplayer_mv_box jp-jplayer" id="jplayer_mv"></div>
        <div class="jp-gui">
          <div class="mv_header" v-if="is_full">
            <div class="mv_title_info">
              <div class="mv_name">{{data.name}}</div>
              <span>-</span>
              <div class="mv_singer" v-for="(item, index) in data.artists" :key="index">
                <span v-if="index != 0">/</span>
                <span>{{item.name}}</span>
              </div>
            </div>
            <div class="mv_header_opear">
              <i class="iconfont icon-praise"></i>
              <span></span>
              <i class="iconfont icon-shape"></i>
              <span></span>
              <i class="iconfont icon-left_down"></i>
            </div>
          </div>
          <div class="jp-interface player_mv_tool">
            <div class="progress_box" @click="progress_control" @mousemove="progress_mousemove" @mouseout="progress_mouseout">
              <div class="mouseover_time" :style="{transform: 'translate('+mouseover_time.left+'px)'}">
                {{mouseover_time.text}}
              </div>
              <div class="play_progress_wrap" ref="mvProgressBar">
                <div class="play_progress_crrent" :style="{width: play_precent + '%'}">
                  <div class="play_progress_inner"><img v-if="loading" src="../../../../static/img/loading.svg" alt=""></div>
                </div>
              </div>
            </div>
            <div class="opare_box">
              <div class="opare_left">
                <div class="control_play" @click="playControl(playStatus)">
                  <i class="iconfont icon-music_pause" v-if="playStatus == 'play'"></i>
                  <i class="iconfont icon-music_play" v-else></i>
                </div>
                <div class="time">
                  <span class="current_time">{{currentTime.text}}</span>
                  <span>/</span>
                  <span class="duration_time">{{duration.text}}</span>
                </div>
              </div>
              <div class="opare_rigth">

                <!--<div class="play_volume_box jp-volume-controls">-->
                <!--<i class="iconfont jp-mute" :class="{'icon-volume_high': volume != 0, 'icon-volume_close': volume == 0}" tabindex="0"></i>-->
                <!--<div class="jp-volume-bar volume_wrap">-->
                <!--<div class="jp-volume-bar-value volume_inner"></div>-->
                <!--</div>-->
                <!--</div>-->

                <div class="play_volume_box">
                  <i class="iconfont icon-volume_high" @click="volumeChange('close')" v-if="volume != 0"></i>
                  <i class="iconfont icon-volume_close" @click="volumeChange('open')" v-else></i>
                  <div class="volume_wrap" ref="mvVolumeBar" @click="volume_control">
                    <div class="volume_inner" :style="{width: volume + '%'}"></div>
                  </div>
                </div>

                <span class="line"></span>

                <div class="br_box" @click="br_select_toggle=!br_select_toggle">
                  <i class="iconfont icon-screen"></i>
                  <span v-for="(item, index) in br_data" :key="index" v-if="br_data.length && item.id == br_active">{{item.name}}</span>

                  <div class="br_select" v-if="br_select_toggle && br_data.length">
                    <div class="br_item" v-for="(item, index) in br_data" :key="index" @click="change_br(item, index)">
                      <span class="br_icon"><i class="iconfont icon-right-slim1" v-if="item.id == br_active"></i></span>
                      <span>{{item.name}}</span>
                    </div>
                  </div>
                </div>

                <span class="line"></span>

                <div class="full_screen jp-full-screen" @click="fullScreenHandler">
                  <i class="iconfont icon-open" v-if="!is_full"></i>
                  <i class="iconfont icon-close" v-else></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import jPlayer from 'jplayer'
  export default {
    name: "jplayer_mv",
    props: {
      mv_url: {
        type: String,
        default: ''
      },
      data: {
        type: Object,
        default:function () {
          return {}
        }
      }
    },
    data() {
      return {
        auto_play_percent: 0,
        volume: this.$localStorage.getStore('volume') || 50,
        playStatus: 'pause',
        is_full: false,
        play_precent: 50,
        loading: false,
        duration: {
          text: '00:00',//转换后
          m: '',//原时长
        },
        currentTime: {
          text: '00:00',//转换后
          m: '',//原时长
        },
        mouseover_time: {
          left: '',
          text: ''
        },
        // br_data: [
        //   {
        //     id: '1080',
        //     name: '1080P',
        //   },
        //   {
        //     id: '720',
        //     name: '超清',
        //   },
        //   {
        //     id: '480',
        //     name: '高清',
        //   },
        //   {
        //     id: '240',
        //     name: '标清',
        //   }
        // ],
        br_select_toggle: false,
        br_active: '480'
      }
    },
    computed: {
      br_data(){
        let result = [];
        if(this.data.brs && this.data.brs.length){
          this.data.brs.forEach(item=>{
            let obj = {};
            if(item.br == '240'){
              obj = {
                id: '240',
                name: '标清'
              }
            }
            if(item.br == '480'){
              obj = {
                id: '480',
                name: '高清'
              }
            }
            if(item.br == '720'){
              obj = {
                id: '720',
                name: '超清'
              }
            }
            if(item.br == '1080'){
              obj = {
                id: '1080',
                name: '1080P'
              }
            }
            result.push(obj)
          });
        }
        result.sort(function (a,b) {
          return b.id-a.id;
        });
        return result;
      }
    },
    components: {},
    created() {
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.jplayer_init();
      },
      jplayer_init(){
        let vue = this;
        let volume = vue.volume/100;
        $('#jplayer_mv').jPlayer({
          ready: function (e) {
            // $(this).jPlayer("setMedia", {
            //   m4v: vue.mv_url,
            //   autoPlay: true
            // }).jPlayer("play");
          },
          wmode: "window",
          supplied: 'mp4,m4v',
          volume: volume,
          size: {
            width: '690px',
            height: '388px',
          },
          fullSize: {
            width: '100%',
            height: '100%',
            cssClass: 'jp-video_mv'
          },
          useStateClassSkin: true,
          autoBlur: false,
          smoothPlayBar: true,
          keyEnabled: true,
        });
        this.jplayer_listen();

      },
      jplayer_listen(){
        this.mv_end();
        this.play_or_pause_status();
        this.timeUpdate();
        this.video_click();
      },
      timeUpdate(){
        $('#jplayer_mv').bind($.jPlayer.event.timeupdate, (e) => {
          this.loading=false;
          this.duration.text = this.$timeFormat(e.jPlayer.status.duration*1000);
          this.duration.m = e.jPlayer.status.duration;
          this.currentTime.text = this.$timeFormat(e.jPlayer.status.currentTime*1000);
          this.currentTime.m = e.jPlayer.status.currentTime;
          this.play_precent = e.jPlayer.status.currentPercentAbsolute;
          // e.jPlayer.status.paused
          // let v = this.$localStorage.getStore('volume');
          this.volume = (this.$typeOf(e.jPlayer.status.volume) === 'undefined' ? this.volume : e.jPlayer.status.volume*100);
        });
      },
      play_or_pause_status(){
        $('#jplayer_mv').bind($.jPlayer.event.play, (e) => {
          this.playStatus = 'play'
        });
        $('#jplayer_mv').bind($.jPlayer.event.pause, (e) => {
          this.playStatus = 'pause'
        })
      },
      video_click(){
        let vue = this;
        $('#jplayer_mv').bind($.jPlayer.event.click, (e) => {
          console.log('ppp')
          vue.playControl(vue.playStatus);
        });
      },
      mv_end(){
        let vue = this;
        $('#jplayer_mv').bind($.jPlayer.event.ended, (e) => {
          this.playStatus = 'end';
          this.auto_play_percent = 0;
          let t = null;
          t = setInterval(function () {
            vue.auto_play_percent++;
            if(vue.auto_play_percent > 100){
              clearInterval(t);
              $('#jplayer_mv').jPlayer('play')
            }
          },80);
        });
      },
      progress_control(e){
        this.loading=true;
        let progressBar = this.$refs.mvProgressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        $('#jplayer_mv').jPlayer('playHead', progress*100);
      },
      progress_mousemove(e){
        let progressBar = this.$refs.mvProgressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        let mouseover_time = this.$timeFormat(this.duration.m * progress*1000)
        this.mouseover_time.text = mouseover_time;
        this.mouseover_time.left = progress * progressBar.clientWidth - 20;
        if(this.mouseover_time.left >= progressBar.clientWidth - 42){
          this.mouseover_time.left = progressBar.clientWidth - 42
        }
        if(this.mouseover_time.left <= 0){
          this.mouseover_time.left = 0
        }
      },
      progress_mouseout(e){

      },
      playControl(type){
        switch (type) {
          case 'play':
            $('#jplayer_mv').jPlayer('pause');
            this.playStatus = 'pause';
            break;
          case 'pause':
            $('#jplayer_mv').jPlayer('play');
            this.playStatus = 'play';
            break;
          case 'end':
            $('#jplayer_mv').jPlayer('play');
            this.playStatus = 'play';
            break;
        }
      },
      volume_control(e){
        let volumeBar = this.$refs.mvVolumeBar;
        let _volume = (e.clientX - volumeBar.getBoundingClientRect().left) / volumeBar.clientWidth;
        this.volume  = _volume*100;
        $('#jplayer_mv').jPlayer('volume', _volume);
      },
      volumeChange(type){
        switch (type) {
          case 'close':
            this.volume = 0;
            $('#jplayer_mv').jPlayer('volume', 0);
            break;
          case 'open':
            let v = this.$localStorage.getStore('volume');
            this.volume = v || 0;
            $('#jplayer_mv').jPlayer('volume', this.volume/100);
            break;
          default:
            this.volume = 100;
            $('#jplayer_mv').jPlayer('volume', this.volume/100);
            break;
        }
      },
      againPlay(){
        let vue = this;
        $('#jplayer_mv').jPlayer('setMedia',{
          m4v: vue.mv_url,
        }).jPlayer('play');
        this.playStatus = 'play';
      },
      // 切换清晰度
      change_br(data, index){
        this.br_active = data.id;
        this.$emit('changeBr', data);
      },
      fullScreenHandler(){
        if(this.mv_url){
          this.is_full = !this.is_full;
        }
      }
    },
    watch: {
      'mv_url': function (new_val, old_val) {
        this.againPlay();
      },
      'volume': function (new_val, old_val) {
        if(new_val){
          this.$localStorage.setStore('volume', new_val);
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "jplayer.pink.flag.css";
  .jplayer_mv{
    width: 100%;
    height: 100%;

    .mv_header{
      height: 60px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 10000;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .mv_title_info{
        display: flex;
        align-items: center;
        padding: 10px;
        &>*{
          margin-right: 5px;
        }
        .mv_name,.mv_singer,span{
          font-size: 18px;
          color: #999999;
        }
      }
      .mv_header_opear{
        span{
          width: 0;
          height: 10px;
          margin: 0 20px;
          border-left: 1px solid #333;
        }
        i{
          color: #f2f2f2;
          font-size: 20px;
          cursor: pointer;
          &:hover{
            color: #ffffff;
          }
        }
        .icon-praise{
          font-size: 22px;
        }
        .icon-left_down{
          font-size: 22px;
        }
      }
    }
    .jplayer_mv_box{
      background: #000;
    }
    .jp-video_mv{
      width: 100%;
      height: 100%;
      position: relative;
    }
    .video_play_full{
      cursor: pointer;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      .jp-video-play-icon{
        border: 2px solid #b7b5b8;
        border-radius: 50%;
        width: 72px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 5px;
        background: rgba(0,0,0,0.3);
        &:hover{
          border-color: #f2f2f2;
          background: rgba(0,0,0,0.5);
        }
      }
      .icon-music_play{
        font-size: 40px;
      }
      .play_end_repeat{
        width: 100%;
        height: 100%;
        background: #000000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .next_mv_name{
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          margin-bottom: 40px;
        }
        .repeat_opear_box{
          width: 100%;
          height: 105px;
          /*height: 100%;*/
          display: flex;
          align-items: center;
          justify-content: center;
          .repeat_icon_box{
            margin: 0 10px;
            width: 105px;
            .repeat_icon{
              width: 73px;
              height: 73px;
              margin: auto;
              border: 2px solid #666666;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              i{
                font-size: 40px;
              }
            }
            .repeat_name{
              width: 100%;
              height: 25px;
              margin-top: 10px;
              line-height: 25px;
              text-align: center;
              color: #9d9fa0;
              font-size: 13px;
            }
          }
          .play_next_box{
            margin: 0 10px;
            width: 105px;
            .play_next{
              width: 73px;
              height: 73px;
              margin: auto;
              cursor: pointer;
              i{
                margin-left: 5px;
              }
            }
            .next_name{
              width: 100%;
              height: 25px;
              margin-top: 10px;
              line-height: 25px;
              color: #9d9fa0;
              font-size: 13px;
              background: #333333;
              border-radius: 25px;
              text-align: center;
              &:hover{
                background: #4c4c4c;
              }
            }
          }
        }
      }
    }
    .player_mv_tool{
      height: 50px;
      background: #111111;
      position: relative;
      z-index: 1002;

      .progress_box{
        height: 12px;
        display: flex;
        align-items: center;
        position: relative;
        top: -4px;
        cursor: pointer;
        &:hover{
          .mouseover_time{
            opacity: 1;
          }
        }
        .mouseover_time{
          opacity: 0;
          color: #ffffff;
          font-size: 12px;
          padding: 4px 5px;
          border: 1px solid #383838;
          background: rgba(0,0,0,0.5);
          position: absolute;
          top: -34px;
          left: 0;
          z-index: 2;
          &:after{
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            margin: auto;
            width: 8px;
            height: 8px;
            transform: rotate(45deg);
            border: 1px solid #383838;
            border-left: none;
            border-top: none;
            background: linear-gradient(to left top, rgba(0,0,0,0.5) 50%, transparent 50%);
          }
        }
        /*padding-top: 5px;*/
        .play_progress_wrap{
          flex: 1;
          height: 4px;
          background: #666666;
          border-radius: 3px;
          .play_progress_crrent{
            height: 100%;
            background: #e83c3c;
            border-radius: 3px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            position: relative;
            .play_progress_inner{
              width: 12px;
              height: 12px;
              position: absolute;
              right: -6px;
              top: 0;
              bottom: 0;
              margin: auto;
              background: #ffffff;
              border: 1px solid #cacaca;
              border-radius: 50%;
              cursor: pointer;
              img{
                width: 10px;
                height: 10px;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                animation: rotateLoading 1s linear infinite;
              }
              &:hover{
                box-shadow: 0 0 12px #cacaca;
              }
            }
          }
        }
      }

      .opare_box{
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;

        .opare_left{
          display: flex;
          align-items: center;
          padding-left: 5px;
          .control_play{
            width: 25px;
            height: 25px;
            font-size: 21px;
            line-height: 25px;
            border: 1px solid #888888;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &:hover{
              border-color: #ffffff;
            }
            i{
              font-size: 12px;
              color: #ffffff;
            }
            i.icon-music_play{
              color: #ffffff;
            }
          }
          .time{
            padding: 0 10px;
            font-size: 12px;
            color: #c1c1c1;
          }
        }
        .opare_rigth{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          &>*{
            margin: 0 5px;
          }
          .line{
            width: 0;
            height: 10px;
            border-left: 1px solid #686a6e;
          }

          .play_volume_box{
            display: flex;
            align-items: center;
            i{
              font-size: 22px;
              color: #666666;
              cursor: pointer;
              &:hover{
                color: #a5a7a8;
              }
            }
            .volume_wrap{
              width: 100px;
              position: relative;
              background: #292929;
              /*border: 1px solid #dbdbdd;*/
              border-radius: 2px;
              height: 4px;
              cursor: pointer;
              &:hover{
                .volume_inner:after{
                  opacity: 1;
                }
              }
              .volume_inner{
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                margin: auto;
                background: #e83c3c;
                border-radius: 2px;
                &:after{
                  opacity: 0;
                  content: '';
                  width: 10px;
                  height: 10px;
                  position: absolute;
                  right: -5px;
                  top: 0;
                  bottom: 0;
                  margin: auto;
                  background: #ffffff;
                  border: 1px solid #cacaca;
                  border-radius: 50%;
                  cursor: pointer;
                  &:hover{
                    box-shadow: 0 0 12px #cacaca;
                  }
                }
              }
            }
          }

          .br_box{
            color: #a5a7a8;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            position: relative;
            .br_select{
              width: 70px;
              position: absolute;
              bottom: 46px;
              left: -15px;
              z-index: 10;
              background: rgba(0,0,0,0.5);
              .br_item{
                color: #f2f2f2;
                border-bottom: 1px solid #888;
                border-left: 1px solid #888;
                border-right: 1px solid #888;
                padding: 3px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                span{
                  width: 40px;
                  letter-spacing: 8px;
                }
                .br_icon{
                  width: 16px;
                }
                i{
                  font-size: 14px;
                  color: #ffffff;
                }
                &:nth-of-type(1){
                  span{
                    letter-spacing: 0;
                  }
                  border-top: 1px solid #888;
                }
              }
            }
            &:hover{
              i{
                color: #a5a7a8;
              }
            }
            i{
              font-size: 14px;
              color: #686a6e;
              font-weight: 600;
              margin-right: 3px;
            }
          }
          .full_screen{
            /*margin: 5px 0;*/
            transform: rotateX(180deg);
            cursor: pointer;
            &:hover{
              i{
                color: #a5a7a8;
              }
            }
            i{
              color: #686a6e;
              font-size: 14px;
            }
          }
        }
      }

    }
  }
</style>
