<template>
  <div class="common_footer">
    <player @songlistClick="songlistClick"></player>
    <div class="songlist_box" v-if="playlist_show">
      <div class="songlist_tab">
        <header-tab :data="tab_data" tab-type="iview_tab" @tabClick="tabClick"></header-tab>
        <div class="close_list"><i class="iconfont icon-close"></i></div>
      </div>
      <base-table v-show="tab_tabel_active == 'playlist'"
                  :data="playlist_data.data"
                  :config="playlist_data.config"
                  @dbclick="tableClick"
                  stripe="stripe">
        <!--<template slot="header" slot-scope="data">

        </template>
        <template slot="content" slot-scope="data">
          <div class="new_song_content">
            <div class="left_img" v-if="data.data.picUrl">
              <img :src="data.data.picUrl" alt="">
              <div class="img_cover">
                <div class="abs_center play_icon">
                  <i class="iconfont icon-music_play"></i>
                </div>
              </div>
            </div>
            <div class="right_info">
              <span class="song_name" v-if="data.data.song_name">{{data.data.song_name}}</span>
              <div class="alias" v-if="data.data.alias.length">
                <span class="ellipsis_1" v-for="(alias_item, alias_index) in data.data.alias" :key="alias_index">({{alias_item}})</span>
              </div>
              <base-tool-button v-if="data.data.mvid" type="icon" cl-type="play_video_icon_button" icon-class="icon-music_play"></base-tool-button>
              <base-tool-button v-if="data.data.maxbr && data.data.maxbr == '999000'" type="" cl-type="sq_button">SQ</base-tool-button>
              &lt;!&ndash;<span v-if="data.data.singer">{{data.data.singer}}</span>&ndash;&gt;
            </div>
          </div>
        </template>
        <template slot="artists" slot-scope="data">
          <div class="ellipsis_1">
          <span v-if="data.data.artists.length">
            <span class="cursor" v-for="(singer_item, singer_index) in data.data.artists" :key="singer_index">
              <span v-if="singer_index != 0">/ </span> {{singer_item.name}}
            </span>
          </span>
          </div>
        </template>
        <template slot="album_name" slot-scope="data">
          <div class="album_name flex_row" v-if="data.data.album_name">
            <span class="cursor ellipsis_1" v-if="data.data.album_name.name">{{data.data.album_name.name}}</span>
            <span class="ellipsis_1 cursor" v-if="data.data.album_name.alias.length" v-for="(alias_item, alias_index) in data.data.album_name.alias" :key="alias_index">({{alias_item}})</span>
          </div>
        </template>-->
      </base-table>

      <base-table v-show="tab_tabel_active == 'history'"
                  :data="history_data.data"
                  :config="history_data.config"
                  @dbclick="tableClick"
                  stripe="stripe">
        <!--<template slot="header" slot-scope="data">

        </template>
        <template slot="content" slot-scope="data">
          <div class="new_song_content">
            <div class="left_img" v-if="data.data.picUrl">
              <img :src="data.data.picUrl" alt="">
              <div class="img_cover">
                <div class="abs_center play_icon">
                  <i class="iconfont icon-music_play"></i>
                </div>
              </div>
            </div>
            <div class="right_info">
              <span class="song_name" v-if="data.data.song_name">{{data.data.song_name}}</span>
              <div class="alias" v-if="data.data.alias.length">
                <span class="ellipsis_1" v-for="(alias_item, alias_index) in data.data.alias" :key="alias_index">({{alias_item}})</span>
              </div>
              <base-tool-button v-if="data.data.mvid" type="icon" cl-type="play_video_icon_button" icon-class="icon-music_play"></base-tool-button>
              <base-tool-button v-if="data.data.maxbr && data.data.maxbr == '999000'" type="" cl-type="sq_button">SQ</base-tool-button>
              &lt;!&ndash;<span v-if="data.data.singer">{{data.data.singer}}</span>&ndash;&gt;
            </div>
          </div>
        </template>
        <template slot="artists" slot-scope="data">
          <div class="ellipsis_1">
          <span v-if="data.data.artists.length">
            <span class="cursor" v-for="(singer_item, singer_index) in data.data.artists" :key="singer_index">
              <span v-if="singer_index != 0">/ </span> {{singer_item.name}}
            </span>
          </span>
          </div>
        </template>
        <template slot="album_name" slot-scope="data">
          <div class="album_name flex_row" v-if="data.data.album_name">
            <span class="cursor ellipsis_1" v-if="data.data.album_name.name">{{data.data.album_name.name}}</span>
            <span class="ellipsis_1 cursor" v-if="data.data.album_name.alias.length" v-for="(alias_item, alias_index) in data.data.album_name.alias" :key="alias_index">({{alias_item}})</span>
          </div>
        </template>-->
      </base-table>
    </div>
  </div>
</template>

<script>
  import player from '../player/player'
  import { playlist_data} from "./playlist";

  export default {
    name: "common_footer",
    data() {
      return {
        playlist_show: false,
        playlist_data: {},
        history_data: {},
        tab_data: [
          {
            id: 'playlist',
            name: '播放列表',
            path: ''
          },
          {
            id: 'history',
            name: '历史纪录',
            path: ''
          }
        ],
        tab_tabel_active: 'playlist'
      }
    },
    computed: {},
    components: {
      player
    },
    created() {
      this.playlist_data = this.$deepClone(playlist_data);
      this.history_data = this.$deepClone(playlist_data);
    },
    mounted() {
    },
    methods: {
      songlistClick(){
        this.playlist_show = !this.playlist_show;
      },
      tableClick(){

      },
      tabClick(data){
        this.tab_tabel_active = data.id;
      }
    }
  }
</script>

<style lang="less" scoped>
.common_footer{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 1200;
  border-top: 1px solid #e2e2e3;
  background: #ffffff;
  .songlist_box{
    position: absolute;
    bottom: 48px;
    right: 0;
    width: 578px;
    height: 478px;
    background: #f4f4f6;
    box-shadow: -2px -2px 8px rgba(153,153,153,0.5);
    border-top-left-radius: 3px;
    border-top: 1px solid #c2c2c4;
    border-left: 1px solid #c2c2c4;

    .songlist_tab{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
      position: relative;
      .sub_header_nav{
        width: auto;
        height: auto;
      }
      .close_list{
        position: absolute;
        right: 10px;
        top: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
