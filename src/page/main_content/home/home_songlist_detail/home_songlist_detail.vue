<template>
  <div class="home_songlist_detail">
    <songlist-detail></songlist-detail>
  </div>
</template>

<script>
  import { songlist_data} from "./home_songlist_data";

  export default {
    name: "home_songlist_detail",
    props: {

    },
    data(){
      return {
        songlist_id: '',
        song_ids: '',
        songlist: {}
      }
    },
    computed: {

    },
    created(){
      this.songlist_id = this.$route.query.id;
      this.songlist = this.$deepClone(songlist_data);
    },
    mounted(){
      this.init();
    },
    methods: {
      async init(){
        this.get_songlist_detail_data();
      },
      async get_songlist_detail_data(){
        let get_data = {
          id: this.songlist_id
        };
        this.$commonApi.getSonglistDetail(get_data).then(res=>{
          // let format_data = this.$uiconfigFormat(res.result,this.songlist.uiconfig);
          this.songlist_format(res.playlist);
        }).catch(err=>{
          console.log('err', err);
        })
      },
      songlist_format(data){
        Object.keys(this.songlist.uiconfig).forEach(key=>{
          let text = this.$getObjectValue(data, key);
          this.songlist.data[key] = text;
        });
        // let format_data = this.$uiconfigFormat(this.songlist.data.tracks,this.songlist.uiconfig);
        this.$tableListInit(this.songlist.data.tracks, this.songlist.data.table_data);

        console.log(this.songlist)

      }
    }
  }
</script>

<style lang="less" scoped>

</style>
