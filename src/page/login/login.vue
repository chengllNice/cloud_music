<template>
    <div class="login">
      <div class="login_logo">
        <img src="../../../static/img/login_logo.png" alt="">
      </div>
      <div class="login_btn">
        <base-tool-button type="" class="phone_login" height="40px">手机号登录</base-tool-button>
        <base-tool-button type="" class="phone_register" height="40px">注册</base-tool-button>
      </div>
      <div class="other_login_title">
        <span class="line_row_left"></span>
        <span class="text">其他登录方式</span>
        <span class="line_row_right"></span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "login",
      data(){
          return {

          }
      },
      mounted(){

      },
      methods: {

      }
    }
</script>

<style lang="less" scoped>
.login{
  .login_logo{
    img{

    }
  }
  .login_btn{

  }
  .other_login_title{
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      font-size: 12px;
    }
    .line_row_left{
      height: 1px;
      background: linear-gradient(left, rgba(234,235,236,1), rgba(221,221,221,1));
    }
    .line_row_right{
      height: 1px;
      background: linear-gradient(right, rgba(234,235,236,1), rgba(221,221,221,1));
    }
    .text{
      padding: 0 10px;
    }
  }
}
</style>
