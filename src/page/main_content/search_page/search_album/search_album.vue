<template>
  <div class="search_album">
    <base-table :data="search_album_data.data"
                :config="search_album_data.config"
                @dbclick="tableClick"
                @pageChange="pageChange"
                stripe="stripe">
      <template slot="picUrl_content" slot-scope="data">
        <div class="album_picUrl">
          <img :src="data.data.picUrl+'?param=180y180'" alt="">
        </div>
      </template>
      <template slot="name_content" slot-scope="data">
        <div class="album_name ellipsis_1">
          <span class="ellipsis_1">{{data.data.name}}</span>
          <span class="alias_name ellipsis_1" v-for="(item, index) in data.data.alias" :key="index">({{item}})</span>
        </div>
      </template>
      <template slot="artist" slot-scope="data">
        <div class="artist ellipsis_1">
          <span>{{data.data.artist.name}}</span>
          <span class="alia" v-if="data.data.artist.alia && data.data.artist.alia.length">({{data.data.artist.alia[0]}})</span>
        </div>
      </template>
    </base-table>
  </div>
</template>

<script>
  import searchPageMixin from '../search_page_mixin.vue'

  export default {
    name: "search_album",
    data() {
      return {}
    },
    mixins: [searchPageMixin],
    computed: {},
    created() {
      this.search_type = '10';
    },
    mounted() {

    },
    methods: {
      tableClick(data){

      },
      pageChange(page){
        this.search_album_data.data.t_body = [];
        this.pageData.page = this.search_album_data.data.t_page.page = page;
        this.get_search();
      }
    }
  }
</script>

<style lang="less" scoped>
.search_album{
  .album_picUrl{
    height: 40px;
    /*width: 48px;*/
    margin: 10px 0;
    margin-left: 25px;
    background: url("../../../../../static/img/album_cover.png") no-repeat;
    background-size: auto 100%;
    background-position: 1px center;
    img{
      /*width: 100%;*/
      height: 100%;
    }
  }
  .album_name{
    display: flex;
    align-items: center;
    .alias_name{
      color: #888;
    }
  }
  .artist{
    .alia{
      color: #888;
    }
  }
}
</style>
