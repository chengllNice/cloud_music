<template>
  <div class="common_footer">
    <player></player>
  </div>
</template>

<script>
  import player from '../player/player'
  export default {
    name: "common_footer",
    data() {
      return {}
    },
    computed: {},
    components: {
      player
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
.common_footer{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #e2e2e3;
  background: #ffffff;
}
</style>
