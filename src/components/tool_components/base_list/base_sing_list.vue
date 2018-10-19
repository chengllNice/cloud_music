<template>
  <div class="base_sing_list">
    <div class="list_box">
      <div class="header_box" v-if="!listData.title.noshow">
        <div class="title">{{listData.title.name}}</div>
        <div class="other" v-if="listData.title.more_btn">
          {{listData.title.more_btn}}
          <i class="iconfont icon-right"></i>
          <!--<slot name="header_right"></slot>-->
        </div>
      </div>
      <div class="body_box">
        <div class="item" v-for="(item, index) in listData.data" :key="index"
             :style="{width: (100/colsNum)+'%'}"
            :class="{'itemFirst': index%colsNum == 0}">
          <div class="item_img">
            <img :src="item.imgUrl" :alt="item.name">
            <div class="item_img_cover" v-if="item.expand && !item.expand.nocover">
              <div class="cover_top">
                <i class="iconfont icon-headphone"></i>
                <span>{{item.value}}</span><span v-if="item.unit">{{item.unit}}</span>
              </div>
              <div class="top_drop_down" v-if="item.expand && item.expand.reason">
                {{item.expand.reason}}
              </div>
              <div class="play_circle_icon play_icon">
                <i class="iconfont icon-music_play"></i>
              </div>
            </div>
          </div>
          <div class="item_des">{{item.name}}</div>
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
.base_sing_list{
  width: 100%;
  .list_box{
    width: 100%;
    .header_box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .title{
        font-size: 18px;
        font-weight: 200;
        color: #333333;
      }
      .other{
        font-size: 12px;
        color: #444444;
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
        margin-top: 10px;
        margin-bottom: 30px;
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
            .top_drop_down{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              background: rgba(0,0,0,0.6);
              color: #ffffff;
              padding: 4px 8px;
              font-size: 12px;
              transform: translateY(-100%);
              transition: transform 0.3s;
            }
            .cover_top{
              width: 100%;
              color: #ffffff;
              background: linear-gradient(left, rgba(232,234,236,0.1), rgba(0,0,0,0.3));
              font-size: 12px;
              text-align: right !important;
              padding: 0 5px;
              i{
                font-size: 12px;
                margin-right: 1px;
              }
            }
            .play_circle_icon{
              opacity: 0;
              position: absolute;
              bottom: 5px;
              right: 5px;
              transition: opacity 0.2s;
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
        .item_des{
          cursor: pointer;
          font-size: 13px;
          margin-top: 5px;
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
