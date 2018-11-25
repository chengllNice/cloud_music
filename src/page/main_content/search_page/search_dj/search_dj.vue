<template>
  <div class="search_dj">
    <div class="dj_title">主播电台</div>

    <base-sing-list class="dj_list" :list-data="search_dj_data"
                    :cols-num="search_dj_data.colsNum" @songlistClick="songlistClickHandler" @pageChange="pageChange">
    </base-sing-list>
  </div>
</template>

<script>
  import searchPageMixin from '../search_page_mixin.vue'

  export default {
    name: "search_dj",
    data() {
      return {}
    },
    mixins: [searchPageMixin],
    computed: {},
    created() {
      this.search_type = '1009';
    },
    mounted() {

    },
    methods: {
      pageChange(page){
        this.search_dj_data.data = [];
        this.pageData.page = this.search_dj_data.page.page = page;
        this.get_search();
      },
      songlistClickHandler(){

      }
    }
  }
</script>

<style lang="less" scoped>
.search_dj{
  .dj_title{
    border-bottom: 1px solid #e1e1e2;
    font-size: 12px;
    color: #666;
    height: 35px;
    line-height: 35px;
    margin-bottom: 10px;
    padding-left: 30px;
  }
  .dj_list{
    padding: 0 30px;
  }
}
</style>
