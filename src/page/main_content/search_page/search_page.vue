<template>
  <div class="search_page">
    <div class="search_result_total">
      搜索{{search_word}}，找到
      <span>{{pageData.total}}</span>
      <span>{{unit}}</span>
    </div>
    <div class="search_result_content">
      <header-tab :data="search_tab_data" @tabClick="tabClick"></header-tab>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { search_tab_data} from "./search_page_data";
  import searchPageMixin from './search_page_mixin.vue'

  export default {
    name: "search_page",
    data(){
      return {
        search_tab_data: [],
        unit: ''
      }
    },
    mixins: [searchPageMixin],
    computed: {

    },
    created(){
      this.search_tab_data = this.$deepClone(search_tab_data)
    },
    mounted(){
      // this.init();
      this.routerInit();
    },
    methods: {
      routerInit(){
        let path = this.$route.path;
        this.search_tab_data.forEach(item=>{
          if(item.path == path){
            this.search_type = item.id;
            this.unit = item.unit;
            this.init();
          }
        });
      },
      tabClick(data){
        this.search_type = data.id;
        this.unit = data.unit;
        this.init();
      }
    },
    watch: {

    }
  }
</script>

<style lang="less" scoped>

</style>
