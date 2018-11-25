<template>
  <div class="home_recommend">
    <banner :list-data="banner_data"></banner>

    <div class="" v-for="(item, index) in all_data" :key="index">
      <base-sing-list class="home_list" :list-data="item"
                      :cols-num="item.colsNum" @songlistClick="songlistClickHandler" @moreClick="moreClick">
        <template v-if="item.slot && item.slot == 'song_body'" slot="song_body">
          <base-table :data="item.data" :config="item.config" @dbclick="tableClick" v-if="item.type == 'table'">
            <template slot="content" slot-scope="data">
              <!--{{data}}-->
              <div class="new_song_content">
                <div class="left_img" v-if="data.data.picUrl">
                  <img :src="data.data.picUrl" alt="">
                  <div class="img_cover">
                    <div class="abs_center play_icon">
                      <i class="iconfont icon-music_play"></i>
                    </div>
                  </div>
                </div>
                <div class="right_info">
                  <div class="song_name" v-if="data.data.song_name">
                    <div>{{data.data.song_name}}</div>
                    <div v-if="data.data.alias && data.data.alias.length">
                      <span class="ellipsis_1" v-for="(alias_item, alias_index) in data.data.alias" :key="alias_index">({{alias_item}})</span>
                    </div>
                  </div>
                  <div class="singer">
                    <base-tool-button v-if="data.data.mvid" type="icon" cl-type="play_video_icon_button" icon-class="icon-music_play"></base-tool-button>
                    <base-tool-button v-if="data.data.maxbr && data.data.maxbr == '999000'" type="" cl-type="sq_button">SQ</base-tool-button>
                    <span v-if="data.data.artists && data.data.artists.length">
                      <span v-for="(singer_item, singer_index) in data.data.artists" :key="singer_index">
                        <span v-if="singer_index != 0">/ </span> {{singer_item.name}}
                      </span>
                    </span>
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
  import { mapState } from 'vuex'
  import banner from '../../../components/banner/banner';
  import {
    banner_data,
    recommend_sing_data,
    exclusive_data,
    recommend_mv_data,
    radio_station_data,
    new_song_data} from "./recommend_data";
  import {
    get_banner,
    get_personalized,
    get_privatecontent,
    get_newsong,
    get_mv,
    get_djprogram} from "../../../../server/home";

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
    computed: {
      ...mapState(['device_info'])
    },
    components: {
      banner
    },
    created() {
      // this.banner_data = this.$deepClone(banner_data);
      this.recommend_data = this.$deepClone(recommend_sing_data);
      this.exclusive_data = this.$deepClone(exclusive_data);
      this.new_song_data = this.$deepClone(new_song_data);
      this.recommend_mv_data = this.$deepClone(recommend_mv_data);
      this.radio_station_data = this.$deepClone(radio_station_data);

    },
    mounted() {
      this.init();
    },
    methods: {
      async init(){
        this.get_init_data();
      },
      async get_init_data(){
        this.get_banner_data();//获取banner
        this.get_personalized_data();//获取推荐歌单
        this.get_privatecontent_data();//获取独家放送
        this.get_newsong_data();//获取最新音乐
        this.get_mv_data();//获取推荐MV
        await this.get_dj_recommend_data();//获取推荐电台
        this.all_data_format();

      },
      all_data_format(){

        let recommend_data = this.$deepClone(this.recommend_data);
        let exclusive_data = this.$deepClone(this.exclusive_data);
        let new_song_data = this.$deepClone(this.new_song_data);
        let recommend_mv_data = this.$deepClone(this.recommend_mv_data);
        let radio_station_data = this.$deepClone(this.radio_station_data);

        let device_info = this.device_info;
        if(device_info.clientWidth >= 1068){
          radio_station_data.colsNum = 6;
        }else{
          radio_station_data.colsNum = this.radio_station_data.colsNum;
        }
        if(device_info.clientWidth >= 1304){
          recommend_mv_data.colsNum = 4;
        }else{
          recommend_mv_data.colsNum = this.recommend_mv_data.colsNum;
        }

        let recommend_colsNum = recommend_data.colsNum || 10;
        let exclusive_colsNum = exclusive_data.colsNum || 5;
        let recommend_mv_colsNum = recommend_mv_data.colsNum || 3;
        let radio_station_colsNum = radio_station_data.colsNum || 5;


        recommend_data.data.splice(recommend_colsNum*2);
        exclusive_data.data.splice(exclusive_colsNum);
        recommend_mv_data.data.splice(recommend_mv_colsNum);
        radio_station_data.data.splice(radio_station_colsNum);
        this.all_data = [];
        this.all_data.push(
          recommend_data,
          exclusive_data,
          new_song_data,
          recommend_mv_data,
          radio_station_data
        );
        this.all_data.sort(function (a, b) {
          return a.weight - b.weight;
        })
      },
      async get_banner_data(){
        get_banner().then(res=> {
          this.banner_data = res.banners;
        }).catch(err=>{
          console.log('err',err);
        })
      },
      async get_personalized_data(){
        return new Promise((resolve, reject)=>{
          get_personalized().then(res=>{
            let format_data = this.$uiconfigFormat(res.result,this.recommend_data.uiconfig);
            this.recommend_data.data = format_data;
            this.$unitFormat(this.recommend_data.data, 'playCount');
            // this.all_data.push(this.recommend_data);
            resolve();
          }).catch(err=>{
            console.log('err',err);
            reject(err);
          })
        });
      },
      async get_privatecontent_data(){
        return new Promise((resolve, reject)=>{
          get_privatecontent().then(res=>{
            let format_data = this.$uiconfigFormat(res.result,this.exclusive_data.uiconfig);
            this.exclusive_data.data = format_data;
            this.exclusive_data.data.forEach(item=>{
              this.$setObjectValue(item, 'width', 338);
              this.$setObjectValue(item, 'height', 189);
            });
            // this.all_data.push(this.exclusive_data);
            resolve()
          }).catch(err=>{
            console.log('err',err);
            reject(err)
          })
        });
      },
      async get_newsong_data(){
        return new Promise((resolve, reject)=>{
          get_newsong().then(res=>{
            this.$tableListInit(res.result, this.new_song_data.data);
            resolve()
            // this.all_data.push(this.new_song_data);
          }).catch(err=>{
            console.log('err',err);
            reject()
          })
        });
      },
      async get_mv_data(){
        return new Promise((resolve, reject)=>{
          get_mv().then(res=>{
            let format_data = this.$uiconfigFormat(res.result,this.recommend_mv_data.uiconfig);
            format_data.forEach(item=>{
              item.width = '338';
              item.height = '189';
            });
            this.recommend_mv_data.data = format_data;
            this.$unitFormat(this.recommend_mv_data.data, 'playCount');
            resolve()
            // this.all_data.push(this.recommend_mv_data);
          }).catch(err=>{
            console.log('err',err);
            reject()
          })
        })
      },
      async get_dj_recommend_data(){
        return new Promise((resolve, reject)=>{
          get_djprogram().then(res=>{
            let format_data = this.$uiconfigFormat(res.result,this.radio_station_data.uiconfig);
            this.radio_station_data.data = format_data;
            resolve();
            // this.$unitFormat(this.radio_station_data.data, 'playCount');
            // this.all_data.push(this.radio_station_data);
          }).catch(err=>{
            console.log('err',err);
            reject();
          })
        })
      },
      tableClick(data){
        console.log(data)
        let get_data = {
          id: data.data.id
        };
        this.$commonApi.getSongUrl(get_data).then(res=>{
          if(res.data && res.data.length){
            let url = res.data[0].url;
            let info = {
              id: data.data.id,
              url: url,
              playStatus: 'play',
              picUrl: data.data.picUrl,
              song_name: data.data.song_name,
              artists: data.data.artists,
              album: data.data.album,
              alias: data.data.alias,
            };
            this.$store.commit('get_music_info',info);
          }
        }).catch(err=>{
          console.log('err',err)
        });
      },
      songlistClickHandler(data){
        this.$router.push({
          path: '/songlist_detail_common',
          query: { id: data.id}
        })
      },
      moreClick(data){

      }
    },
    watch: {
      'device_info.clientWidth': function (new_val, old_val) {
        this.all_data_format();
      }
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
        display: flex;
        align-items: center;
        justify-content: left;
        color: #333333;
        div:nth-of-type(2){
          flex: 1;
          padding-left: 5px;
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
