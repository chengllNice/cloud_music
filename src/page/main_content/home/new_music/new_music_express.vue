<template>
  <div class="new_music_express">

    <header-tab class="bottom_tab"
                @tabClick="threeTabClick"
                :data="header_tab_data"
                type="left"
                tab-type="three_tab"></header-tab>

    <base-table :data="table_data.data"
                :config="table_data.config"
                @dbclick="tableClick"
                stripe="stripe">
      <template slot="header" slot-scope="data">
        <div class="table_header">
          <div class="play_all">
            <base-tool-button type="icon"
                              icon-class="icon-music_play1"
                              border-width="0"
                              font-color="#cd2929"
                              font-size="24px"></base-tool-button>
            <span>播放全部</span>
          </div>
          <base-tool-button type="beforeicon"
                            icon-class="icon-add_file"
                            border-color="#e1e1e2"
                            font-color="#333333"
                            padding="3px 8px"
                            background-color="#ffffff"
                            class="collection_all"
                            font-size="12px">收藏全部</base-tool-button>
        </div>
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
            <!--<span v-if="data.data.singer">{{data.data.singer}}</span>-->
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
      </template>
    </base-table>
  </div>
</template>

<script>
  import {
    express_header_tab_data,
    new_music_data} from "./new_music_data";
  import { get_top_song} from "../../../../server/home";

  export default {
    name: "new_music_express",
    data() {
      return {
        table_data: {},
        header_tab_data: [],
      }
    },
    computed: {},
    components: {},
    created() {
      this.header_tab_data = this.$deepClone(express_header_tab_data);
    },
    mounted() {
      this.init()
    },
    methods: {
      init(){
        this.get_top_song_list();
      },
      get_top_song_list(id){
        let get_data = {
          type: id ? id : '0'
        };
        // this.table_data = null;
        let table_data = this.$deepClone(new_music_data);
        this.table_data = this.$deepClone(new_music_data);
        get_top_song(get_data).then(res=>{
          this.$tableListInit(res.data,table_data.data);
          this.table_data = table_data;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      threeTabClick(data){
        this.get_top_song_list(data.id);
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
      playStatusChange(data){

      }
    }
  }
</script>

<style lang="less" scoped>
.new_music_express{
  .bottom_tab{
    height: 28px;
  }

  .new_song_content{
    display: flex;
    align-items: center;
    padding: 10px 0;
    .left_img{
      position: relative;
      width: 40px;
      height: 40px;
      img{
        width: 100%;
        height: 100%;
      }
      .img_cover{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    .right_info{
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: center;
      margin-left: 10px;
      color: #333333;
      .song_name{
        flex: none;
      }
      .tool_button{
        flex: none;
      }
      &>*{
        margin-right: 5px;
      }
      .alias{
        color: #888888;
        display: flex;
        span{
          flex: 1;
        }
      }
    }
  }

  .table_header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: #fafafa;
  }

  .play_all{
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #333333;
    &>span{
      margin-left: 8px;
    }
  }

  .album_name{
    display: flex;
    align-items: center;
    span:nth-of-type(1){
      flex: none;
    }
    span:nth-of-type(2){
      color: #888888;
      margin-left: 5px;
    }
  }
}
</style>
<style lang="less">
  .new_music_express{
    .ivu-table-wrapper{
      /*margin-right: -1px;*/
      border: 1px solid rgba(237,237,237,1);
    }

    .sub_header_nav{
      margin-bottom: 10px;
      .list{

      }
    }

    .ivu-table-title{
      height: 35px;
      line-height: 35px;
      border-bottom: none;
    }

    .collection_all{
      .button_wrap{
        border-radius: 3px;
        cursor: pointer;
        &:hover{
          background: #f5f5f7!important;
        }
      }
      i{
        font-size: 18px!important;
        margin-right: 5px;
      }
    }
  }
</style>
