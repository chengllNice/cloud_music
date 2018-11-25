<template>
  <div class="album_info">
    <div class="album_info_item" v-show="album_icon_active == 'theme'">
      <base-sing-list class=""
                      :list-data="singer_album_theme_data"
                      :cols-num="singer_album_theme_data.colsNum"
                      @songlistClick="go_album_detail"></base-sing-list>
    </div>

    <div class="album_info_item album_info_list" v-show="album_icon_active == 'list'">
      <base-table :data="singer_album_list_data.data"
                  :config="singer_album_list_data.config"
                  @clickRow="go_album_detail">
        <template slot="picUrl_content" slot-scope="data">
          <div class="album_picUrl">
            <img :src="data.data.picUrl" alt="">
          </div>
        </template>
        <template slot="name_content" slot-scope="data">
          <div class="album_name ellipsis_1">
            <span class="ellipsis_1">{{data.data.name}}</span>
            <span class="alias_name ellipsis_1" v-for="(item, index) in data.data.alias" :key="index">({{item}})</span>
          </div>
        </template>
      </base-table>
    </div>

    <div class="album_info_item" v-show="album_icon_active == 'theme_list'">
      <div class="album_theme_list_box" v-for="(album_item, album_index) in singer_album_theme_list_data_arr" :key="album_index">
        <div class="album_coverimg">
          <div class="pic" @click="go_album_detail(album_item)">
            <img :src="album_item.album_info.picUrl" alt="">
          </div>
          <div class="publishTime">{{album_item.album_info.publishTime}}</div>
        </div>
        <div class="album_table">
          <base-table :data="album_item.data"
                      :config="album_item.config"
                      stripe="stripe"
                      @dbclick="tableClick">
            <template slot="header" slot-scope="data">
              <div class="table_header">
                <div class="play_all" @click="go_album_detail(album_item)">
                  {{album_item.album_info.name}}
                </div>
                <div class="play_opare">
                  <span><i class="iconfont icon-add_file"></i></span>
                  <span><i class="iconfont icon-music_play1"></i></span>
                </div>
              </div>
            </template>
            <template slot="name_content" slot-scope="data">
              <div class="album_name ellipsis_1">
                <span class="ellipsis_1">{{data.data.name}}</span>
                <!--<span class="alias_name ellipsis_1" v-for="(item, index) in data.data.alias" :key="index">({{item}})</span>-->
              </div>
            </template>
            <template slot="footer" slot-scope="data">
              <div class="table_footer" v-if="album_item.album_info.songs_len>10">
                <span @click="go_album_detail(album_item)">查看全部 {{album_item.album_info.songs_len}} 首 <i class="iconfont icon-right"></i></span>
              </div>
            </template>
          </base-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { singer_album_theme_data, singer_album_list_data, singer_album_theme_list_data} from "./singer_detail_data";
  import { get_artist_detail, get_artist_desc, get_artist_album, get_album} from "../../../server/common_api";
  import { mapState } from 'vuex'

  export default {
    name: "album_info",
    props: {
      album_icon_active: {
        type: String,
        default: ''
      },
      tab_active: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        singer_album_theme_data: {},
        singer_album_list_data: {},
        singer_album_theme_list_data: {},
        singer_album_theme_list_data_arr: [],
        pageChange: true,
        is_more: true,
        theme_page: {
          page: 1,
          total: 0,
          pageSize: 24
        },
        list_page: {
          page: 1,
          total: 0,
          pageSize: 10
        },
        theme_list_page: {
          page: 1,
          total: 0,
          pageSize: 5
        }
      }
    },
    computed: {
      ...mapState(['device_info', 'scroll_info'])
    },
    components: {
    },
    created() {
      this.singer_album_theme_data = this.$deepClone(singer_album_theme_data);
      this.singer_album_list_data = this.$deepClone(singer_album_list_data);
      // this.singer_album_theme_list_data = this.$deepClone(singer_album_theme_list_data);
    },
    mounted() {
      this.init();
    },
    methods: {
      async init(){
        this.get_artist_album_theme();
        this.get_artist_album_list();
        this.get_artist_album_theme_list();
      },
      async get_artist_album_theme(){
        let get_data = {
          id: this.$route.query.id || '',
          limit: this.theme_page.pageSize,
          offset: (this.theme_page.page-1)*this.theme_page.pageSize
        };
        get_artist_album(get_data).then(res=>{
          if(!res.hotAlbums.length){
            return
          }
          let data_format = this.$uiconfigFormat(res.hotAlbums, this.singer_album_theme_data.uiconfig);
          data_format.forEach(item=>{
            let time = this.$timeFormat(item.publishTime, 'yy-mm-dd');
            this.$setObjectValue(item, 'publishTime', time);
          });
          this.singer_album_theme_data.data.push(...data_format);
          this.theme_page.total = res.total;
          this.is_more = res.more;
          this.pageChange = true;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      async get_artist_album_list(){
        let get_data = {
          id: this.$route.query.id || '',
          limit: this.list_page.pageSize,
          offset: (this.list_page.page-1)*this.list_page.pageSize
        };
        get_artist_album(get_data).then(res=>{
          if(!res.hotAlbums.length){
            return
          }
          let data_format = this.$uiconfigFormat(res.hotAlbums, this.singer_album_theme_data.uiconfig);
          data_format.forEach(item=>{
            let time = this.$timeFormat(item.publishTime, 'yy-mm-dd');
            let size = item.size + '首';
            this.$setObjectValue(item, 'time', '发布时间：'+time);
            this.$setObjectValue(item, 'size', size)
          });
          this.singer_album_list_data.data.t_body.push(...data_format);
          this.list_page.total = res.total;
          this.is_more = res.more;
          this.pageChange = true;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      async get_artist_album_theme_list(){
        let get_data = {
          id: this.$route.query.id || '',
          limit: this.theme_list_page.pageSize,
          offset: (this.theme_list_page.page-1)*this.theme_list_page.pageSize
        };
        get_artist_album(get_data).then(res=>{
          if(!res.hotAlbums.length){
            return
          }
          let data_format = this.$uiconfigFormat(res.hotAlbums, this.singer_album_theme_data.uiconfig);
          this.get_album_theme_list(data_format);
          this.theme_list_page.total = res.total;
          this.is_more = res.more;
          this.pageChange = true;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      async get_album_theme_list(data){
        for(let i = 0; i < data.length; i++){
          let item = data[i];
          await this.get_album(item.id);
        }
      },
      async get_album(id){
        return new Promise((resolve, reject) => {
          let get_data = {
            id: id || ''
          };
          let table_data = this.$deepClone(singer_album_theme_list_data);
          get_album(get_data).then(res=>{
            let result = [];
            if(res.songs.length >= 10){
              result = res.songs.slice(0,10)
            }else{
              result = res.songs
            }
            this.$tableListInit(result,table_data.data);
            table_data.album_info = {
              id: res.album.id,
              name: res.album.name,
              picUrl: res.album.picUrl,
              publishTime: this.$timeFormat(res.album.publishTime, 'yy-mm-dd'),
              songs_len: res.songs.length
            };
            this.singer_album_theme_list_data_arr.push(table_data);
            resolve()
          }).catch(err=>{
            console.log('err',err);
            reject()
          })
        });

      },
      albumListChange(type){
        this.is_more = true;
        this.pageChange = true;
      },
      tableClick(data){
        this.singer_album_theme_list_data_arr.forEach(item=>{
          item.data.t_body.forEach(item1=>{
            if(data.data.id!=item1.id){
              item1.playStatus = ''
            }
          })
        });
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
              song_name: data.data.name,
              artists: data.data.artists,
              album: data.data.album_name,
              alias: data.data.alias
            };
            this.$store.commit('get_music_info',info);
          }
        }).catch(err=>{
          console.log('err',err)
        });
      },
      go_album_detail(data){
        console.log(data)
        let id = data.id?data.id:(data.album_info?data.album_info.id:data.data.id);
        this.$router.push({
          path: '/album_detail_common',
          query: { id: id}
        })
      }
    },
    watch: {
      watch: {
        '$route.query.id': function (new_val, old_val) {
          if(new_val){
            this.init();
          }
        }
      },
      'scroll_info.process': function (new_val, old_val) {
        if(new_val >= 0.98 && this.pageChange && this.is_more && this.tab_active == '0'){
          this.pageChange = false;
          if(this.album_icon_active == 'theme_list'){
            this.theme_list_page.page++;
            this.get_artist_album_theme_list();
          }
          if(this.album_icon_active == 'theme'){
            this.theme_page.page++;
            this.get_artist_album_theme();
          }
          if(this.album_icon_active == 'list'){
            this.list_page.page++;
            this.get_artist_album_list();
          }
        }
      },
      'album_icon_active': function (new_val, old_val) {
        this.albumListChange()
      }
    }
  }
</script>

<style lang="less" scoped>
  .singer_detail_common{

    .tab_box{
      border-bottom: 1px solid #c62f2f;
      padding: 0 30px;
      .right_icon_group{
        padding-bottom: 5px;
        display: flex;
        align-items: center;
        overflow: hidden;

        .icon_item{
          border: 1px solid #e1e1e2;
          background: #ffffff;
          padding: 1px 8px;
          cursor: pointer;
          i{
            font-size: 12px;
          }
          &:hover{
            background: #f5f5f7;
          }
          &:nth-of-type(1){
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            margin-right: -1px;
          }
          &:nth-of-type(3){
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            margin-left: -1px;
          }
        }
        .album_icon_active{
          background: #7c7d85!important;
          i{
            color: #ffffff!important;
          }
        }
      }
    }

    .album_info_item{
      padding: 0 30px 0 35px;
      .album_picUrl{
        height: 40px;
        /*width: 48px;*/
        margin: 10px 0;
        margin-left: 25px;
        background: url("../../../../static/img/album_cover.png") no-repeat;
        background-size: auto 100%;
        background-position: 1px center;
        img{
          /*width: 100%;*/
          height: 100%;
        }
      }
      .album_name{
        display: flex;
        align-items: center;
        .alias_name{
          color: #888;
        }
      }
    }
    .album_info_list{
      padding: 0;
    }

    .album_theme_list_box{
      display: flex;
      /*align-items: flex-start;*/
      /*justify-content: space-between;*/
      margin-bottom: 30px;
      width: 100%;
      .album_coverimg{
        width: 210px;
        cursor: pointer;
        .pic{
          width: 180px;
          height: 150px;
          background: url("../../../../static/img/album_cover.png") no-repeat;
          background-size: auto 100%;
          img{
            /*width: 100%;*/
            height: 100%;
          }
        }
        .publishTime{
          font-size: 12px;
          color: #666;
          margin-top: 10px;
        }
      }
      .album_table{
        /*flex: 1;*/
        width: calc(100% - 210px);
        /*padding-left: 30px;*/
      }

      .table_header{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fafafa;
        border: none;
        line-height: 1;
        padding-bottom: 5px;
        .play_all{
          cursor: pointer;
        }
        .play_opare{
          display: flex;
          align-items: center;
          i{
            font-size: 20px;
            color: #888;
          }
        }
      }

      .table_footer{
        background: #fafafa;
        span{
          cursor: pointer;
          i{
            font-size: 12px;
          }
        }
      }
    }

  }
</style>
<style lang="less">
  .album_info{
    .singer_album{
      .item_img{
        padding-right: 32px;
      }
    }
    .album_theme_list_box{
      .ivu-table-footer, .ivu-table-title{
        height: auto!important;
        border: none!important;
      }
      .ivu-table-body{
        border: 1px solid #e1e1e2;
      }
    }
  }

</style>
