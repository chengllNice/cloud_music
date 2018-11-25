<template>
  <div class="search_video">
    <base-sing-list class="home_list" :list-data="search_video_data"
                    :cols-num="search_video_data.colsNum" @songlistClick="songlistClickHandler" @pageChange="pageChange">
    </base-sing-list>
  </div>
</template>

<script>
  import searchPageMixin from '../search_page_mixin.vue'
  export default {
    name: "search_video",
    data(){
      return {

      }
    },
    mixins: [searchPageMixin],
    created(){
      this.search_type = '1014';
    },
    mounted(){

    },
    methods: {
      pageChange(page){
        this.search_video_data.data = [];
        this.pageData.page = this.search_video_data.page.page = page;
        this.get_search();
      },
      songlistClickHandler(data){
        this.$router.push({
          path: '/play_mv',
          query: { id: data.id, type: data.video_type}
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.search_video{
  padding: 20px 30px;
}
</style>
