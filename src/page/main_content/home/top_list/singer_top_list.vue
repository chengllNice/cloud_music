<template>
  <div class="singer_top_list">
    <header-tab class="bottom_tab"
                @tabClick="threeTabClick"
                :data="header_tab_data"
                type="left"
                tab-type="three_tab"></header-tab>
    <div class="singer_list">
      <base-table :data="singer_list_data.data"
                  :config="singer_list_data.config"
                  type="music"
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
            <span v-else>-</span>
          </div>
        </template>
      </base-table>
    </div>
  </div>
</template>

<script>
  import { singer_list_tab_data, singer_list_data} from "./top_list_data";
  import {get_toplist_artist} from "../../../../server/home";
  export default {
    name: "singer_top_list",
    data() {
      return {
        header_tab_data: [],
        singer_list_data: {}
      }
    },
    computed: {},
    components: {},
    created() {
      this.singer_list_data = this.$deepClone(singer_list_data);
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
          limit: 10,
          offset: 0
        };
        get_toplist_artist(get_data).then(res => {
          let data = res.list.artists;
          this.singer_list_data.trackUpdateTime = this.$timeFormat(res.list.updateTime, 'mm月dd日') + '更新';
          this.$tableListInit(data, this.singer_list_data.data,this)
        }).catch(err => {
          console.log('err', err)
        })
      },
      clickRow(){

      },
      threeTabClick(){

      }
    },
    watch: {}
  }
</script>

<style lang='less' scoped>
.singer_top_list{
  .bottom_tab{
    height: 28px;
  }
}
</style>
