<template>
  <div class="top_list">
    <div class="official_list">
      <div class="title">官方榜</div>
      <div class=content>
        <div class="up_music_list">
          <base-table :data="up_music_list.data"
                      :config="up_music_list.config"
                      @dbclick="tableClick"
                      stripe="stripe">
            <template slot="header" slot-scope="data">
              <div class="table_header">
                <div class="header">
                  <div class="left">
                    <div class="one_title">飙</div>
                    <div class="two_title_box">
                      <div class="two_title">升榜</div>
                      <div class="publish_time">{{up_music_list.trackUpdateTime}}</div>
                    </div>
                  </div>
                  <div class="right">
                    <i class="iconfont icon-music_play"></i>
                  </div>
                </div>
              </div>
            </template>
            <template slot="sort_num_custom" slot-scope="data">
              <div class="sort_num_custom" :class="{'sort_high': data.data._index <= 2}">
                {{data.data._index+1}}
              </div>
            </template>
            <template slot="trackIds" slot-scope="data">
              <div class="trackIds">
                {{data.data.trackIds+'%'}}
              </div>
            </template>
            <template slot="song_name" slot-scope="data">
              <div class="song_name ellipsis_1">
                <span class="name">{{data.data.song_name}}</span>
                <span class="alias" v-for="(alias_item, alias_index) in data.data.alias" :key="alias_index">
                  <span>({{alias_item}})</span>
                </span>
              </div>
            </template>
            <template slot="artists" slot-scope="data">
              <div class="artists ellipsis_1">
                <span v-for="(ar_item, ar_index) in data.data.artists" :key="ar_index">
                  <span v-if="ar_index != '0'">/</span>{{ar_item.name}}
                </span>
              </div>
            </template>
            <template slot="footer" slot-scope="data">
              <div class="seen_all">
                <span @click="songlist_all(up_music_list.songlist_id, 'up')">查看全部></span>
              </div>
            </template>
          </base-table>
        </div>
        <div class="new_music_list">
          <base-table :data="new_music_list.data"
                      :config="new_music_list.config"
                      @dbclick="tableClick"
                      stripe="stripe">
            <template slot="header" slot-scope="data">
              <div class="table_header">
                <div class="header">
                  <div class="left">
                    <div class="one_title">新</div>
                    <div class="two_title_box">
                      <div class="two_title">歌榜</div>
                      <div class="publish_time">{{new_music_list.trackUpdateTime}}</div>
                    </div>
                  </div>
                  <div class="right">
                    <i class="iconfont icon-music_play"></i>
                  </div>
                </div>
              </div>
            </template>
            <template slot="sort_num_custom" slot-scope="data">
              <div class="sort_num_custom" :class="{'sort_high': data.data._index <= 2}">
                {{data.data._index+1}}
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
            <template slot="song_name" slot-scope="data">
              <div class="song_name ellipsis_1">
                <span class="name">{{data.data.song_name}}</span>
                <span class="alias" v-for="(alias_item, alias_index) in data.data.alias" :key="alias_index">
                  <span>({{alias_item}})</span>
                </span>
              </div>
            </template>
            <template slot="artists" slot-scope="data">
              <div class="artists ellipsis_1">
                <span v-for="(ar_item, ar_index) in data.data.artists" :key="ar_index">
                  <span v-if="ar_index != '0'">/</span><span>{{ar_item.name}}</span>
                </span>
              </div>
            </template>
            <template slot="footer" slot-scope="data">
              <div class="seen_all">
                <span @click="songlist_all(new_music_list.songlist_id, 'lastRank')">查看全部></span>
              </div>
            </template>
          </base-table>
        </div>
        <div class="origin_music_list">
          <base-table :data="origin_music_list.data"
                      :config="origin_music_list.config"
                      @dbclick="tableClick"
                      stripe="stripe">
            <template slot="header" slot-scope="data">
              <div class="table_header">
                <div class="header">
                  <div class="left">
                    <div class="one_title">原</div>
                    <div class="two_title_box">
                      <div class="two_title">创榜</div>
                      <div class="publish_time">{{origin_music_list.trackUpdateTime}}</div>
                    </div>
                  </div>
                  <div class="right">
                    <i class="iconfont icon-music_play"></i>
                  </div>
                </div>
              </div>
            </template>
            <template slot="sort_num_custom" slot-scope="data">
              <div class="sort_num_custom" :class="{'sort_high': data.data._index <= 2}">
                {{data.data._index+1}}
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
            <template slot="song_name" slot-scope="data">
              <div class="song_name ellipsis_1">
                <span class="name">{{data.data.song_name}}</span>
                <span class="alias" v-for="(alias_item, alias_index) in data.data.alias" :key="alias_index">
                  <span>({{alias_item}})</span>
                </span>
              </div>
            </template>
            <template slot="artists" slot-scope="data">
              <div class="artists ellipsis_1">
                <span v-for="(ar_item, ar_index) in data.data.artists" :key="ar_index">
                  <span v-if="ar_index != '0'">/</span><span>{{ar_item.name}}</span>
                </span>
              </div>
            </template>
            <template slot="footer" slot-scope="data">
              <div class="seen_all">
                <span @click="songlist_all(origin_music_list.songlist_id, 'lastRank')">查看全部></span>
              </div>
            </template>
          </base-table>
        </div>
        <div class="hot_music_list">
          <base-table :data="hot_music_list.data"
                      :config="hot_music_list.config"
                      @dbclick="tableClick"
                      stripe="stripe">
            <template slot="header" slot-scope="data">
              <div class="table_header">
                <div class="header">
                  <div class="left">
                    <div class="one_title">热</div>
                    <div class="two_title_box">
                      <div class="two_title">歌榜</div>
                      <div class="publish_time">{{hot_music_list.trackUpdateTime}}</div>
                    </div>
                  </div>
                  <div class="right">
                    <i class="iconfont icon-music_play"></i>
                  </div>
                </div>
              </div>
            </template>
            <template slot="sort_num_custom" slot-scope="data">
              <div class="sort_num_custom" :class="{'sort_high': data.data._index <= 2}">
                {{data.data._index+1}}
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
            <template slot="song_name" slot-scope="data">
              <div class="song_name ellipsis_1">
                <span class="name">{{data.data.song_name}}</span>
                <span class="alias" v-for="(alias_item, alias_index) in data.data.alias" :key="alias_index">
                  <span>({{alias_item}})</span>
                </span>
              </div>
            </template>
            <template slot="artists" slot-scope="data">
              <div class="artists ellipsis_1">
                <span v-for="(ar_item, ar_index) in data.data.artists" :key="ar_index">
                  <span v-if="ar_index != '0'">/</span><span>{{ar_item.name}}</span>
                </span>
              </div>
            </template>
            <template slot="footer" slot-scope="data">
              <div class="seen_all">
                <span @click="songlist_all(hot_music_list.songlist_id, 'lastRank')">查看全部></span>
              </div>
            </template>
          </base-table>
        </div>
        <div class="singer_list">
          <base-table :data="singer_list.data"
                      :config="singer_list.config"
                      @clickRow="clickRow"
                      stripe="stripe">
            <template slot="header" slot-scope="data">
              <div class="table_header">
                <div class="header">
                  <div class="left">
                    <div class="one_title">歌</div>
                    <div class="two_title_box">
                      <div class="two_title">手榜</div>
                      <div class="publish_time">{{singer_list.trackUpdateTime}}</div>
                    </div>
                  </div>
                  <div class="right">
                    <i class="iconfont icon-music_play"></i>
                  </div>
                </div>
              </div>
            </template>
            <template slot="sort_num_custom" slot-scope="data">
              <div class="sort_num_custom" :class="{'sort_high': data.data._index <= 2}">
                {{data.data._index+1}}
              </div>
            </template>
            <template slot="lastRank" slot-scope="data">
              <div class="lastRank">
                <i class="iconfont icon-sort_new" v-if="data.data.lastRank === ''"></i>
                <i v-else-if="data.data.lastRank < data.data._index" class="iconfont icon-sort_down"></i>
                <i v-else-if="data.data.lastRank > data.data._index" class="iconfont icon-sort_up"></i>
                <span v-else>-</span>
              </div>
            </template>
            <template slot="footer" slot-scope="data">
              <div class="seen_all">
                <span>查看全部></span>
              </div>
            </template>
          </base-table>
        </div>
      </div>
    </div>
    <div class="whole_world_list">
      <div class="title">全球榜</div>
      <div class="content">
        <base-sing-list class="home_list" :list-data="whole_world_list_data"
                        :cols-num="whole_world_list_data.colsNum" @songlistClick="songlistClickHandler">
        </base-sing-list>
      </div>
    </div>
  </div>
</template>

<script>
  import {up_music_list_data, music_list_data, singer_list_data, whole_world_list_data} from "./top_list_data";
  import {get_top_list, get_toplist_artist, get_toplist_detail} from "../../../../server/home";
  import { mapState} from 'vuex'
  export default {
    name: "top_list",
    data() {
      return {
        up_music_list: {},
        new_music_list: {},
        origin_music_list: {},
        hot_music_list: {},
        singer_list: {},
        whole_world_list_data: {}
      }
    },
    computed: {
      ...mapState(['device_info'])
    },
    components: {},
    created() {
      this.up_music_list = this.$deepClone(up_music_list_data);
      this.new_music_list = this.$deepClone(music_list_data);
      this.origin_music_list = this.$deepClone(music_list_data);
      this.hot_music_list = this.$deepClone(music_list_data);
      this.singer_list = this.$deepClone(singer_list_data);
      this.whole_world_list_data = this.$deepClone(whole_world_list_data);
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.get_top_list('3');//飙升榜
        this.get_top_list('0');//新歌榜
        this.get_top_list('1');//热歌榜
        this.get_top_list('2');//原创榜
        this.get_top_list('23');//江小白说唱榜
        this.whole_world_list_init();//所有榜单内容摘要（全球榜）
        this.get_toplist_artist();//歌手榜
      },
      whole_world_list_init(){
        get_toplist_detail().then(res=>{
          let data = res.list.slice(4);
          let format_data = this.$uiconfigFormat(data,this.whole_world_list_data.uiconfig);
          this.$unitFormat(format_data, 'playCount');
          this.whole_world_list_data.data = format_data;
          this.whole_world_list_format();
        }).catch(err=>{
          console.log('err',err)
        })
      },
      whole_world_list_format(){
        let device_info = this.device_info;
        if(device_info.clientWidth >= 1068){
          this.whole_world_list_data.colsNum = 6;
        }else{
          this.whole_world_list_data.colsNum = 5;
        }
      },
      get_top_list(idx) {
        let get_data = {
          idx: idx,
        };
        get_top_list(get_data).then(res => {
          let tracks_sub_8 = res.playlist.tracks.slice(0, 8);
          let trackIds_sub_8 = res.playlist.trackIds.slice(0, 8);
          let trackUpdateTime = this.$timeFormat(res.playlist.updateTime, 'mm月dd日')+'更新';
          let songlist_id = res.playlist.id;
          let trackIds = res.playlist.trackIds.slice(0, 8);
          switch (idx) {
            case '0':
              this.new_music_list.trackUpdateTime = trackUpdateTime;
              this.new_music_list.songlist_id = songlist_id;
              tracks_sub_8.forEach((item, index)=>{
                item.trackIds = (trackIds[index].lr === 0) ? '0' : (trackIds[index].lr || '');
              });
              this.$tableListInit(tracks_sub_8, this.new_music_list.data);
              break;
            case '1':
              this.hot_music_list.trackUpdateTime = trackUpdateTime;
              this.hot_music_list.songlist_id = songlist_id;
              tracks_sub_8.forEach((item, index)=>{
                item.trackIds = (trackIds[index].lr === 0) ? '0' : (trackIds[index].lr || '');
              });
              this.$tableListInit(tracks_sub_8, this.hot_music_list.data);
              break;
            case '2':
              this.origin_music_list.trackUpdateTime = trackUpdateTime;
              this.origin_music_list.songlist_id = songlist_id;
              tracks_sub_8.forEach((item, index)=>{
                item.trackIds = (trackIds[index].lr === 0) ? '0' : (trackIds[index].lr || '');
              });
              this.$tableListInit(tracks_sub_8, this.origin_music_list.data);
              break;
            case '3':
              this.up_music_list.trackUpdateTime = trackUpdateTime;
              this.up_music_list.songlist_id = songlist_id;
              tracks_sub_8.forEach((item, index)=>{
                item.trackIds = trackIds[index].ratio;
              });
              this.$tableListInit(tracks_sub_8, this.up_music_list.data);
              break;
          }

        }).catch(err => {
          console.log('err', err)
        })
      },
      get_toplist_artist(idx) {
        let get_data = {
          limit: 10,
          offset: 0
        };
        get_toplist_artist(get_data).then(res => {
          let data = res.list.artists.slice(0,8);
          this.singer_list.trackUpdateTime = this.$timeFormat(res.list.updateTime, 'mm月dd日') + '更新';

          this.$tableListInit(data, this.singer_list.data)
        }).catch(err => {
          console.log('err', err)
        })
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
      // 查看全部
      songlist_all(id, type){
        this.$router.push({
          path: '/songlist_detail_common',
          query: { id: id, type: type}
        })
      },
      // 歌手榜点击
      clickRow(data){
        this.$router.push({
          path: '/singer_detail_common',
          query: { id: data.data.id}
        })
      },
      // 全球榜
      songlistClickHandler(data){
        this.$router.push({
          path: '/songlist_detail_common',
          query: { id: data.id, type: 'lastRank'}
        });
      }
    },
    watch: {
      'device_info.clientWidth': function (new_val, old_val) {
        this.whole_world_list_format();
      }
    }
  }
</script>

<style lang="less" scoped>
  .top_list {
    width: 100%;
    .title{
      font-size: 16px;
      border-bottom: 1px solid #e1e1e2;
      padding: 10px 0;
      margin-bottom: 20px;
    }
    .official_list {
      width: 100%;
      .content{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        &>*{
          margin-bottom: 20px;
          padding-right: 20px;
          &.origin_music_list{
            padding-right: 0;
          }
        }
        .up_music_list,.new_music_list,.origin_music_list,.hot_music_list,.singer_list{
          width: 33.33%;
          .sort_num_custom{
            width: 100%;
            text-align: right;
            font-size: 16px;
            color: #666;
            &.sort_high{
              color: #cd2929;
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
          .table_header{
            height: 92px;
            background: linear-gradient(170deg, #6092e7, #5ba7e7);
            padding: 0 10px;
            overflow: hidden;
            .header{
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 100%;
              .left{
                display: flex;
                align-items: center;
                color: #ffffff;

                .one_title{
                  font-size: 48px;
                  line-height: 1;
                }
                .two_title_box{
                  flex: none;
                  margin-left: 5px;
                  .two_title{
                    font-size: 26px;
                    line-height: 1;
                  }
                  .publish_time{
                    font-size: 12px;
                    color: #ffffff;
                    opacity: 0.5;
                    line-height: 1;
                    margin-top: 10px;
                  }
                }
              }
              .right{
                width: 40px;
                height: 40px;
                border: 1px solid rgba(255,255,255,0.7);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-left: 3px;
                cursor: pointer;
                &:hover{
                  border: 1px solid rgba(255,255,255,1);
                  i{
                    color: rgba(255,255,255,1);
                  }
                }
                i{
                  font-size: 24px;
                  line-height: 1;
                  color: rgba(255,255,255,0.7);
                }
              }
            }
          }
          .song_name,.artists{
            width: 100%;
            span.alias{
              color: #888;
            }
          }
          .artists{
            text-align: right;
          }
          .seen_all{
            width: 100%;
            text-align: right;
            font-size: 12px;
            color: #888;
            padding: 0 5px;
            background: #f5f5f7;
            span{
              cursor: pointer;
              &:hover{
                color: #666;
              }
            }
          }
        }
        .up_music_list{
          .trackIds{
            width: 100%;
            color: #888;
          }
        }
        .new_music_list{
          .table_header{
            background: linear-gradient(170deg, #1198b4, #44c3cd);
          }
        }
        .origin_music_list{
          .table_header{
            background: linear-gradient(170deg, #c9315e, #eb5480);
          }
        }
        .hot_music_list{
          .table_header{
            background: linear-gradient(170deg, #ba4431, #cd6c45);
          }
        }
        .singer_list{
          .table_header{
            background: linear-gradient(170deg, #8235c1, #ab61d4);
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
      }
    }
  }
</style>
<style lang="less">
  .top_list{
    .ivu-table-body{
      border-left: 1px solid #e1e1e2;
      border-right: 1px solid #e1e1e2;
    }
    .ivu-table-footer, .ivu-table-title{
      height: auto;
    }
    .ivu-table-footer{
      border: 1px solid #e1e1e2;
      border-top: none;
    }
  }
</style>
