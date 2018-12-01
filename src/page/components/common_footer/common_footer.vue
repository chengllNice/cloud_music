<template>
  <div class="common_footer" @click.stop="playlist_show = playlist_show">
    <player @songlistClick="songlistClick"></player>
    <div @click.stop="playlist_show = true" class="songlist_box" v-show="playlist_show">
      <div class="songlist_tab">
        <header-tab :data="tab_data" tab-type="iview_tab" @tabClick="tabClick"></header-tab>
        <div class="close_list" @click.stop="playlist_show = false"><i class="iconfont icon-add1"></i></div>
      </div>

      <div class="play_list_info">
        <div class="header_box" v-if="tab_tabel_active == 'playlist'">
          <div class="left">总{{play_music_list.data.length || 0}}首</div>
          <div class="right">
            <div class="collection">
              <i class="iconfont icon-add_file"></i>
              <span>收藏全部</span>
            </div>
            <div class="line"></div>
            <div class="del">
              <i class="iconfont icon-del"></i>
              <span>清空</span>
            </div>
          </div>
        </div>
        <div class="header_box" v-if="tab_tabel_active == 'history'">
          <div class="left">总{{history_music_list.data.length || 0}}首</div>
          <div class="right">
            <div class="del">
              <i class="iconfont icon-del"></i>
              <span>清空</span>
            </div>
          </div>
        </div>
      </div>

      <div class="table_main">
        <base-table v-if="tab_tabel_active == 'playlist'"
                    :data="playlist_data.data"
                    :config="playlist_data.config"
                    type="music"
                    @dbclick="tableClick"
                    stripe="stripe">
          <template slot="playStatus" slot-scope="data">
            <div class="playStatus">
              <i class="iconfont icon-music_play" v-if="data.data.playStatus == 'pause'"></i>
              <i class="iconfont icon-music_pause" v-if="data.data.playStatus == 'play'"></i>
            </div>
          </template>
          <template slot="song_name" slot-scope="data">
            <div class="new_song_content">
              <div class="right_info">
                <span class="song_name" v-if="data.data.song_name">{{data.data.song_name}}</span>
                <div class="alias" v-if="data.data.alias.length">
                  <span class="ellipsis_1" v-for="(alias_item, alias_index) in data.data.alias" :key="alias_index">({{alias_item}})</span>
                </div>
                <base-tool-button v-if="data.data.mvid" type="icon" cl-type="play_video_icon_button"
                                  icon-class="icon-music_play" @click="goToVideo(data.data.mvid)"></base-tool-button>
                <base-tool-button v-if="data.data.maxbr && data.data.maxbr == '999000'" type="" cl-type="sq_button">SQ</base-tool-button>
              </div>
            </div>
          </template>
          <template slot="artists" slot-scope="data">
            <div class="artists ellipsis_1">
              <span v-if="data.data.artists.length">
                <span class="cursor" v-for="(singer_item, singer_index) in data.data.artists" :key="singer_index">
                  <span v-if="singer_index != 0">/ </span> {{singer_item.name}}
                </span>
              </span>
            </div>
          </template>
          <template slot="source_path" slot-scope="data">
            <div class="source_path">
              <i class="iconfont icon-source" title="来源" @click="source_handler(data.data.source_path)"></i>
            </div>
          </template>
        </base-table>

        <base-table v-if="tab_tabel_active == 'history'"
                    :data="history_data.data"
                    :config="history_data.config"
                    @dbclick="tableClick"
                    stripe="stripe">
          <template slot="song_name" slot-scope="data">
            <div class="new_song_content">
              <div class="right_info">
                <span class="song_name" v-if="data.data.song_name">{{data.data.song_name}}</span>
                <div class="alias" v-if="data.data.alias.length">
                  <span class="ellipsis_1" v-for="(alias_item, alias_index) in data.data.alias" :key="alias_index">({{alias_item}})</span>
                </div>
                <base-tool-button v-if="data.data.mvid" type="icon" cl-type="play_video_icon_button"
                                  icon-class="icon-music_play" @click="goToVideo(data.data.mvid)"></base-tool-button>
                <base-tool-button v-if="data.data.maxbr && data.data.maxbr == '999000'" type="" cl-type="sq_button">SQ</base-tool-button>
              </div>
            </div>
          </template>
          <template slot="artists" slot-scope="data">
            <div class="artists ellipsis_1">
              <span v-if="data.data.artists.length">
                <span class="cursor" v-for="(singer_item, singer_index) in data.data.artists" :key="singer_index">
                  <span v-if="singer_index != 0">/ </span> {{singer_item.name}}
                </span>
              </span>
            </div>
          </template>
          <template slot="source_path" slot-scope="data">
            <div class="source_path">
              <i class="iconfont icon-source" title="来源" @click="source_handler(data.data.source_path)"></i>
            </div>
          </template>
        </base-table>
      </div>

    </div>
  </div>
</template>

<script>
  import player from '../player/player'
  import {playlist_data} from "./playlist";
  import {mapState} from 'vuex'

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
    computed: {
      ...mapState(['music_info','play_music_list', 'history_music_list'])
    },
    components: {
      player
    },
    created() {
      this.playlist_data = this.$deepClone(playlist_data);
      this.history_data = this.$deepClone(playlist_data);
    },
    mounted() {
      this.get_play_music_list();
      this.get_history_music_list();
      let vue = this;
      $('body').click(function () {
        vue.playlist_show = false;
      })
    },
    methods: {
      songlistClick() {
        this.playlist_show = !this.playlist_show;
      },
      tableClick(data) {
        let get_data = {
          id: data.data.id
        };
        this.$commonApi.getSongUrl(get_data).then(res => {
          if (res.data && res.data.length) {
            let url = res.data[0].url;
            let info = {
              id: data.data.id,
              url: url,
              playStatus: 'play',
              source_path: data.data.source_path,
              data: data.data
            };
            this.$store.commit('get_music_info', info);
          }
        }).catch(err => {
          console.log('err', err)
        });
      },
      tabClick(data) {
        this.tab_tabel_active = data.id;
      },
      goToVideo(mv_id){
        this.$router.push({
          path: '/play_mv',
          query: { id: mv_id, type: '0'}
        })
      },
      source_handler(data){
        let path = data.path || '';
        let id = data.id || '';
        this.$router.push({
          path: path,
          query: {id:id}
        });
      },
      get_play_music_list() {
        this.playlist_data.data.t_body = this.play_music_list.data;
      },
      get_history_music_list(){
        this.history_data.data.t_body = this.history_music_list.data;
      },
      play_history_list(id){
        let data = this.$deepClone(this.music_info.data);
        let _index = -1;
        this.history_music_list.data.forEach((item, index)=>{
          if(item.id == data.id){
            _index = index;
            return
          }
        });
        // 播放历史
        if(_index == -1){
          if(this.history_music_list.data.length >= 100){
            this.$store.state.history_music_list.data.pop();
          }
          this.$store.state.history_music_list.data.unshift(data);
        }else{
          this.$store.state.history_music_list.data.splice(_index,1);
          this.$store.state.history_music_list.data.unshift(data);
        }
        this.history_data.data.t_body = this.history_music_list.data;
        this.$localStorage.setStore('history_music_list', this.history_music_list);
      }
    },
    watch: {
      'music_info.id': function (new_val, old_val) {
        this.play_history_list(new_val);
        this.get_play_music_list();
      },
    }
  }
</script>

<style lang="less" scoped>
  .common_footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    z-index: 1200;
    border-top: 1px solid #e2e2e3;
    background: #ffffff;
    .songlist_box {
      position: absolute;
      bottom: 48px;
      right: 0;
      width: 578px;
      height: 478px;
      background: #f4f4f6;
      box-shadow: -2px -2px 8px rgba(153, 153, 153, 0.5);
      border-top-left-radius: 3px;
      border-top: 1px solid #c2c2c4;
      border-left: 1px solid #c2c2c4;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .songlist_tab {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 45px;
        position: relative;
        .sub_header_nav {
          width: auto;
          height: auto;
        }
        .close_list {
          position: absolute;
          right: 10px;
          top: 0;
          bottom: 0;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(45deg);
          cursor: pointer;
        }
      }

      .new_song_content {
        display: flex;
        align-items: center;
        
        .left_img {
          position: relative;
          width: 40px;
          height: 40px;
          img {
            width: 100%;
            height: 100%;
          }
          .img_cover {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
        .right_info {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: left;
          align-items: center;
          color: #333333;
          .song_name {
            max-width: 100%;
            flex: none;
            display: flex;
            span {
              flex: 1;
            }
          }
          .tool_button {
            flex: none;
          }
          & > * {
            margin-right: 5px;
          }
          .alias {
            color: #888888;
            display: flex;
            span {
              flex: 1;
            }
          }
        }
      }
      .play_list_info {
        .header_box {
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          font-size: 12px;
          color: #666;
          background: #f9f9f9;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          .left {

          }
          .right {
            display: flex;
            align-items: center;
            .collection {
              display: flex;
              align-items: center;
              padding: 0 6px;
              i {
                font-size: 18px;
                margin-right: 3px;
              }
            }
            .line {
              height: 12px;
              width: 0;
              border-left: 1px solid #e1e1e2;
            }
            .del {
              display: flex;
              align-items: center;
              padding: 0 6px;
              i {
                margin-right: 3px;
              }
            }
          }
        }
      }

      .table_main {
        flex: 1;
        overflow-y: scroll;
        overflow-x: hidden;
        .artists{
          color: #888;
          &:hover{
            color: #111;
          }
        }
        .playStatus{
          height: 18px;
          padding-left:2px;
          i{
            font-size: 12px;
            color: #c62f2f;
          }
        }
        .source_path{
          height: 18px;
          i{
            color: #888;
            font-size:14px;
            cursor: pointer;
            &:hover{
              color: #111;
            }
          }
        }
      }
    }

  }
</style>
<style lang="less">

</style>
