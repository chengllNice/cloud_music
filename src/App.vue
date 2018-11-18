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
    this.user_info();
  },
  methods: {
    user_info(){
      this.$store.state.user_info = this.$localStorage.getStore('user_info');
      if(this.$localStorage.getStore('music_info')){
        this.$store.state.music_info = this.$localStorage.getStore('music_info');
        this.$store.state.music_info.playStatus = 'pause';
        this.$localStorage.setStore('music_info', this.$store.state.music_info)
      }
    }
  },
  watch: {}
}
</script>

<style lang="less">
/*@import url("./assets/css/main_base.less");*/
</style>
