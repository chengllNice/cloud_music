<template>
  <div class="cl_common_header">
    <div class="header_left">
      <div class="logo">
        <img src="../../../static/img/logo.svg" alt="">
        <span>网易云音乐</span>
      </div>
      <div class="search">
        <div class="back_left"></div>
        <div class="back_right"></div>
        <div class="search_input_box">
          <cl-input :data="search_input"></cl-input>
        </div>
      </div>
    </div>
    <div class="header_right">
      <div class="login"></div>
      <div class="skin"></div>
      <div class="email"></div>
      <div class="setting"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "clCommonHeader",
    data() {
      return {
        search_input: {
          icon: 'ios-search-outline',
        }
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
.cl_common_header{
  background: #c62f2f;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header_left{
    width: 50%;
    display: flex;
    align-items: center;
    .logo{
      color: #fff;
      display: flex;
      align-items: center;
      font-size: 16px;
      img{
        width: 18px;
        margin-right: 3px;
      }
    }
  }
  .header_right{
    width: 50%;
  }
}
</style>
<style lang="less">
  .cl_common_header{

    .ivu-input{
      border: none;
      background: rgba(0,0,0,0.3);
      height: 20px;
      border-radius: 20px;
    }
    .ivu-input-icon{
      width: 20px;
      height: 20px;
      line-height: 20px;
      position: absolute;
      right: 5px;
      cursor: pointer;
      color: #cf8989;
      &:hover{
        color: #fff;
      }
    }
  }
</style>
