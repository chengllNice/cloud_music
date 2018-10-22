<template>
  <div class="base_sing_list">
    <div class="list_box">
      <div class="header_box" v-if="!listData.title.noshow">
        <div class="title">{{listData.title.name}}</div>
        <div class="other" v-if="listData.title.more_btn">
          <span>{{listData.title.more_btn}}</span>
          <i class="iconfont icon-right"></i>
          <!--<slot name="header_right"></slot>-->
        </div>
      </div>
      <div class="body_box">
        <slot name="song_body" v-if="listData.slot && listData.slot == 'song_body'"></slot>
        <div class="item" v-else v-for="(item, index) in listData.data" :key="index"
             :style="{width: (100/colsNum)+'%'}"
            :class="{'itemFirst': index%colsNum == 0}">
          <div class="item_img">
            <img :src="item.imgUrl" :alt="item.name">
            <div class="item_img_cover" v-if="item.expand && !item.expand.nocover">
              <div class="cover_top" v-if="item.expand.cover_top">
                <i class="iconfont"
                   :class="{'icon-left_video': item.expand.cover_top == 'video',
                    'icon-headphone': item.expand.cover_top == 'song'}"></i>
                <span>{{item.value}}</span><span v-if="item.unit">{{item.unit}}</span>
              </div>

              <div class="top_drop_down" v-if="item.des && item.type != 'radio'">
                {{item.des}}
              </div>

              <div class="cover_bottom" v-if="item.type == 'radio'">
                {{item.name}}
              </div>

              <div class="play_circle_icon play_icon" v-if="item.type && item.type == 'song'">
                <i class="iconfont icon-music_play"></i>
              </div>
              <div class="play_circle_icon_01 play_icon" v-if="item.type && item.type == 'music_video_top'">
                <i class="iconfont icon-left_video"></i>
              </div>
            </div>
          </div>
          <div class="item_name" v-if="item.type == 'radio'">{{item.des}}</div>
          <div class="item_name" v-else>{{item.name}}</div>
        </div>
      </div>
      <div class="footer_box"></div>
    </div>
  </div>
</template>

<script>
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
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {

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
        /*width: 20%;*/
        padding-left: 20px;
        /*margin-top: 10px;*/
        margin-bottom: 40px;
        /*position: relative;*/
        .item_img{
          /*position: absolute;*/
          /*padding-bottom: 100%;*/
          /*width: 100%;*/
          /*height: 0;*/
          /*background-repeat: no-repeat;*/
          /*background-size: 100% 100%;*/
          position: relative;
          cursor: pointer;
          overflow: hidden;

          img{
            width: 100%;
            height: 100%;
          }
          .item_img_cover{
            /*display: none;*/
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: #ffffff;
            /*text-align: right;*/
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
              padding: 8px 5px 2px 5px;
              background: linear-gradient(360deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2), rgba(255,0,0,0.02));
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
