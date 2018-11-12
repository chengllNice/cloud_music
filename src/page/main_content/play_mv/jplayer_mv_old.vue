<template>
  <div class="jplayer_mv">
    <div class="jp-audio" id="jp_container_1" role="application" aria-label="media player">
      <div class="jplayer_mv_box" id="jplayer_mv"></div>
      <div class="player_mv_tool jp-type-single">
        <div class="progress_box jp-progress" @click="progress_control" @mousemove="progress_mousemove" @mouseout="progress_mouseout">
          <div class="mouseover_time" :style="{transform: 'translate('+mouseover_time.left+'px)'}">
            {{mouseover_time.text}}
          </div>
          <div class="play_progress_wrap jp-seek-bar" ref="mvProgressBar">
            <div class="play_progress_crrent jp-play-bar" :style="{width: play_precent + '%'}">
              <div class="play_progress_inner"><img v-if="loading" src="../../../../static/img/loading.svg" alt=""></div>
            </div>
          </div>
        </div>
        <div class="opare_box">

          <div class="opare_left">
            <div class="control_play" @click="playControl(playStatus)">
              <i class="iconfont icon-music_play" v-if="playStatus == 'pause'"></i>
              <i class="iconfont icon-music_pause" v-else></i>
            </div>
            <div class="time">
              <span class="current_time">{{currentTime.text}}</span>
              <span>/</span>
              <span class="duration_time">{{duration.text}}</span>
            </div>
          </div>
          <div class="opare_rigth">
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
              <span>高清</span>

              <div class="br_select" v-if="br_select_toggle">
                <div class="br_item" v-for="(item, index) in br_data" :key="index" @click="change_br(item, index)">
                  <span class="br_icon"><i class="iconfont icon-right-slim1" v-if="index == br_active"></i></span>
                  <span>{{item.name}}</span>
                </div>
              </div>
            </div>

            <span class="line"></span>

            <div class="full_screen jp-full-screen">
              <i class="iconfont icon-open"></i>
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
      }
    },
    data() {
      return {
        volume: 50,
        playStatus: 'play',
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
        br_data: [
          {
            id: '1080',
            name: '1080P',
          },
          {
            id: '720',
            name: '超清',
          },
          {
            id: '480',
            name: '高清',
          },
          {
            id: '240',
            name: '标清',
          }
        ],
        br_select_toggle: false,
        br_active: '0'
      }
    },
    computed: {},
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
        $('#jplayer_mv').jPlayer({
          ready: function (e) {
            $(this).jPlayer("setMedia", {
              m4v: 'http://vodkgeyttp8.vod.126.net/cloudmusic/JmAgIiAxJCAzYiFgMCRiMA==/mv/5966724/3d5e38ee086706bef507473d5cf3492a.mp4?wsSecret=a133b5a413ae0c681805d9131c6ceeef&wsTime=1542031421',
              autoPlay: true
            }).jPlayer("play");
          },
          wmode: "window",
          supplied: 'mp4,m4v',
          size: {
            width: '690px',
            height: '388px'
          },
          fullSize: {
            width: '100%',
            height: '100%'
          },
          useStateClassSkin: true,
          autoBlur: false,
          smoothPlayBar: true,
          keyEnabled: true,
        });
        this.jplayer_listen();

      },
      jplayer_listen(){
        this.mv_load_progress();
        this.play_or_pause_status();
        this.timeUpdate();
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
      mv_load_progress(){
        $('#jplayer_mv').bind($.jPlayer.event.seeking, (e) => {
          console.log(e)
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
            let _info = {
              playStatus: 'pause'
            };
            break;
          case 'pause':
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
        console.log('againPlay')
        let vue = this;
        $('#jplayer_mv').jPlayer('setMedia',{
          m4v: vue.mv_url,
        }).jPlayer('play');
      },
      // 切换清晰度
      change_br(data, index){
        this.br_active = index;
        this.$emit('changeBr', data);
      }
    },
    watch: {
      'mv_url': function (new_val, old_val) {
        console.log(new_val,'new')
        this.change_br();
      }
    }
  }
</script>

<style lang="less" scoped>
.jplayer_mv{
  width: 100%;
  .jplayer_mv_box{
    background: #000;
  }
  .player_mv_tool{
    height: 50px;
    background: #111111;

    .progress_box{
      height: 12px;
      display: flex;
      align-items: center;
      position: relative;
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
          background: #111111;
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
            top: -130px;
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
          span{
            letter-spacing: 3px;
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
