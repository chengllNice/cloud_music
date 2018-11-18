<template>
  <div class="player">
    <div class="player_hide" id="jplayerEl"></div>
    <div class="player_main">
      <div class="play_control_box">
        <div class="control_pre">
          <i class="iconfont icon-music_pre"></i>
        </div>
        <div class="control_play jp-play" @click="playControl(playStatus)">
          <i class="iconfont icon-music_play" v-if="playStatus == 'pause'"></i>
          <i class="iconfont icon-music_pause" v-else></i>
        </div>
        <div class="control_next">
          <i class="iconfont icon-music_next"></i>
        </div>
      </div>
      <div class="play_progress_box">
        <div class="play_progress_crrenttime">{{currentTime.text}}</div>
        <div class="play_progress_wrap" ref="progressBar" @click="progress_control">
          <div class="play_progress_crrent" :style="{width: play_precent + '%'}">
            <div class="play_progress_inner"><img v-if="loading" src="../../../../static/img/loading.svg" alt=""></div>
          </div>
        </div>
        <div class="play_progress_duration">{{duration.text}}</div>
      </div>

      <div class="play_right_box">
        <div class="play_volume_box">
          <i class="iconfont icon-volume_high" @click="volumeChange('close')" v-if="volume != 0"></i>
          <i class="iconfont icon-volume_close" @click="volumeChange('open')" v-else></i>
          <div class="volume_wrap" ref="volumeBar" @click="volume_control">
            <div class="volume_inner" :style="{width: volume + '%'}"></div>
          </div>
        </div>
        <div class="play_loop_box">
          <i v-for="(item, index) in playType" :key="index"
             :class="['iconfont', item.icon]" v-if="playTypeActive == index"
             @click="playTypeChange(index)"></i>
        </div>
        <div class="play_lrc_box">词</div>
        <div class="play_list_box" @click="songlistHandler">
          <span class="icon_music_list">
            <i class="iconfont icon-music_list2"></i>
          </span>
          <span class="music_list_total">99</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import jPlayer from 'jplayer'
  import { mapState } from 'vuex'
  export default {
    name: "player",
    data() {
      return {
        loading: false,
        volume: this.$localStorage.getStore('volume') || 50,
        playTypeActive: '0',
        playType: [
          {
            icon: 'icon-list_play',
          },
          {
            icon: 'icon-loop_play',
          },
          {
            icon: 'icon-single_play',
          },
          {
            icon: 'icon-random_play',
          }
        ],
        play_precent: '0',
        duration: {
          text: '00:00',//转换后
          m: '',//原时长
        },
        currentTime: {
          text: '00:00',//转换后
          m: '',//原时长
        },
        playStatus: 'pause',//当前播放状态，play正在播放 pause暂停
      }
    },
    computed: {
      ...mapState(['music_info'])
    },
    components: {},
    created() {
    },
    mounted() {
      this.$nextTick(()=>{
        this.init();
      })
    },
    methods: {
      init(){
        this.jplayer_init();
      },
      jplayer_init(){
        let vue = this;
        let volume = vue.volume/100;
        $('#jplayerEl').jPlayer({
          ready: function (e) {
            $(this).jPlayer("setMedia", {
              mp3: vue.music_info.url
            });
          },
          wmode: "window",
          supplied: 'mp3',
          volume: volume
          // smoothPlayBar: true,//平滑过渡播放条
          // remainingDuration: true,//是否显示剩余时间
          // useStateClassSkin: true,//是否使用皮肤
        });
        this.timeUpdate();
      },
      timeUpdate(){
        $('#jplayerEl').bind($.jPlayer.event.timeupdate, (e) => {
          this.loading=false;
          this.duration.text = this.$timeFormat(e.jPlayer.status.duration*1000);
          this.duration.m = e.jPlayer.status.duration;
          this.currentTime.text = this.$timeFormat(e.jPlayer.status.currentTime*1000);
          this.currentTime.m = e.jPlayer.status.currentTime;
          this.play_precent = e.jPlayer.status.currentPercentAbsolute;
          // let v = this.$localStorage.getStore('volume');
          this.volume = (this.$typeOf(e.jPlayer.status.volume) === 'undefined' ? this.volume : e.jPlayer.status.volume*100);
          this.$store.commit('get_music_info', {currentTime: this.currentTime.m});
        });
      },
      progress_control(e){
        this.loading=true;
        let progressBar = this.$refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        // let time = this.duration.m * progress;
        $('#jplayerEl').jPlayer('playHead', progress*100);
      },
      playControl(type){
        switch (type) {
          case 'play':
            $('#jplayerEl').jPlayer('pause');
            this.playStatus = 'pause';
            let _info = {
              playStatus: 'pause'
            };
            this.$store.commit('get_music_info',_info);
            break;
          case 'pause':
            $('#jplayerEl').jPlayer('play');
            this.playStatus = 'play';
            let info = {
              playStatus: 'play'
            };
            this.$store.commit('get_music_info',info);
            break;
        }
      },
      volume_control(e){
        let volumeBar = this.$refs.volumeBar;
        let _volume = (e.clientX - volumeBar.getBoundingClientRect().left) / volumeBar.clientWidth;
        this.volume  = _volume*100;
        $('#jplayerEl').jPlayer('volume', _volume);
      },
      volumeChange(type){
        switch (type) {
          case 'close':
            this.volume = 0;
            $('#jplayerEl').jPlayer('volume', 0);
            break;
          case 'open':
            let v = this.$localStorage.getStore('volume');
            this.volume = v || 0;
            $('#jplayerEl').jPlayer('volume', this.volume/100);
            break;
          default:
            this.volume = 100;
            $('#jplayerEl').jPlayer('volume', this.volume/100);
            break;
        }
      },
      playTypeChange(index){
        let i = index+1;
        if(index == this.playType.length-1){
          i = 0
        }
        this.playTypeActive = i;
      },
      againPlay(){
        $('#jplayerEl').jPlayer('setMedia',{
          mp3: this.music_info.url
        }).jPlayer('play');
        this.playStatus = 'play';
      },
      songlistHandler(){
        this.$emit('songlistClick')
      }
    },
    watch: {
      'volume': function (new_val, old_val) {
        if(new_val){
          this.$localStorage.setStore('volume', new_val);
        }
      },
      'music_info.id': function (new_val, old_val) {
        if(this.music_info.playStatus == 'play'){
          this.againPlay();
        }
        this.$localStorage.setStore('music_info', this.music_info);
      }
    }
  }
</script>

<style lang="less" scoped>
.player{
  height: 100%;
  background: #f6f6f8;
  .player_hide{
    width: 0;
    height: 0;
  }
  .player_main{
    height: 100%;
    display: flex;
    align-items: center;

    .play_control_box{
      width: 195px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      &>div{
        color: #ffffff;
        background: #e83c3c;
        border-radius: 50%;
        text-align: center;
        line-height: 1;
        cursor: pointer;
        i{
          font-size: 21px;
        }
        &:hover{
          background: rgba(211,48,48,1);
        }
      }
      .control_pre{
        width: 30px;
        height: 30px;
        font-size: 21px;
        line-height: 30px;
      }
      .control_play{
        width: 35px;
        height: 35px;
        font-size: 21px;
        line-height: 35px;
        i{
          font-size: 19px;
        }
        i.icon-music_play{
          margin-left: 2px;
        }
      }
      .control_next{
        width: 30px;
        height: 30px;
        font-size: 21px;
        line-height: 30px;
      }
    }
    .play_progress_box{
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #333333;
      padding: 0 10px;
      .play_progress_crrenttime{
        padding-right: 13px;
      }
      .play_progress_wrap{
        flex: 1;
        height: 6px;
        background: #c2c2c4;
        border: 1px solid #dbdbdd;
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
      .play_progress_duration{
        padding-left: 10px;
      }
    }
    .play_right_box{
      width: 286px;
      padding-left: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10px;
      .play_volume_box{
        display: flex;
        align-items: center;
        i{
          font-size: 22px;
          color: #666666;
          cursor: pointer;
          &:hover{
            color: #444444;
          }
        }
        .volume_wrap{
          width: 100px;
          position: relative;
          background: #e6e6e8;
          /*border: 1px solid #dbdbdd;*/
          border-radius: 2px;
          height: 4px;
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
      .play_loop_box{
        padding-left: 6px;
        i{
          font-weight: bolder;
          cursor: pointer;
        }
        i.icon-list_play{
          font-weight: normal;
        }
      }
      .play_lrc_box{
        font-size: 12px;
        border: 1px solid #333333;
        line-height: 15px;
        width: 16px;
        height: 16px;
        text-align: center;
        cursor: pointer;
      }
      .play_list_box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #e1e1e2;
        height: 16px;
        width: 45px;
        padding-right: 10px;
        border-radius: 10px;
        cursor: pointer;

        .icon_music_list{
          background: #f6f6f8;
          i{
            font-size: 16px;
            font-weight: bolder;
          }
        }
        .music_list_total{
          color: #333333;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
