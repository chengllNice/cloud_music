<template>
  <div class="left_nav">
    <div class="list_box" ref="leftNav">
      <div class="left_nav_list">
        <div class="left_nav_item" v-for="(item, index) in left_nav_data" :key="index">
          <div class="header">
            <div class="name">{{item.title.name}}</div>
            <div class="opare_box" v-if="item.title.new_item_btn || item.title.down_btn">
              <div class="add" v-if="item.title.new_item_btn">
                <base-tool-button type="icon" iconClass="icon-plus_add" border-width="0px" fontColor="#cfcfd1" fontSize="14px" backgroundColor="rgba(0,0,0,0)" color="#eec1c1" font-size="12px"></base-tool-button>
              </div>
              <div class="dropdown" v-if="item.title.down_btn">
                <base-tool-button type="icon" iconClass="icon-arrow_drop_down" border-width="0px" fontColor="#cfcfd1" fontSize="12px" backgroundColor="rgba(0,0,0,0)" color="#eec1c1" font-size="12px"></base-tool-button>
              </div>
            </div>
          </div>
          <div class="body">
            <div class="body_list">
              <div class="body_item" v-for="(body_item, body_index) in item.data" :key="body_index" @click="songlistClick(body_item)" :class="{'nav_active': nav_active == body_item.id}">
                <div class="left_icon">
                  <i class="iconfont" :class="body_item.icon.name"
                     :style="{'font-size': body_item.icon.fontSize, 'font-weight': body_item.icon.fontWeight}">
                  </i>
                </div>
                <div class="left_name ellipsis_1">{{body_item.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="play_music_box" v-if="music_info.id">
      <div class="left">
        <div class="music_cover_img" @click="lrc_cover_show">
          <img :src="music_info.picUrl" :alt="music_info.song_name">
          <div class="open">
            <i class="iconfont icon-open1"></i>
          </div>
        </div>
        <div class="music_info">
          <div class="music_name ellipsis_1" v-if="music_info.song_name">{{music_info.song_name}}</div>
          <div class="music_sing ellipsis_1" v-if="music_info.artists && music_info.artists.length">
            <span v-for="(artists_item, artists_index) in music_info.artists" :key="artists_index">
              <span v-if="artists_index">/ </span> {{artists_item.name}}
            </span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="like_icon">
          <base-tool-button type="icon" iconClass="icon-left_like" border-width="0px" fontColor="#6f6f6f" fontSize="14px" backgroundColor="rgba(0,0,0,0)" color="#eec1c1" font-size="12px"></base-tool-button>
        </div>
        <div class="shape_icon">
          <base-tool-button type="icon" iconClass="icon-shape" border-width="0px" fontColor="#6f6f6f" fontSize="12px" backgroundColor="rgba(0,0,0,0)" color="#eec1c1" font-size="12px"></base-tool-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { left_nav_data} from "./left_nav_data";
  import BScroll from 'better-scroll'
  import { mapState } from 'vuex'
  import { get_user_playlist} from "../../../server/common_api";

  export default {
    name: "left_nav",
    data(){
      return {
        left_nav_data: null,
        nav_active: 'find_music'
      }
    },
    computed: {
      ...mapState(["music_info", 'user_info'])
    },
    created(){
      this.left_nav_data = this.$deepClone(left_nav_data);
    },
    mounted(){
      let vue = this;
      this.$nextTick(()=>{
        setTimeout(()=>{
          vue.scroll_init();
        },20)
        this.nav_active_handler();
        if(this.user_info.id){
          this.get_user_playlist();
        }
      })
    },
    methods: {
      nav_active_handler(){
        if(this.$route.query.id){
          this.nav_active = this.$route.query.id;
        }
      },
      scroll_init(){
        let vue = this;
        let scroll = new BScroll(vue.$refs.leftNav,{
          click: true,
          mouseWheel: true,
          scrollY: true,
          // disableTouch: true,
          // disableMouse: false,
        });
        // scroll.disable();
      },
      lrc_cover_show(){
        this.$store.commit('set_lrc_panal_show', true)
      },
      songlistClick(data){
        this.nav_active = data.id;
        this.$router.push({
          path: data.path,
          query: { id: data.id}
        })
      },
      get_user_playlist(){
        let get_data = {
          uid: this.user_info.id
        };
        get_user_playlist(get_data).then(res=>{
          let playlist = res.playlist;
          this.left_nav_data[2].data = [];
          this.left_nav_data[3].data = [];
          playlist.forEach(item=>{
            if(item.creator.userId == this.user_info.id){
              let name = item.name;
              let obj = {};
              if(name.indexOf(this.user_info.name) != -1){
                // 我喜欢的音乐
                name = '我喜欢的音乐';
                obj = {
                  type: 'songlist',
                  name: name,
                  id: item.id,
                  noshow: false,
                  icon: {
                    name: 'icon-left_like',
                    fontSize: '18px',
                    fontWeight: '600'
                  },
                  path: '/songlist_detail_common'
                }
              }else{
                // 我创建的歌单
                obj = {
                  type: 'songlist',
                  name: name,
                  id: item.id,
                  noshow: false,
                  icon: {
                    name: 'icon-left_music_list',
                    fontSize: '17px',
                    fontWeight: '400'
                  },
                  path: '/songlist_detail_common'
                }
              }
              this.left_nav_data[2].data.push(obj);
            }else{
              // 我收藏的歌单
              let name = item.name;
              let obj = {};
              obj = {
                type: 'songlist',
                name: name,
                id: item.id,
                noshow: false,
                icon: {
                  name: 'icon-left_music_list',
                  fontSize: '17px',
                  fontWeight: '400'
                },
                path: '/songlist_detail_common'
              };
              this.left_nav_data[3].data.push(obj);
            }
          })
        }).catch(err=>{
          console.log('err',err)
        });
      }
    },
    watch:{

    }
  }
</script>

<style lang="less" scoped>
.left_nav{
  height: 100%;
  background: #f5f5f7;
  position: relative;
  border-right: 1px solid #e2e2e3;
  overflow: hidden;
  z-index: 20;
  .list_box{
    height: 100%;
    /*overflow: hidden;*/
  }
  .left_nav_list{
    /*height: 100%;*/
    padding-bottom: 57px;
    .left_nav_item{
      padding-bottom: 10px;
      .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 7px;
        padding-bottom: 8px;
        cursor: default;
        .name{
          flex: 1;
          color: #757575;
          font-size: 12px;
        }
        .opare_box{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .add{
            cursor: pointer;
          }
          .dropdown{
            cursor: pointer;
            margin-left: 7px;
            i{
              font-weight: bolder;
            }
          }
        }
      }
      .body{
        .body_list{
          .body_item{
            display: flex;
            align-items: center;
            padding-left: 17px;
            height: 32px;
            cursor: pointer;
            border-left: 3px solid transparent;
            &:hover{
              i{
                color: #2b2b2b!important;
              }
              .left_name{
                color: #2b2b2b!important;
              }
            }

            .left_icon{
              i{
                /*color: #2b2b2b;*/
                color: #777474;
              }
            }
            .left_name{
              color: #626262;
              font-size: 12px;
              padding-left: 10px;
              cursor: pointer;
            }
          }
          .nav_active{
            border-left: 3px solid #c62f2f;
            background: #e6e7ea;
            i{
              color: #2b2b2b!important;
            }
            .left_name{
              color: #2b2b2b!important;
            }
          }
        }
      }
    }
  }

  .play_music_box{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 57px;
    border-top: 1px solid #e2e2e3;
    background: #f5f5f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    &:hover{
      .open{
        display: block!important;
      }
    }
    .left{
      display: flex;
      align-items: center;
      .music_cover_img{
        flex: none;
        width: 45px;
        height: 45px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        .open{
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          text-align: center;
          i{
            color: #cfcfcf;
            font-size: 28px;
          }
        }
        img{
          width: 45px;
          height: 45px;
        }
      }
      .music_info{
        margin-left: 8px;
        padding-right: 10px;
        .music_name{
          cursor: pointer;
          font-size: 12px;
          color: #333333;
          margin-bottom: 5px;
        }
        .music_sing{
          cursor: pointer;
          font-size: 12px;
          color: #666666;
        }
      }
    }
    .right{
      .like_icon{
        margin-bottom: 8px;
        cursor: pointer;
      }
      .shape_icon{
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="less">
  .left_nav{
    .play_music_box{
      .like_icon{
        &:hover{
          i{
            color: #2b2b2b;
          }
        }
      }
      .shape_icon{
        &:hover{
          i{
            color: #2b2b2b;
          }
        }
      }
    }
  }

</style>
