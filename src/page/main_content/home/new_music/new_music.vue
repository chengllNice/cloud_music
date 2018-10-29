<template>
  <div class="new_music">

    <div class="header_tab_box">
      <div class="top_tab_box">
        <header-tab :data="top_tab_data" tab-type="iview_tab"></header-tab>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "new_music",
    data() {
      return {
        top_tab_data: [
          {
            id: 'new_music',
            name: '新歌速递',
            path: '/home/new_music/express'
          },
          {
            id: 'new_album',
            name: '新碟上架',
            path: '/home/new_music/album'
          }
        ]
      }
    },
    computed: {

    },
    components: {},
    created() {

    },
    mounted() {

    },
    methods: {

    },
    watch: {

    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/css/common";
.new_music{
  .header_tab_box{
    text-align: center;
    margin-top: 40px;
    .top_tab_box{

    }
  }
}
</style>
