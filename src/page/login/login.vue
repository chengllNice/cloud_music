<template>
  <div class="login">
    <div class="login_logo">
      <div class="login_bg"></div>
      <img src="../../../static/img/login_logo.png" alt="">
    </div>
    <div class="login_main">
      <div class="login_form">
        <div class="phone_box">
          <span class="label"><i class="iconfont icon-phone"></i></span>
          <div class="input_box">
            <cl-input :data="phone" :value="phone_value" @input="phone_input" @keyup.enter="login"></cl-input>
          </div>
        </div>
        <div class="password_box">
          <span class="label"><i class="iconfont icon-password"></i></span>
          <div class="input_box">
            <cl-input :data="password" :value="password_value" @input="password_input" @keyup.enter="login"></cl-input>
          </div>
          <span class="reset_password">重置密码</span>
        </div>
      </div>
      <div class="auto_login">
        <cl-checkbox name="自动登录"></cl-checkbox>
      </div>
      <div class="login_btn" @click="login">登 录</div>
      <div class="register">注册</div>
    </div>
    <div class="other_login_title">
      <span class="line_row_left"></span>
      <span class="text">其他登录方式</span>
      <span class="line_row_right"></span>
    </div>
    <div class="other_login_box">
      <span @click="loginOther('wechat')"><i class="iconfont icon-wechat"></i></span>
      <span @click="loginOther('qq')"><i class="iconfont icon-qq"></i></span>
      <span @click="loginOther('weibo')"><i class="iconfont icon-weibo"></i></span>
      <span @click="loginOther('netease')"><i class="iconfont icon-netease"></i></span>
    </div>
  </div>
</template>

<script>
  import {phone_login} from "../../server/common_api";

  export default {
    name: "login",
    data() {
      return {
        phone: {
          placeholder: '请输入手机号',
        },
        phone_value: '',
        password: {
          placeholder: '请输入密码',
        },
        password_value: '',
      }
    },
    mounted() {

    },
    methods: {
      password_input(value) {
        this.password_value = value;
      },
      phone_input(value) {
        this.phone_value = value;
      },
      loginOther() {
        this.$Message.info('暂未开通此功能！')
      },
      login() {
        if (!this.phone_value || !this.password_value) {
          this.$Message.info('请输入完整的登录信息');
          return;
        }
        let login_data = {
          phone: this.phone_value,
          password: this.password_value
        };
        phone_login(login_data).then(res => {
          let profile = res.profile;
          let info = {
            name: profile.nickname,
            id: profile.userId,
            avatarUrl: profile.avatarUrl,
            backgroundUrl: profile.backgroundUrl,
            defaultAvatar: profile.defaultAvatar,
            description: profile.description,
            detailDescription: profile.detailDescription,
          };
          this.$store.state.user_info = info;
          this.$localStorage.setStore('user_info', info);
        }).catch(err => {
          this.$Message.error('登录失败');
          console.log('err', err)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .login {
    padding-top: 60px;
    background: #fafafa;
    .login_logo {
      height: 80px;
      text-align: center;
      position: relative;
      .login_bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("../../../static/img/login_bg.png") no-repeat;
        background-size: 100%;
        background-position: 40% 55%;
        filter: blur(5px);
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 80px;
        height: 80px;
      }
    }
    .login_main {
      text-align: center;
      padding: 0 30px;
      .login_form {
        padding-top: 45px;
        span.label {
          width: 20px;
          text-align: center;
        }
        .input_box {
          flex: 1;
        }
        .phone_box {
          display: flex;
          align-items: center;
          border: 1px solid #dcdee2;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          padding-left: 10px;
          padding-right: 10px;
          height: 40px;
          background: #ffffff;
          i {
            font-size: 19px;
            color: #9c9c9c;
          }
        }
        .password_box {
          display: flex;
          align-items: center;
          border: 1px solid #dcdee2;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          margin-top: -1px;
          padding-left: 10px;
          padding-right: 10px;
          height: 40px;
          background: #ffffff;
          .reset_password {
            width: 50px;
            color: #c5c8ce;
            font-size: 12px;
            cursor: pointer;
          }
          i {
            color: #9c9c9c;
          }
        }
      }
      .auto_login {
        margin-top: 10px;
        text-align: left;
      }
    }
    .login_btn {
      background: #ea4848;
      color: #ffffff;
      border-radius: 4px;
      margin: 10px 0;
      text-align: center;
      padding: 7px 0;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        background: #c72e2e;
      }
    }
    .register {
      display: inline-block;
      text-align: center;
      text-decoration: underline;
      color: #333333;
      font-size: 14px;
      cursor: pointer;
    }
    .other_login_title {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 30px;
      span {
        font-size: 12px;
      }
      .line_row_left {
        flex: 1;
        height: 2px;
        background: linear-gradient(right, #dddddd 50%, #eeeef1);
      }
      .line_row_right {
        flex: 1;
        height: 2px;
        background: linear-gradient(left, #dddddd 50%, #eeeef1);
      }
      .text {
        padding: 0 10px;
      }
    }
    .other_login_box {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 20px;
      span {
        width: 42px;
        height: 42px;
        border: 1px solid #eeeeee;
        border-radius: 50%;
        margin: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        * {
          cursor: pointer;
        }
        &:nth-of-type(1), &:nth-of-type(3) {
          i {
            margin-top: 2px;
          }
        }
        i {
          font-size: 26px;
        }
        &:nth-of-type(1):hover {
          background: #67b633;
          i {
            color: #ffffff;
          }
        }
        &:nth-of-type(2):hover {
          background: #34a0df;
          i {
            color: #ffffff;
          }
        }
        &:nth-of-type(3):hover {
          background: #ea4848;
          i {
            color: #ffffff;
          }
        }
        &:nth-of-type(4):hover {
          background: #d33a31;
          i {
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .login {
    .login_form {
      .ivu-input {
        border: none;
      }
    }
  }

</style>
