<template>
  <div class="banner">
    <div class=""></div>
  </div>
</template>

<script>
  import { banner_data} from "./banner_data";

  export default {
    name: "banner",
    data(){
      return {
        list_data: []
      }
    },
    computed: {

    },
    components: {

    },
    created(){
      this.list_data = this.$deepClone(banner_data);
    },
    mounted(){

    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
.banner{

}
</style>
