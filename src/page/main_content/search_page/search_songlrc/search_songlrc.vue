<template>
  <div class="search_songlrc">
    <base-table :data="search_songlrc_data.data"
                :config="search_songlrc_data.config"
                @dbclick="tableClick"
                @clickRow="clickRow"
                @pageChange="pageChange"
                stripe="stripe">
      <!--<template slot="creator" slot-scope="data">-->
      <!--</template>-->
    </base-table>
  </div>
</template>

<script>
  import searchPageMixin from '../search_page_mixin.vue'
  export default {
    name: "search_songlrc",
    data(){
      return {}
    },
    mixins: [searchPageMixin],
    computed: {

    },
    created(){
      this.search_type = '1006';
    },
    mounted(){

    },
    methods: {
      pageChange(page){

      },
      clickRow(data){

      },
      tableClick(data){

      }
    }
  }
</script>

<style lang="less" scoped>
.search_songlrc{

}
</style>
