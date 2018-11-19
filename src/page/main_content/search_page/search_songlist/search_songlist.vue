<template>

</template>

<script>
  import { get_search} from "../../../../server/search_api";

  export default {
    name: "search_songlist",
    data(){
      return {}
    },
    computed: {

    },
    created(){

    },
    mounted(){

    },
    methods: {
      get_search() {
        let get_data = {
          keywords: '',
          limit: '',
          offset: '',
          type: '1',//1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
        };
        get_search(get_data).then(res => {

        }).catch(err => {
          console.log('err', err)
        })
      },
    }
  }
</script>

<style scoped>

</style>
