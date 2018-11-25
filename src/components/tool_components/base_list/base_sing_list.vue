<template>
  <div class="base_sing_list">
    <div class="list_box">
      <div class="header_box" v-if="base_data.title && !base_data.title.noshow">
        <div class="title">{{base_data.title.name}}</div>
        <div class="other" v-if="base_data.title.more_btn" @click="moreClick(base_data)">
          <span>{{base_data.title.more_btn}}</span>
          <i class="iconfont icon-right"></i>
          <!--<slot name="header_right"></slot>-->
        </div>
      </div>
      <div class="body_box">
        <slot name="song_body" v-if="base_data.slot && base_data.slot == 'song_body'"></slot>
        <div class="item" v-else v-for="(item, index) in base_data.data" :key="index"
             :style="{width: (100/colsNum)+'%'}"
            :class="{'itemFirst': index%colsNum == 0}">
          <div class="item_img" :class="{'coverall': item.picUrl && base_data.type == 'album'}" @click="itemClick(item)">
            <!--<div class="coverall" v-if=""></div>-->
            <img :src="item.picUrl+'?param='+(item.width || '500')+'y'+(item.height || '500')" :alt="item.name">
            <div class="item_img_cover" v-if="base_data.expand && !base_data.expand.nocover">
              <!--顶部覆盖-->
              <div class="cover_top" v-if="base_data.expand && base_data.expand.cover_top">
                <i class="iconfont"
                   :class="{'icon-left_video': item.type == 'mv',
                    'icon-headphone': item.type == 'sing_list'}"></i>
                <span>{{item.playCount}}</span>
              </div>

              <!--hover下拉-->
              <div class="top_drop_down ellipsis_2" v-if="item.copywriter && base_data.expand && base_data.expand.drop_down">
                {{item.copywriter}}
              </div>

              <!--底部覆盖-->
              <div class="cover_bottom ellipsis_1" v-if="base_data.expand.cover_bottom">
                <i class="iconfont icon-tab_personal" v-if="item.userType || item.userType == 0"></i>
                {{item.nickname}}
                <i class="iconfont icon-star" v-if="item.userType && item.userType == 200"></i>
                <i class="iconfont icon-left_local_music1" v-if="item.userType && item.userType == 4"></i>
                <i class="iconfont icon-wan_vip" v-if="item.userType && item.userType == 10"></i>
                <span>{{item.duration}}</span>
              </div>

              <!--右下角播放图标-->
              <div class="play_circle_icon play_icon" v-if="base_data.expand.play_icon">
                <i class="iconfont icon-music_play"></i>
              </div>
              <!--左上角视频图标-->
              <div class="play_circle_icon_01 play_icon" v-if="base_data.expand.play_video">
                <i class="iconfont icon-left_video" v-if="item.type == 'video_top'"></i>
                <i class="iconfont icon-article_list" v-if="item.type == 'article'"></i>
              </div>
            </div>
          </div>
          <!--歌名+歌手-->
          <div class="item_name" v-if="base_data.type == 'mv'">
            <div class="name ellipsis_2">{{item.name}}</div>
            <div v-if="item.artists.length">
              <span v-for="(singer_item, singer_index) in item.artists" :key="singer_index">
                <span v-if="singer_index != 0">/ </span> {{singer_item.name}}
              </span>
            </div>
          </div>
          <!--歌名+歌手+-->
          <div class="item_name" v-else-if="base_data.type == 'album'">

            <div class="name ellipsis_2">
              <span>{{item.name}}</span>
              <span v-if="item.alias && item.alias.length" v-for="(alias_item, alias_index) in item.alias" :key="alias_index">({{alias_item}})</span>
            </div>

            <div class="artists" v-if="item.artists">
              <span v-if="item.artists.name">{{item.artists.name}}</span>
              <span v-else-if="item.artists.length" v-for="(singer_item, singer_index) in item.artists" :key="singer_index">
                <span v-if="singer_index != 0">/ </span> {{singer_item.name}}
              </span>
            </div>

            <div v-if="item.publishTime">{{item.publishTime}}</div>
          </div>
          <div class="item_name" v-else>{{item.name}}</div>
        </div>
      </div>
      <div class="footer_box"></div>
    </div>
    <div class="pagination">
      <tool-page :pageData="base_data.page" @pageChange="pageChange"></tool-page>
    </div>
  </div>
</template>

<script>
  import { common_type} from "../../../page/main_content/common_data";


  export default {
    name: "baseSingList",
    data() {
      return {

      }
    },
    props: {
      listData: {
        type: Object,
        default: function () {
          return {}
        }
      },
      colsNum: {
        type: Number,
        default: 5
      }
    },
    computed: {
      base_data(){
        if(this.$typeOf(this.listData.data) === 'array'){
          this.listData.data.forEach(item=>{
            item.type = common_type[item.type]
          });
          return this.listData;
        }else{
          return this.listData;
        }
      }
    },
    components: {

    },
    created() {
    },
    mounted() {
    },
    methods: {
      itemClick(data){
        this.$emit('songlistClick',data)
      },
      pageChange(page){
        this.$emit('pageChange', page)
      },
      moreClick(data){
        if(data.title && data.title.path){
          this.$router.push({
            path: path
          })
        }
        this.$emit('moreClick', data)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/css/common.less";
.base_sing_list{
  width: 100%;
  .list_box{
    width: 100%;
    .header_box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 5px 0;
      padding-bottom: 8px;
      margin-bottom: 10px;
      border-bottom: 1px solid #e1e1e2;
      .title{
        font-size: 18px;
        font-weight: 400;
        color: #333333;
      }
      .other{
        font-size: 12px;
        color: #666666;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
    .body_box{
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      width: calc(100% + 20px);
      margin-left: -20px;

      .item{
        padding-left: 20px;
        margin-bottom: 40px;
        .coverall{
            position: absolute;
            top: 0;
            left: -5px;
            width: 100%;
            height: 100%;
            background: url("../../../../static/img/album_cover.png") no-repeat;
            background-size: auto 100%;
          }
        .item_img{
          position: relative;
          cursor: pointer;
          overflow: hidden;

          img{
            width: 100%;
            height: 100%;
          }

          .item_img_cover{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: #ffffff;
            box-shadow: 0 0 1px #e6e5e6 inset;
            overflow: hidden;
            .cover_top{
              width: 100%;
              color: #ffffff;
              background: linear-gradient(left, rgba(232,234,236,0.1), rgba(0,0,0,0.3));
              font-size: 12px;
              text-align: right !important;
              padding: 2px 5px;
              i{
                font-size: 12px;
                margin-right: 1px;
              }
              .icon-left_video{
                font-size: 14px;
              }
            }

            .top_drop_down{
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
              width: 100%;
              background: rgba(0,0,0,0.6);
              color: #ffffff;
              padding: 4px 8px;
              font-size: 12px;
              transform: translateY(-100%);
              transition: transform 0.3s ease 0.8s;
            }

            .cover_bottom{
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              font-size: 12px;
              color: #ffffff;
              padding: 8px 8px 5px 8px;
              background: linear-gradient(360deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2), rgba(255,0,0,0.02));
              .icon-tab_personal{
                font-size: 12px;
                font-weight: 100;
              }
              .icon-star{
                font-size: 12px;
                color: #ffbd20;
              }
              .icon-left_local_music1{
                color: #f0483b;
                font-size: 12px;
                font-weight: 600;
              }
              .icon-wan_vip{
                font-size: 12px;
                color: #f0483b;
              }
            }

            .play_circle_icon{
              opacity: 0;
              position: absolute;
              bottom: 5px;
              right: 5px;
              transition: opacity 0.2s;
            }
            .play_circle_icon_01{
              /*opacity: 0;*/
              position: absolute;
              top: 5px;
              left: 5px;
              /*transition: opacity 0.2s;*/
            }

            &:hover{
              .play_circle_icon{
                opacity: 1;
              }
              .top_drop_down{
                transform: translateY(0px);
              }
            }

          }

        }
        .item_name{
          cursor: pointer;
          font-size: 13px;
          margin-top: 5px;
          .ellipsis(2);
          color: #333333;
          .name{
            color: #333333;
            &>span:nth-of-type(2){
              color: #888888;
            }
          }
          div{
            color: #888888;
          }
          .artists{
            font-size: 12px;
          }
        }
      }

      /*.itemFirst{*/
        /*padding: 0!important;*/
        /*img{*/
          /*width: calc(100% - 20px)!important;*/
        /*}*/
      /*}*/
    }
    .footer_box{

    }
  }
}
</style>
