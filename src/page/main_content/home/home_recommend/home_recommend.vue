<template>
  <div class="home_recommend">
    <banner :list-data="banner_data"></banner>

    <div class="" v-for="(item, index) in all_data" :key="index">
      <base-sing-list class="home_list" :list-data="item" :cols-num="item.colsNum">
        <template v-if="item.slot && item.slot == 'song_body'" slot="song_body">
          <base-table :data="item.data" :config="item.config" v-if="item.type == 'table'">
            <template slot="content" slot-scope="data">
              <div class="new_song_content">
                <div class="left_img" v-if="data.data.img">
                  <img :src="data.data.img" alt="">
                  <div class="img_cover">
                    <div class="abs_center play_icon">
                      <i class="iconfont icon-music_play"></i>
                    </div>
                  </div>
                </div>
                <div class="right_info">
                  <div class="song_name" v-if="data.data.song_name">
                    <span>{{data.data.song_name}}</span>
                    <span v-if="data.data.des">({{data.data.des}})</span>
                  </div>
                  <div class="singer">
                    <base-tool-button v-if="data.data.video" type="icon" cl-type="play_video_icon_button" icon-class="icon-music_play"></base-tool-button>
                    <base-tool-button v-if="data.data.superQuality" type="" cl-type="sq_button">SQ</base-tool-button>
                    <span v-if="data.data.singer">{{data.data.singer}}</span>
                  </div>
                </div>
              </div>
            </template>
          </base-table>
        </template>
      </base-sing-list>
    </div>
    <!--<base-sing-list class="home_list" :list-data="exclusive_data" :cols-num="3"></base-sing-list>-->
    <!--<base-sing-list class="home_list" :list-data="recommend_mv_data" :cols-num="3"></base-sing-list>-->
    <div class="home_footer">
      <p>现在可以根据个人爱好，自由调整首页栏目顺序啦~</p>
      <base-tool-button class="common_button change_button" type="text" width="130px" height="32px">调整栏目顺序</base-tool-button>
    </div>
  </div>
</template>

<script>
  import banner from '../../../components/banner/banner';
  import {
    banner_data,
    recommend_sing_data,
    exclusive_data,
    recommend_mv_data,
    radio_station_data,
    new_song_data} from "./recommend_data";

  export default {
    name: "home_recommend",
    data() {
      return {
        banner_data: [],
        all_data: [],
        recommend_data: {},//推荐歌单
        exclusive_data: {},//独家放送,
        new_song_data: {},//最新歌单
        recommend_mv_data: {},//推荐mv,
        radio_station_data: {},//电台
      }
    },
    computed: {},
    components: {
      banner
    },
    created() {
      this.banner_data = this.$deepClone(banner_data);
      this.recommend_data = this.$deepClone(recommend_sing_data);
      this.exclusive_data = this.$deepClone(exclusive_data);
      this.new_song_data = this.$deepClone(new_song_data);
      this.recommend_mv_data = this.$deepClone(recommend_mv_data);
      this.radio_station_data = this.$deepClone(radio_station_data);
      this.all_data.push(
        this.recommend_data,
        this.exclusive_data,
        this.new_song_data,
        this.recommend_mv_data,
        this.radio_station_data);

    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.init_data();
      },
      init_data(){
        this.all_data.forEach(item=>{
          if(this.$typeOf(item.data) == 'array' && item.data.length){
            item.data.forEach(item_01=>{
              this.$unitFormat(item_01,5)
            });
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
.home_recommend{
  .home_list{
    margin-bottom: 30px;
    .base_table{
      padding-left: 20px;
    }
  }
  .new_song_content{
    display: flex;
    padding: 10px 0;
    .left_img{
      position: relative;
      width: 40px;
      height: 40px;
      img{
        width: 100%;
        height: 100%;
      }
      .img_cover{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    .right_info{
      flex: 1;
      /*height: 100%;*/
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;
      .song_name{
        color: #333333;
        span:nth-of-type(2){
          color: #888888;
        }
      }
      .singer{
        display: flex;
        align-items: center;
        cursor: pointer;
        &>*{
          margin-right: 10px;
        }
      }
    }
  }

  .home_footer{
    font-size: 12px;
    color: #666666;
    border-top: 1px solid #e1e1e2;
    padding-top: 20px;
    padding-bottom: 40px;
    text-align: center;
    p{
      margin-bottom: 10px;
    }
    .change_button{
      line-height: 20px!important;
      text-align: center;
    }
  }
}
</style>
<style lang="less">
  .home_recommend{
    .base_table{
      padding-left: 20px;
    }
  }
</style>
