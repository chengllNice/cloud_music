<template>
  <div class="home_recommend">
    <banner :list-data="banner_data"></banner>
    <base-sing-list :list-data="recommend_data" :cols-num="5"></base-sing-list>
  </div>
</template>

<script>
  import banner from '../../../components/banner/banner';
  import { banner_data, recommend_list_data} from "./recommend_data";

  export default {
    name: "home_recommend",
    data() {
      return {
        banner_data: [],
        recommend_data: []
      }
    },
    computed: {},
    components: {
      banner
    },
    created() {
      this.banner_data = this.$deepClone(banner_data);
      this.recommend_data = this.$deepClone(recommend_list_data);
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.get_data();
      },
      get_data(){
        this.recommend_data.data.forEach(item=>{
          if(item.value.length > 5){
            item.value = Math.floor(item.value/10000);
            item.unit = '万'
          }else{
            item.unit = ''
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
