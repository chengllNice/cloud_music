<template>
  <div class="search_songlrc">
    <base-table :data="search_songlrc_data.data"
                :config="search_songlrc_data.config"
                @dbclick="tableClick"
                @clickRow="clickRow"
                @pageChange="pageChange"
                stripe="stripe">
      <template slot="song_name" slot-scope="data">
        <div class="new_song_content">
          <div class="right_info">
            <span class="song_name" v-if="data.data.song_name">
              <span class="ellipsis_1">{{data.data.song_name}}</span></span>
            <div class="alias" v-if="data.data.alias.length">
              <span class="ellipsis_1" v-for="(alias_item, alias_index) in data.data.alias" :key="alias_index">({{alias_item}})</span>
            </div>
            <base-tool-button v-if="data.data.mvid" type="icon" cl-type="play_video_icon_button" icon-class="icon-music_play"></base-tool-button>
            <base-tool-button v-if="data.data.maxbr && data.data.maxbr == '999000'" type="" cl-type="sq_button">SQ</base-tool-button>
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
  import {mapState} from 'vuex'
  export default {
    name: "search_songlrc",
    data(){
      return {}
    },
    mixins: [searchPageMixin],
    computed: {
      ...mapState(['music_info','play_music_list','history_music_list']),
    },
    created(){
      this.search_type = '1006';
    },
    mounted(){

    },
    methods: {
      pageChange(page){
        this.search_songlrc_data.data.t_body = [];
        this.pageData.page = this.search_songlrc_data.data.t_page.page = page;
        this.get_search();
      },
      clickRow(data){

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
              picUrl: data.data.album_name.picUrl,
              song_name: data.data.song_name,
              artists: data.data.artists,
              album: data.data.album_name,
              alias: data.data.alias,
              source_path: data.data.source_path,
              data: data.data
            };
            this.$store.commit('get_music_info',info);
          }
        }).catch(err=>{
          console.log('err',err)
        });
      },
      // 播放状态改变
      playStatusChange(data, type){
        let _index = data.data?data.index:-1;
        let _id = data.data?data.data.id:data.id;
        let _data = data.data?data.data:data;
        this.search_songlrc_data.data.t_body.forEach((item,index)=>{
          if(item.id == _id){
            _index = index;
          }
          if(item.playStatus){
            item.playStatus = '';
          }
        });
        _data.playStatus = type;
        this.search_songlrc_data.data.t_body.splice(_index,1,_data);

        let play_index = -1;
        if(this.play_music_list.data.length){
          this.play_music_list.data.forEach((item, index)=>{
            if(item.playStatus){
              item.playStatus = '';
              play_index = index;
            }
            if(item.id == _id){
              item.playStatus = type;
            }else if(index == this.play_music_list.data.length-1){
              this.$store.state.play_music_list.data.splice(play_index+1,0,_data)
            }
          });
        }else{
          this.$store.state.play_music_list.data.push(_data)
        }

      },
    },
    watch: {
      'music_info.playStatus': function (new_val, old_val) {
        this.playStatusChange(this.music_info.data, new_val);
      },
      'music_info.id': function (new_val, old_val) {
        this.playStatusChange(this.music_info.data, 'play');
      }
    }
  }
</script>

<style lang="less" scoped>
.search_songlrc{
  padding-bottom: 20px;
  .new_song_content{
    .right_info{
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: center;
      color: #333333;
      .song_name{
        max-width: 100%;
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
  .search_songlrc{
    .ivu-progress-inner{
      background: #e0e0e0;
    }
    .ivu-progress-bg{
      background: #c5c5c6!important;
    }
  }

</style>
