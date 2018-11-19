<template>
  <div class="search_page">
    <div class="search_result_total">
      搜索{{search_value}}，找到
      <span>{{search_count}}</span>
      <span></span>
    </div>
    <div class="search_result_content">
      <header-tab :data="search_tab_data" @tabClick="tabClick"></header-tab>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { search_tab_data} from "./search_page_data";
  import { get_search} from "../../../server/search_api";

  export default {
    name: "search_page",
    data(){
      return {
        search_value: this.$route.query.value || '',
        search_count: 0,
        search_tab_data: []
      }
    },
    computed: {

    },
    created(){
      this.search_tab_data = this.$deepClone(search_tab_data)
    },
    mounted(){

    },
    methods: {

      tabClick(){

      }
    }
  }
</script>

<style lang="less" scoped>

</style>
