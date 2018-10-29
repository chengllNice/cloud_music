<template>
  <div class="new_music_album">
    <header-tab class="bottom_tab"
                @tabClick="threeTabClick"
                :data="header_tab_data"
                type="left"
                tab-type="three_tab">
      <template>
        <div class="tab_right tab_right_active">推荐</div>
        <div class="ver_line"></div>
        <div class="tab_right">全部</div>
      </template>
    </header-tab>

    <div class="album_main" v-loading="loading">
      <div class="left">本周新碟</div>
      <base-sing-list class=""
                      :list-data="new_album_data"
                      :cols-num="new_album_data.colsNum"></base-sing-list>
    </div>


  </div>
</template>

<script>
  import {
    album_header_tab_data,
    new_album_data} from "./new_music_data";
  import { get_top_album} from "../../../../server/home";
  import { mapState } from 'vuex'

  export default {
    name: "new_music_album",
    data() {
      return {
        header_tab_data: [],
        new_album_data: {},
        loading: true,
        pageChange: false,
        page: {
          pageSize: 20,
          page: 0,
          totalPage: 0
        },
      }
    },
    computed: {
      ...mapState(['device_info', 'scroll_info'])
    },
    components: {},
    created() {
      this.new_album_data = this.$deepClone(new_album_data);
      this.header_tab_data = this.$deepClone(album_header_tab_data);
    },
    mounted() {
      this.device_change();
      this.init();
    },
    methods: {
      init(){
        this.get_top_album_list();
      },
      get_top_album_list(id){
        let vue = this;
        let get_data = {
          type: id ? id : 'ALL',//ALL,,ZH,EA,KR,JP
          offset: this.page.page * this.page.pageSize,//分页
          limit: this.page.pageSize,//每页显示数量
        };
        this.loading = true;

        get_top_album(get_data).then(res=>{
          let data_format = this.$uiconfigFormat(res.albums, this.new_album_data.uiconfig);
          this.new_album_data.data.push(...data_format);
          this.loading = false;
          this.page.totalPage = Math.ceil(res.total/this.page.pageSize);
          this.pageChange = true;
        }).catch(err=>{
          this.loading = false;
          console.log('err',err)
        })
      },
      threeTabClick(data){
        /*this.$router.push({
          path: this.$route.path,
          query: {
            three_type: data.id
          }
        });*/
        this.page.page = 0;
        this.new_album_data = null;
        this.new_album_data = this.$deepClone(new_album_data);
        this.get_top_album_list(data.id);
      },
      device_change(){
        if(this.device_info.clientWidth >= 1200){
          this.new_album_data.colsNum = 5
        }else{
          this.new_album_data.colsNum = 4
        }
      }
    },
    watch: {
      'device_info.clientWidth': function (new_val, old_val) {
        this.device_change();
      },
      'scroll_info.process': function (new_val, old_val) {
        if(new_val >= 0.98 && this.pageChange && this.page.page <= this.page.totalPage){
          this.pageChange = false;
          this.page.page++;
          this.get_top_album_list();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.new_music_album{
  .bottom_tab{
    height: 28px;
  }
  .sub_header_nav{
    margin-bottom: 10px;
    .list{

    }
  }
  .tab_right{
    font-size: 12px;
    color: rgba(136,136,136,1);
    padding: 0 12px;
    cursor: pointer;
    &.tab_right_active{
      color: rgba(51,51,51,1);
    }
    &:hover{
      color: rgba(51,51,51,1);
    }
  }
  .ver_line{
    width: 0px;
    height: 12px;
    border-right: 1px solid rgba(204,204,204,1);
  }
  .album_main{
    display: flex;

    .left{
      padding-left: 8px;
      padding-right: 40px;
      word-break: break-word;
      width: 52px;
      font-size: 18px;
      color: #222222;
    }
  }
}
</style>
<style lang="less">
  .new_music_album{
    .item_img{
      padding-right: 32px;
    }
    .base_sing_list .list_box .body_box .item .item_img .item_img_cover .play_circle_icon{
      right: 35px!important;
    }
  }

</style>
