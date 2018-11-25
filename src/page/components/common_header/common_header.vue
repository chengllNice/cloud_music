<template>
  <div class="cl_common_header">
    <div class="header_left">
      <div class="logo">
        <img src="../../../../static/img/logo.svg" alt="网易云音乐">
        <span>网易云音乐</span>
      </div>
      <div class="search">
        <div class="back_button">
          <base-tool-button type="icon" clType="icon_button" :icon-type="false" iconClass="ios-arrow-back" height="21px"></base-tool-button>
          <base-tool-button type="icon" clType="icon_button" :icon-type="false" iconClass="ios-arrow-forward" height="21px"></base-tool-button>
        </div>
        <div class="search_input_box">
          <cl-input :data="search_input" @enter="searchHandler" @iconClick="searchHandler"></cl-input>
        </div>
      </div>
    </div>
    <div class="header_right">
      <div class="login_box">
        <div class="header_img">
          <img v-if="user_info.avatarUrl" :src="user_info.avatarUrl" alt="">
          <img v-else src="../../../../static/img/person.png" alt="">
        </div>
        <base-tool-button v-if="user_info.id" type="aftericon" iconClass="icon-arrow_down" backgroundColor="rgba(0,0,0,0)" fontColor="#eec1c1" font-size="12px"><span>{{user_info.name}}</span></base-tool-button>
        <base-tool-button v-else type="aftericon" iconClass="icon-arrow_down" backgroundColor="rgba(0,0,0,0)" fontColor="#eec1c1" font-size="12px" @click="loginClick"><span>未登录</span></base-tool-button>
      </div>
      <div class="skin">
        <base-tool-button type="icon" iconClass="icon-skin" backgroundColor="rgba(0,0,0,0)" fontColor="#eec1c1" font-size="18px"></base-tool-button>
      </div>
      <div class="email">
        <base-tool-button type="icon" iconClass="icon-email" backgroundColor="rgba(0,0,0,0)" fontColor="#eec1c1" font-size="22px"></base-tool-button>
      </div>
      <div class="setting">
        <base-tool-button type="icon" iconClass="icon-setting" backgroundColor="rgba(0,0,0,0)" fontColor="#eec1c1" font-size="22px"></base-tool-button>
      </div>
    </div>

    <tool-modal :modal="login_modal" width="350" :nofooter="true">
      <div class="" slot="body">
        <login></login>
      </div>
    </tool-modal>
  </div>
</template>

<script>
  import login from '../../login/login'
  import {mapState} from 'vuex'

  export default {
    name: "clCommonHeader",
    data() {
      return {
        login_modal: false,
        search_input: {
          icon: 'ios-search-outline',
          placeholder: '搜索音乐，视频，歌词，电台'
        }
      }
    },
    computed: {
      ...mapState(['user_info'])
    },
    components: {
      login
    },
    created() {
    },
    mounted() {
    },
    methods: {
      loginClick(){
        this.login_modal = true;
      },
      searchHandler(value){
        if(!value){
          return
        }
        this.$router.push({
          path: '/search_page/search_song',
          query: { value: value}
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.cl_common_header{
  background: #c62f2f;
  width: 100%;
  height: 50px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header_left{
    width: 50%;
    display: flex;
    align-items: center;
    .logo{
      width: 175px;
      color: #fff;
      display: flex;
      align-items: center;
      font-size: 17px;
      img{
        width: 18px;
        margin-right: 3px;
      }
    }
    .search{
      display: flex;
      flex-direction: row;
      align-items: center;
      .back_button{
        display: flex;
        align-items: center;
        margin-right: 10px;
        &>div:nth-of-type(1){
          .icon_button{

          }

        }
        &>div:nth-of-type(2){
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
      .search_input_box{

      }
    }
  }
  .header_right{
    width: 50%;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &>div{
      cursor: pointer;
    }

    .login_box{
      display: flex;
      align-items: center;
      .header_img{
        background: #e1e3e4;
        border-radius: 50%;
        overflow: hidden;
        width: 24px;
        height: 24px;
        text-align: center;
        vertical-align: middle;
        margin-right: 5px;
        img{
          width: 24px;
          height: 24px;
        }
      }
      span{
        margin-right: 8px;
      }
    }
    .skin{
      height: 100%;
      margin-left: 20px;
    }
    .email{
      margin-left: 20px;
    }
    .setting{
      margin-left: 20px;
    }
  }
}
</style>
<style lang="less">
  .cl_common_header{

    .back_button{
      .tool_button:nth-of-type(1){
        .icon_button{
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          border-right: none!important;
        }
      }
      .tool_button:nth-of-type(2){
        .icon_button{
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
        }
      }
    }

    .login_box{
      .button_wrap{
        line-height: 20px;
        margin-top: 2px;
      }
      i{
        font-size: 18px;
        margin-top: -2px;
      }
    }
    .header_right{
      &>div:hover{
        *{
          color: #fff!important;
        }
        i{
          color: #fff!important;
        }
      }
    }

    .email{
      i{
        line-height: 21px;
      }
    }



    .ivu-input{
      border: none;
      background: rgba(0,0,0,0.1);
      width: 220px;
      height: 23px;
      border-radius: 20px;
      color: #fff;
      padding-left: 10px;
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #c77373;
      /* placeholder字体大小  */
      font-size: 12px;
      /* placeholder位置  */
      text-align: left;
    }
    .ivu-input-icon{
      width: 20px;
      height: 23px;
      line-height: 23px;
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
