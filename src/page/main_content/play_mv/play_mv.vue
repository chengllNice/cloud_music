<template>
  <div class="play_mv">
    <div class="mv_main">
      <div class="main_left">
        <div class="mv_box">
          <div class="mv_title_info">
            <div class="back_icon"><i class="iconfont icon-arrow_drop_left"></i></div>
            <div class="mv_icon">MV</div>
            <div class="mv_name">{{mv_data.name}}</div>
            <div class="mv_singer" v-for="(item, index) in mv_data.artists" :key="index">
              <span v-if="index != 0">/</span>
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="mv_play_box">
            <jplayer-mv></jplayer-mv>
            <!--<video src=""></video>-->
          </div>
        </div>
        <div class="mv_comment"></div>
      </div>
      <div class="main_right"></div>
    </div>
  </div>
</template>

<script>
  import { get_mv_url, get_mv_detail} from "../../../server/common_api";
  import jplayerMv from './jplayer_mv'

  export default {
    name: "play_mv",
    data() {
      return {
        mv_data: {},
        mv_id: ''
      }
    },
    computed: {},
    components: {
      jplayerMv
    },
    created() {
      this.mv_id = this.$route.query.id || '';
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.get_mv_detail();
        this.get_mv_url();
      },
      get_mv_detail(id){
        let get_data = {
          mvid: this.mv_id
        };
        get_mv_detail(get_data).then(res=>{
          this.mv_data = res.data;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      get_mv_url(id){
        let get_data = {
          id: this.mv_id
        };
        get_mv_url(get_data).then(res=>{
          // this.mv_data = res.data;
        }).catch(err=>{
          console.log('err',err)
        })
      },

    }
  }
</script>

<style lang="less" scoped>
.play_mv{
  position: fixed;
  top: 50px;
  left: 0px;
  z-index: 1300;
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
  background: #fafafa;
  .mv_main{
    padding: 25px 15px 0 15px;
    .main_left{
      .mv_box{
        .mv_title_info{
          display: flex;
          align-items: center;
          &>*{
            margin-right: 5px;
          }
          .back_icon{
            cursor: pointer;
            i{
              font-size: 17px;
              color: #666;
            }
          }
          .mv_icon{
            border: 1px solid #e03f40;
            font-size: 12px;
            padding: 1px 4px;
            color: #e03f40;
            cursor: pointer;
          }
          .mv_name{
            font-size: 18px;
            color: #333333;
          }
          .mv_singer{
            font-size: 12px;
            color: #666;
          }
        }
        .mv_play_box{
          width: 690px;
          /*height: 486px;*/
        }
      }
      .mv_comment{

      }
    }
    .main_right{

    }
  }
}
</style>
