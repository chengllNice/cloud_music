<template>
  <div class="home">
    <!--<sub-header-nav :data="home_header_nav_data"></sub-header-nav>-->
    <header-tab class="home_header_tab" :data="header_tab_data"></header-tab>
    <div class="home_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { home_header_tab_data} from "./home_data.js";

  export default {
    name: "home",
    data() {
      return {
        header_tab_data: [],
      }
    },
    computed: {},
    components: {

    },
    created() {
      this.header_tab_data = this.$deepClone(home_header_tab_data);
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
.home{
  height: 100%;
  padding: 0 30px;
  padding-bottom: 30px;
  background: #fafafa;
  .home_header_tab{
    margin-bottom: 20px;
  }
  .home_content{
    max-width: 1040px;
    margin: auto;
  }
}
</style>
