<template>
  <div class="main_content">
    <common-header></common-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import commonHeader from '../common_header/common_header'
  export default {
    name: "main_content",
    data() {
      return {}
    },
    computed: {},
    components: {
      commonHeader
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>

</style>
