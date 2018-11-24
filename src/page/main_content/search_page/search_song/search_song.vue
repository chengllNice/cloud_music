<template>
  <div class="search_song">

    <base-table :data="search_song_data.data"
                :config="search_song_data.config"
                @dbclick="tableClick"
                @pageChange="pageChange"
                stripe="stripe">
      <template slot="song_name" slot-scope="data">
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
            <span class="song_name" v-if="data.data.song_name">
              <span class="ellipsis_1">{{data.data.song_name}}</span></span>
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
      <template slot="pop" slot-scope="data">
        <div class="pop_box">
          <Progress :percent="data.data.pop" :stroke-width="6" hide-info />
        </div>
      </template>
    </base-table>
  </div>
</template>

<script>
  import searchPageMixin from '../search_page_mixin.vue'

  export default {
    name: "search_song",
    data(){
      return {

      }
    },
    mixins: [searchPageMixin],
    computed: {

    },
    created(){
      this.search_type = '1';
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
              picUrl: data.data.album_name.picUrl,
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
      },
      pageChange(page){
        this.search_song_data.data.t_body = [];
        this.pageData.page = this.search_song_data.data.t_page.page = page;
        this.get_search();
      }
    }
  }
</script>

<style lang="less" scoped>
.search_song{
  padding-bottom: 20px;
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
        max-width: 100%;
        flex: none;
        display: flex;
        span{
          flex: 1;
        }
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
  .pop_box{
    width: 100px;
  }
}
</style>
<style lang="less">
  .search_song{
    .ivu-progress-inner{
      background: #e0e0e0;
    }
    .ivu-progress-bg{
      background: #c5c5c6!important;
    }
  }

</style>
