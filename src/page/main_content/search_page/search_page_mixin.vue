<template>
  <div class="search_page_mixin">

  </div>
</template>

<script>
  import {
    search_song_data,
    search_singer_data,
    search_album_data,
    search_video_data,
    search_songlist_data,
    search_songlrc_data,
    search_dj_data,
    search_user_data} from "./search_page_data";
  import { get_search, get_search_multimatch} from "../../../server/search_api";


  export default {
    name: "search_page_mixin",
    data() {
      return {
        search_type: '1',
        search_word: '',
        search_song_data: {},
        search_singer_data: {},
        search_album_data: {},
        search_video_data: {},
        search_songlist_data: {},
        search_songlrc_data: {},
        search_dj_data: {},
        search_user_data: {},
        pageData: {
          page: 1,
          pageSize: 20,
          total: 0
        }
      }
    },
    computed: {},
    components: {},
    created() {
      this.search_word = this.$route.query.value || '';
    },
    mounted() {
      this.init();
    },
    methods: {
      async init(){
        await this.pageDataInit(this.search_type);
        this.get_search();
        // this.get_search_suggest();
      },
      async pageDataInit(type){
        switch (type) {
          case '1':
            this.search_song_data = this.$deepClone(search_song_data);
            this.pageData = this.search_song_data.data.t_page;
            break;
          case '10':
            this.search_album_data = this.$deepClone(search_album_data);
            this.pageData = this.search_album_data.data.t_page;
            break;
          case '100':
            this.search_singer_data = this.$deepClone(search_singer_data);
            this.pageData = this.search_singer_data.data.t_page;
            break;
          case '1000':
            this.search_songlist_data = this.$deepClone(search_songlist_data);
            this.pageData = this.search_songlist_data.data.t_page;
            break;
          case '1002':
            this.search_user_data = this.$deepClone(search_user_data);
            this.pageData = this.search_user_data.data.t_page;
            break;
          case '1004':
            break;
          case '1006':
            this.search_songlrc_data = search_songlrc_data;
            this.pageData = this.search_songlrc_data.data.t_page;
            break;
          case '1009':
            this.search_dj_data = this.$deepClone(search_dj_data);
            this.pageData = this.search_dj_data.page;
            break;
          case '1014':
            this.search_video_data = this.$deepClone(search_video_data);
            this.pageData = this.search_video_data.page;
            break;
        }
      },
      get_search() {
        let get_data = {
          keywords: this.search_word,
          limit: this.pageData.pageSize,
          offset: (this.pageData.page-1)*this.pageData.pageSize,
          type: this.search_type,//1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
        };
        get_search(get_data).then(res => {
          this.searchResultInit(res);
        }).catch(err => {
          console.log('err', err)
        })
      },
      searchResultInit(data){
        if(this.search_type == '1'){
          let list = data.result.songs;
          let songIds = [];
          list.forEach(item=>{
            songIds.push(item.id);
          });
          this.get_song_detail(songIds);
          this.pageData.total = this.search_song_data.data.t_page.total = data.result.songCount;
        }else if(this.search_type == '100'){
          let list = data.result.artists;
          this.songListInit(list,this.search_singer_data.data);
          this.pageData.total = this.search_singer_data.data.t_page.total = data.result.artistCount;
        }else if(this.search_type == '10'){
          let list = data.result.albums;
          this.songListInit(list,this.search_album_data.data);
          this.pageData.total = this.search_album_data.data.t_page.total = data.result.albumCount;
        }else if(this.search_type == '1014'){
          let list = data.result.videos;
          let format_data = this.$uiconfigFormat(list,this.search_video_data.uiconfig);
          format_data.forEach(item=>{
            item.width = '338';
            item.height = '189';
            item.artists.forEach(artists=>{
              artists.id = artists.userId;
              artists.name = 'by ' + artists.userName;
            });
            item.duration = this.$timeFormat(item.duration);
          });
          this.$unitFormat(format_data, 'playCount');
          this.search_video_data.data = format_data;
          this.pageData.total = this.search_video_data.page.total = data.result.videoCount;
        }else if(this.search_type == '1000'){
          let list = data.result.playlists;
          this.songListInit(list,this.search_songlist_data.data);
          this.pageData.total = this.search_songlist_data.data.t_page.total = data.result.playlistCount;
        }else if(this.search_type == '1006'){
          let list = data.result.songs;
          this.songListInit(list,this.search_songlrc_data.data);
          this.pageData.total = this.search_songlrc_data.data.t_page.total = data.result.songCount;
        }else if(this.search_type == '1009'){
          let list = data.result.djRadios;
          let format_data = this.$uiconfigFormat(list,this.search_dj_data.uiconfig);
          format_data.forEach(item=>{
            item.width = '512';
            item.height = '512';
            item.artists = { name: item.artists};
          });
          // this.$unitFormat(format_data, 'playCount');
          this.search_dj_data.data = format_data;
          this.pageData.total = this.search_dj_data.page.total = data.result.djRadiosCount;
        }else if(this.search_type == '1002'){
          let list = data.result.userprofiles;
          this.songListInit(list,this.search_user_data.data);
          this.pageData.total = this.search_user_data.data.t_page.total = data.result.userprofileCount;
        }
      },
      get_song_detail(songIds){
        let get_data = {
          ids: songIds.join(',')
        };
        this.$commonApi.getSongDetail(get_data).then(res=>{
          let songList = res.songs;
          let privileges = res.privileges;
          songList.forEach((item, index)=>{
            item.privilege = privileges[index]
          });
          this.songListInit(songList,this.search_song_data.data)
        }).catch(err=>{
          console.log('err',err)
        })
      },
      songListInit(data, table_data){
        this.$tableListInit(data,table_data);
      },
      get_search_suggest(){
        let get_data = {
          keywords: '毛不易',
          limit: 100,
          offset: 0,
          type: this.search_type,//1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
        };
        get_search_multimatch(get_data).then(res => {

        }).catch(err => {
          console.log('err', err)
        })
      }
    },
    watch: {
      '$route.query.value': function (new_val, old_val) {
        if(new_val){
          this.search_word = new_val;
          this.init();
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
