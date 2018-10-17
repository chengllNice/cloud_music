<template>
  <div class="cl_common_header">
    <div class="logo"></div>
    <div class="sreach">
      <div class="back_left"></div>
      <div class="back_right"></div>
      <div class="sreach_input_box">
        <cl-input></cl-input>
      </div>
    </div>
    <div class="login"></div>
    <div class="skin"></div>
    <div class="email"></div>
    <div class="setting"></div>
  </div>
</template>

<script>
  export default {
    name: "clCommonHeader",
    data() {
      return {}
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
.cl_common_header{
  background: #c62f2f;
  width: 100%;
  height: 64px;
}
</style>
