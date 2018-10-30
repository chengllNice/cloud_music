<template>
    <div class="common_lrc">
      <div class="lrc_main">
        <div class="bg_blur_box"></div>
        <div class="lrc_main_left">
          <div class="album_cover_box">
            <div class="album_cover"></div>
            <div class="album_swith"></div>
            <div class="song_cover">
              <img src="../../../../static/img/test/music_cover.jpg" alt="">
            </div>
          </div>
        </div>
        <div class="lrc_main_right">
          <div class="panel lyric">
            <div class="lyric_wrap">
              <ul id="lyric">
                <li>HTML5 music player</li>
              </ul>
            </div>
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
            songId: '1318568346',
            lrc_data: ''
          }
      },
      computed: {
        ...mapState(['music_info'])
      },
      mounted(){
        // this.get_song_lrc_handler(this.songId);
        this.renderLyric(this.parseLyric(lrc.lrc));
      },
      methods: {
        get_song_lrc_handler(id){
          let get_data = {
            id: id
          };
          this.$commonApi.getSongLrc(get_data).then(res=>{
            // this.lrc_data = res.lrc.lyric;
            this.lrc_data = this.parseLyric(res.lrc.lyric);
            console.log(res)
          }).catch(err=>{

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
              lrcObj[time] = clause;
            }
          }
          console.log(lrcObj);
          return lrcObj;
        },
        // 渲染
        renderLyric(data){
          let lyric = $("#lyric");
          let lyric_wrap = $(".lyric_wrap");
          lyric.html("");
          var lyricLineHeight = 27,
          offset = lyric_wrap.offset().height*0.4;

          for(var k in data){
            var txt = data[k];
            if(!txt)txt = "&nbsp;";
            // music.lyric.parsed[k] = {
            //   index:i++,
            //   text:txt,
            //   top: i*lyricLineHeight-offset
            // };
            var li = $("<li>"+txt+"</li>");
            lyric.append(li);
          }
          // $player.bind("timeupdate",updateLyric);
          // lyric.html("<li style='text-align: center'>歌词加载失败</li>");
        },
        // 歌词滚动
        updateLyric(){
          var data = $player.music.lyric.parsed;
          if(!data)return;
          var currentTime = Math.round(this.currentTime);
          var lrc = data[currentTime];
          if(!lrc)return;
          var text = lrc.text;
          if(text != text_temp){
            locationLrc(lrc);
            text_temp = text;
          }
          function locationLrc(lrc){
            lyric_wrap.find(".lyric_wrap .on").removeClass("on");
            var li = lyric_wrap.find("li:nth-child("+(lrc.index+1)+")");
            li.addClass("on");
            var top = Math.min(0,-lrc.top);
            //lyric.css({"-webkit-transform":"translate(0,-"+lrc.top+"px)"});
            lyric.css({"margin-top":top});
          }
        }
      },
      watch: {
        'music_info.id': function (new_val, old_val) {
          this.get_song_lrc_handler(new_val);
        }
      }
    }
</script>

<style lang="less" scoped>
.common_lrc{
  width: 100%;
  background: #f2f2f2;
  .lrc_main{
    position: relative;
    display: flex;
    align-items: center;
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
      background: url("../../../../static/img/test/music_cover.jpg") no-repeat;
      background-size: 80% 100%;
      filter: blur(70px);
    }
    .lrc_main_left{
      position: relative;
      z-index: 2;
      padding-top: 53px;

      .album_cover_box{
        width: 325px;
        height: 325px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
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
        .album_swith{
          position: absolute;
          top: -58px;
          left: 50%;
          /*overflow: hidden;*/
          width: 105px;
          height: 130px;
          background: url("../../../../static/img/swith.png") no-repeat;
          background-size: 80%;
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

    }
    .lrc_main_right{
      width: 500px;
      .panel.lyric{
        color: #ffffff;
      }
    }
  }
}
</style>
