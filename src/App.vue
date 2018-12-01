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
    let vue =this;
    this.$nextTick(()=>{
      vue.user_info();
    })
  },
  methods: {
    user_info(){
      this.$store.state.user_info = this.$localStorage.getStore('user_info');
      if(this.$localStorage.getStore('music_info')){
        this.$store.state.music_info = this.$localStorage.getStore('music_info');
        this.$store.state.music_info.playStatus = 'pause';
        this.$localStorage.setStore('music_info', this.$store.state.music_info)
      }
      if(this.$localStorage.getStore('play_music_list')){
        this.$store.state.play_music_list = this.$localStorage.getStore('play_music_list');
      }
      if(this.$localStorage.getStore('history_music_list')){
        this.$store.state.history_music_list = this.$localStorage.getStore('history_music_list');
      }
    }
  },
  watch: {}
}
</script>

<style lang="less">
/*@import url("./assets/css/main_base.less");*/
</style>
