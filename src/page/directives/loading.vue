<template>
  <div class="loading" v-if="value">
    <div style="
           width: 100%;
           padding-top: 20px;
           padding-bottom: 20px;
           text-align: center;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 13px;">
      <img class="loading" src="../../../static/img/loading.svg"/>加载中...</div>
  </div>
</template>

<script>
  export default {
    name: "loading",
    data() {
      return {
        value: true
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>

</style>
