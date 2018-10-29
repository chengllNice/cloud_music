<template>
    <div class="common_lrc">
      <div class="lrc_main">
        <div class="lrc_main_left">
          <div class="album_cover_box">
            <div class="album_cover"></div>
            <div class="song_cover"></div>
          </div>
        </div>
        <div class="lrc_main_right"></div>
      </div>
      <div class="song_comment"></div>
    </div>
</template>

<script>
    export default {
        name: "commonLrc",
      data(){
          return {

          }
      },
      mounted(){

      },
      methods: {

      }
    }
</script>

<style lang="less" scoped>
.common_lrc{
  width: 100%;
  background: #f2f2f2;
  .lrc_main{
    display: flex;
    align-items: center;
    justify-content: center;
    .lrc_main_left{
      position: relative;

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
          border-radius: 50%;
          overflow: hidden;
          width: 325px;
          height: 325px;
          background: url("../../../../static/img/coverall.png") no-repeat;
          background-position: -222px -919px;
          background-size: 185%;
        }
        .song_cover{
          width: 210px;
          height: 210px;
          background: url("../../../../static/img/test/music_cover.jpg") no-repeat;
          background-size: contain;
        }
      }

    }
    .lrc_main_right{

    }
  }
}
</style>
