<template>
  <div class="songlist_detail">
    <div class="songlist_info_box">
      <div class="songlist_cover">
        <img :src="songData.coverImgUrl" alt="">
      </div>
      <div class="songlist_info">
        <div class="songlist_title">
          <div class="title_left">
            <div class="title_tip">歌单</div>
            <div class="title_box">
              <span class="title">{{songData.name}}</span>
              <base-tool-button type="icon" class="title_edit" iconClass="icon-edit" borderWidth='0' fontSize="19px" fontColor="#a1a1a1" height="21px"></base-tool-button>
            </div>
          </div>

          <div class="play_count_box">
            <div class="songlist_count">
              <div>歌曲数</div>
              <div>30</div>
            </div>
            <div class="line"></div>
            <div class="play_count">
              <div>播放数</div>
              <div>20</div>
            </div>
          </div>
        </div>
        <div class="songlist_creater_info">
          <div class="creater_img">
            <img :src="songData.creator.avatarUrl" alt="">
          </div>
          <span class="creater_name">{{songData.creator.nickname}}</span>
          <span class="creater_time">{{songData.createTime}}创建</span>
        </div>
        <div class="songlist_opear">
          <div class="play_all">
            <div class="left">
              <i class="iconfont icon-music_play1"></i>
              <span>播放全部</span>
            </div>
            <div class="right">
              <i class="iconfont icon-add1"></i>
            </div>
          </div>
          <div class="collection">
            <i class="iconfont icon-add_file"></i>
            <span>收藏</span>
          </div>
          <div class="shape">
            <i class="iconfont icon-shape"></i>
            <span>分享</span>
          </div>
          <div class="download">
            <i class="iconfont icon-download"></i>
            <span>下载全部</span>
          </div>
        </div>
        <div class="songlist_label">
          <div class="label">标签：</div>
          <div class="name">
            <div v-for="(item, index) in songData.tags" :key="index"> <span v-if="index != 0">/</span>{{item}}</div>
          </div>
        </div>
        <div class="songlist_des">
          <span class="label">
            简介：
            <span class="name">{{songData.description}}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="songlist_bottom">
      <div class="table_tab">
        <header-tab class="home_header_tab" tab-type="iview_tab_song" :data="header_tab_data"></header-tab>
      </div>
      <div class="table_box">
        <base-table @dbclick="tableClick" :data="songData.table_data">
          <template slot="song_name" slot-scope="data">
            <div class="song_name ellipsis_1">
              <div class="ellipsis_1">{{data.data.song_name}}</div>
              <span class="ellipsis_1" v-if="data.data.alia && data.data.alia.length" v-for="(item, index) in data.data.alia">({{item}})</span>
            </div>
          </template>
          <template slot="artists" slot-scope="data">
            <div class="artists_name ellipsis_1">
              <span v-for="(item, index) in data.data.artists" :key="index">{{item.name}}</span>
            </div>
          </template>
          <template slot="album" slot-scope="data">
            <div class="album_name ellipsis_1">
              {{data.data.album_name.name}}
            </div>
          </template>
        </base-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "songlistDetail",
    props: {
      data: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data(){
      return {
        header_tab_data: [
          {
            name: '歌曲列表',
            value: ''
          },
          {
            name: '评论',
            value: '221'
          },
          {
            name: '收藏者',
            value: ''
          }
        ]
      }
    },
    computed: {
      songData(){
        // let result = this.data;
        let result = this.$deepClone(this.data);
        let time = this.$timeFormat(new Date(result.createTime), 'date');
        this.$setObjectValue(result, 'createTime', time);
        return result;
      }
    },
    created(){

    },
    mounted(){

    },
    methods: {
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
    }
  }
</script>

<style lang="less" scoped>
.songlist_detail{
  position: absolute;
  top: 0;
  left: 0;
  background: #fafafa;
  padding-top: 20px;
  padding-bottom: 50px;
  .songlist_info_box{
    display: flex;
    padding: 0 30px;
    .songlist_cover{
      width: 198px;
      height: 198px;
      margin-right: 30px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .songlist_info{
      flex: 1;
      .songlist_title{
        display: flex;
        align-items: start;
        justify-content: space-between;
        .title_left{
          flex: 1;
          display: flex;
          align-items: start;
          .title_tip{
            color: #e03f40;
            border: 1px solid #e03f40;
            flex: none;
            padding: 0 5px;
            border-radius: 2px;
            font-size: 12px;
          }
        }
        .title_box{
          display: flex;
          align-items: start;
          .title{
            font-size: 22px;
            color: #333333;
            margin-left: 5px;
            margin-right: 5px;
            margin-top: -5px;
          }
        }
        .play_count_box{
          width: 105px;
          padding-left: 10px;
          display: flex;
          align-items: center;
          color: #999999;
          font-size: 12px;
          text-align: right;
          .songlist_count{

          }
          .line{
            width: 0px;
            height: 32px;
            border-left: 1px solid #e1e1e2;
            margin: 0 10px;
          }
          .play_count{

          }
        }
      }
      .songlist_creater_info{
        display: flex;
        align-items: center;
        margin-top: 5px;
        .creater_img{
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .creater_name{
          margin-left: 10px;
          margin-right: 25px;
          color: #666666;
          font-size: 16px;
        }
        .creater_time{
          color: #9688a4;
          font-size: 12px;
        }
      }
      .songlist_opear{
        display: flex;
        align-items: center;
        margin: 15px 0 20px 0;
        .play_all{
          border: 1px solid #e5a7a7;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 122px;
          height: 26px;
          color: #cd2929;
          font-size: 12px;
          background: #ffffff;
          i{
            color: #cd2929;
            cursor: pointer;
          }
          .left{
            height: 100%;
            /*padding-left: 5px;*/
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
            cursor: pointer;
            &:hover{
              background: #f5f5f7;
            }
            span{
              cursor: pointer;
            }
            .icon-music_play1{
              font-size: 20px;
              margin-right: 5px;
            }
          }
          .right{
            width: 32px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            border-left: 1px solid #f4e4e4;
            cursor: pointer;
            &:hover{
              background: #f5f5f7;
            }
            .icon-add1{
              font-size: 12px;
              transform: scale(0.9);
            }
          }
        }
        .collection{
          border: 1px solid #e1e1e2;
          color: #333333;
          padding: 0 10px;
          height: 26px;
          border-radius: 2px;
          margin-left: 10px;
          display: flex;
          align-items: center;
          background: #ffffff;
          font-size: 12px;
          cursor: pointer;
          &:hover{
            background: #f5f5f7;
          }
          span{
            cursor: pointer;
          }
          i{
            font-size: 18px;
            margin-right: 5px;
            color: #666666;
            cursor: pointer;
          }
        }
        .shape{
          border: 1px solid #e1e1e2;
          color: #333333;
          padding: 0 10px;
          height: 26px;
          border-radius: 2px;
          margin-left: 10px;
          display: flex;
          align-items: center;
          background: #ffffff;
          font-size: 12px;
          cursor: pointer;
          &:hover{
            background: #f5f5f7;
          }
          span{
            cursor: pointer;
          }
          i{
            font-size: 14px;
            font-weight: 100;
            margin-right: 5px;
            color: #666666;
            cursor: pointer;
          }
        }
        .download{
          border: 1px solid #e1e1e2;
          color: #333333;
          padding: 0 10px;
          height: 26px;
          border-radius: 2px;
          margin-left: 10px;
          display: flex;
          align-items: center;
          background: #ffffff;
          font-size: 12px;
          cursor: pointer;
          &:hover{
            background: #f5f5f7;
          }
          span{
            cursor: pointer;
          }
          i{
            font-size: 18px;
            margin-right: 5px;
            color: #666666;
            cursor: pointer;
          }
        }
      }
      .songlist_label{
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 22px;
        .label{

        }
        .name{
          display: flex;
          align-items: center;
          div{
            color: #0c73c2;
            cursor: pointer;
          }
          span{
            color: #6a6aaf;
            margin: 0 2px;
          }
        }
      }
      .songlist_des{
        font-size: 12px;
        line-height: 22px;
      }
    }
  }

  .table_tab{
    border-bottom: 1px solid #c62f2f;
    padding-left: 35px;
  }
  .table_box{
    .song_name{
      display: flex;
      align-items: center;
      div{
        flex: none;
      }
      span{
        color: #888888;
      }
    }
  }
}
</style>
<style lang="less">
  .songlist_detail{
    .songlist_title{
      .button_wrap{
        border-radius: 2px!important;
        .text{
          padding-top: 4px;
          padding-left: 6px;
          padding-right: 6px;
        }
      }

      .title_edit{
        i{
          cursor: pointer!important;
        }
      }
    }
  }

</style>
