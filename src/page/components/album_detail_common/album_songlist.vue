<template>
  <div class="album_songlist">
    <base-table @dbclick="tableClick" :data="data.data" :config="data.config">
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
      <template slot="pop" slot-scope="data">
        <div class="pop_box">
          <Progress :percent="data.data.pop" :stroke-width="6" hide-info />
        </div>
      </template>
    </base-table>
  </div>
</template>

<script>
  export default {
    name: "album_songlist",
    props: {
      data: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
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
.album_songlist{
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
  .pop_box{
    width: 100px;
  }
}
</style>
<style lang="less">
  .album_songlist{
    .ivu-progress-inner{
      background: #e0e0e0;
    }
    .ivu-progress-bg{
      background: #c5c5c6!important;
    }
  }

</style>
