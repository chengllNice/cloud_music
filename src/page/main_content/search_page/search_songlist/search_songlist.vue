<template>
  <div class="search_songlist">
    <base-table :data="search_songlist_data.data"
                :config="search_songlist_data.config"
                @dbclick="tableClick"
                @clickRow="clickRow"
                @pageChange="pageChange"
                stripe="stripe">
      <template slot="name_content" slot-scope="data">
        <div class="singer_box">
          <div class="singer_img">
            <img :src="data.data.picUrl+'param=512y512'" alt="">
          </div>
          <div class="singer_info">
            <span class="name ellipsis_1">{{data.data.name}}</span>
          </div>
        </div>
      </template>
      <template slot="trackCount" slot-scope="data">
        <div class="trackCount">{{data.data.trackCount}}首</div>
      </template>
      <template slot="creator" slot-scope="data">
        <div class="creator ellipsis_1">by {{data.data.creator.nickname}}</div>
      </template>
    </base-table>
  </div>
</template>

<script>
  import searchPageMixin from '../search_page_mixin.vue'

  export default {
    name: "search_songlist",
    data(){
      return {}
    },
    mixins: [searchPageMixin],
    computed: {

    },
    created(){
      this.search_type = '1000';
    },
    mounted(){

    },
    methods: {
      pageChange(page){
        this.search_songlist_data.data.t_body = [];
        this.pageData.page = this.search_songlist_data.data.t_page.page = page;
        this.get_search();
      },
      tableClick(data){

      },
      clickRow(data){
        this.$router.push({
          path: '/songlist_detail_common',
          query: { id: data.data.id}
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.search_songlist{
  padding-bottom: 20px;
  .singer_box{
    display: flex;
    align-items: center;
    padding: 10px 30px;
    *{
      cursor: pointer;
    }
    .singer_img{
      width: 40px;
      height: 40px;
      margin-right: 10px;
      img{
        width: 100%;
      }
    }
    .singer_info{
      display: flex;
      align-items: center;
      .name{

      }
    }
  }
  .creator,.singer_box{
    &:hover{
      color: #333333;
    }
  }
}
</style>
<style lang="less">
  .search_songlist{
    td{
      cursor: pointer;
    }
  }
</style>
