<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
export default {
  name: 'App',
  data(){
    return {

    }
  },
  mounted(){
    this.get_device_info();
    let vue = this;
    window.resize = function () {
      vue.get_device_info();
    }
  },
  methods: {
    ...mapMutations(['get_device_info'])
  }
}
</script>

<style lang="less">
/*@import url("./assets/css/main_base.less");*/
</style>
