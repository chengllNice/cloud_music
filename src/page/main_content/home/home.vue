<template>
  <div class="home">
    <sub-header-nav></sub-header-nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import subHeaderNav from './sub_header_nav/sub_header_nav'
  export default {
    name: "home",
    data() {
      return {}
    },
    computed: {},
    components: {
      subHeaderNav
    },
    created() {
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
  background: #f5f5f7;
}
</style>
