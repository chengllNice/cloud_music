<template>
  <div class="singer_top_list">
    <div class="title">云音乐歌手榜</div>

    <header-tab class="bottom_tab"
                @tabClick="threeTabClick"
                :data="header_tab_data"
                type="left"
                tab-type="three_tab">
      <template>
        <div class="update_time">更新时间：{{updateTime}}</div>
      </template>
    </header-tab>
    <div class="singer_list">
      <base-table :data="singer_list_data.data"
                  :config="singer_list_data.config"
                  @clickRow="clickRow"
                  stripe="stripe">
        <template slot="sort_num_custom" slot-scope="data">
          <div class="sort_num_custom" :class="{'sort_high': data.data._index <= 2}">
            {{data.data._index+1}}
          </div>
        </template>
        <template slot="lastRank" slot-scope="data">
          <div class="lastRank">
            <i class="iconfont icon-sort_new" v-if="data.data.lastRank === ''"></i>
            <i v-else-if="data.data.lastRank < data.data._index" class="iconfont icon-sort_down"></i>
            <i v-else-if="data.data.lastRank > data.data._index" class="iconfont icon-sort_up"></i>
            <span v-else class="no_change_lastRank">-</span>
            <span v-if="data.data.lastRank !== ''">{{Math.abs(data.data.lastRank-data.data._index)}}</span>
          </div>
        </template>
        <template slot="singer_name" slot-scope="data">
          <div class="singer_name">
            <img :src="data.data.picUrl+'?param=120y120'" alt="">
            <div class="singer_name_box">{{data.data.singer_name}}</div>
            <div class="trans_name" v-if="data.data.trans_name">({{data.data.trans_name}})</div>
          </div>
        </template>
      </base-table>
    </div>
  </div>
</template>

<script>
  import { singer_list_tab_data, singer_top_list_data} from "./top_list_data";
  import {get_toplist_artist} from "../../../../server/home";
  export default {
    name: "singer_top_list",
    data() {
      return {
        header_tab_data: [],
        singer_list_data: {},
        updateTime: '',
        filter_tab_id: '1'
      }
    },
    computed: {},
    components: {},
    created() {
      this.singer_list_data = this.$deepClone(singer_top_list_data);
      this.header_tab_data = this.$deepClone(singer_list_tab_data);
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.get_toplist_artist();//歌手榜
      },
      get_toplist_artist(idx) {
        let get_data = {
          type: this.filter_tab_id,
          limit: 100,
          offset: 0
        };
        this.singer_list_data.data.t_body = [];
        get_toplist_artist(get_data).then(res => {
          let data = res.list.artists;
          this.updateTime = this.$timeFormat(res.list.updateTime, 'mm月dd日');
          this.$tableListInit(data, this.singer_list_data.data,this)
        }).catch(err => {
          console.log('err', err)
        })
      },
      clickRow(){

      },
      threeTabClick(data){
        this.filter_tab_id = data.id;
        this.get_toplist_artist();
      }
    },
    watch: {}
  }
</script>

<style lang='less' scoped>
.singer_top_list{
  .title{
    font-size: 22px;
    color: #333333;
    margin-bottom: 20px;
  }
  .bottom_tab{
    height: 28px;
  }
  .update_time{
    font-size: 12px;
    color: #666;
  }
  .singer_list{
    .sort_num_custom{
      width: 20px;
      text-align: right;
    }
    .lastRank{
      width: 100%;
      text-align: center;
      color: #999;
      display: flex;
      justify-content: space-between;
      i{
        font-size: 14px;
        &.icon-sort_down{
          color: #2875ce;
        }
        &.icon-sort_up{
          color: #cd2929;
        }
        &.icon-sort_new{
          font-size: 18px;
          color: #089c19;
        }
      }
      .no_change_lastRank{
        padding-left: 5px;
      }
    }
    .singer_name{
      display: flex;
      align-items: center;
      padding: 5px 0;
      .trans_name{
        color: #888;
        margin-left: 5px;
      }
      img{
        width: 40px;
        height: 40px;
        margin-right: 5px;
      }
    }
  }
}
</style>
