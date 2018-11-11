<template>
  <div class="singer_detail_common">
    <div class="singer_detail_box">
      <div class="singer_detail_cover">
        <img :src="singer_detail.img1v1Url" alt="">
      </div>
      <div class="singer_detail_info">
        <div class="singer_detail_title">
          <div class="singer_detail_title_left">
            <div class="title_tip">歌手</div>
            <div class="title_box">
              <div class="name">{{singer_detail.name}}</div>
              <div class="alias">
                <span v-for="(item, index) in singer_detail.alias" :key="index"><span v-if="index != 0">/</span>{{item}}</span></div>
            </div>
          </div>
          <div class="collection_btn">
            <i class="iconfont icon-my_collections"></i>
            <span>收藏</span>
          </div>
        </div>
        <div class="singer_detail_item">
          <i class="iconfont icon-left_music2"></i>
          <div class="label">单曲数：</div>
          <div class="value">{{singer_detail.musicSize}}</div>
        </div>
        <div class="singer_detail_item">
          <i class="iconfont icon-zhuanji"></i>
          <span class="label">专辑数：</span>
          <span class="value">{{singer_detail.albumSize}}</span>
        </div>
        <div class="singer_detail_item">
          <base-tool-button class="icon" type="icon" cl-type="play_video_icon_button" icon-class="icon-music_play"></base-tool-button>
          <span class="label">MV数：</span>
          <span class="value">{{singer_detail.mvSize}}</span>
        </div>
      </div>
    </div>

    <div class="">
      <div class="tab_box">
        <header-tab class="home_header_tab" tab-type="iview_tab_song" :data="header_tab_data" @tabClick="tabClick">
          <template>
            <div class="right_icon_group">
              <div class="icon_item" :class="{'album_icon_active': album_icon_active == 'theme'}" @click="albumListChange('theme')">
                <i class="iconfont icon-theme"></i>
              </div>
              <div class="icon_item" :class="{'album_icon_active': album_icon_active == 'list'}" @click="albumListChange('list')">
                <i class="iconfont icon-list"></i>
              </div>
              <div class="icon_item" :class="{'album_icon_active': album_icon_active == 'theme_list'}" @click="albumListChange('theme_list')">
                <i class="iconfont icon-theme_list"></i>
              </div>
            </div>
          </template>
        </header-tab>
      </div>

      <div class="singer_album">
        <base-sing-list class=""
                        v-if="album_icon_active == 'theme'"
                        :list-data="singer_album_data"
                        :cols-num="singer_album_data.colsNum"></base-sing-list>

        <base-table :data="singer_album_list_data.data"
                    :config="singer_album_list_data.config"
                    v-if="album_icon_active == 'list'"
                    @dbclick="tableClick">
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
    </div>
  </div>
</template>

<script>
  import { singer_album_data, singer_album_list_data} from "./singer_detail_data";
  import { get_artist_detail, get_artist_desc, get_artist_album} from "../../../server/common_api";
  import { mapState } from 'vuex'

  export default {
    name: "singer_detail_common",
    data() {
      return {
        singer_detail: {},
        singer_album_data: {},
        singer_album_list_data: {},
        header_tab_data: [
          {
            id: '0',
            name: '专辑',
            value: ''
          },
          {
            id: '1',
            name: 'MV',
            value: ''
          },
          {
            id: '2',
            name: '歌手详情',
            value: ''
          },
          {
            id: '3',
            name: '相似歌手',
            value: ''
          }
        ],
        album_icon_active: 'theme_list',
        pageChange: true,
        is_more: true,
        page: {
          page: 1,
          total: 0,
          pageSize: 24
        }
      }
    },
    computed: {
      ...mapState(['device_info', 'scroll_info'])
    },
    components: {
    },
    created() {
      this.singer_album_data = this.$deepClone(singer_album_data);
      this.singer_album_list_data = this.$deepClone(singer_album_list_data);
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.get_artist_desc();
        this.get_artist_album();
      },
      get_artist_desc(){
        let get_data = {
          id: this.$route.query.id || ''
        };
        get_artist_detail(get_data).then(res=>{
          this.singer_detail = res.artist;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      get_artist_album(){
        let get_data = {
          id: this.$route.query.id || '',
          limit: this.page.pageSize,
          offset: (this.page.page-1)*this.page.pageSize
        };
        get_artist_album(get_data).then(res=>{
          let data_format = this.$uiconfigFormat(res.hotAlbums, this.singer_album_data.uiconfig);
          data_format.forEach(item=>{
            let time = this.$timeFormat(item.publishTime, 'yy-mm-dd');
            let size = item.size + '首';
            this.$setObjectValue(item, 'publishTime', time);
            this.$setObjectValue(item, 'time', '发布时间：'+time);
            this.$setObjectValue(item, 'size', size)
          });
          this.singer_album_list_data.data.t_body.push(...data_format);
          this.singer_album_data.data.push(...data_format);
          // this.loading = false;
          this.page.total = res.total;
          this.is_more = res.more;
          this.pageChange = true;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      tabClick(){

      },
      albumListChange(type){
        this.album_icon_active = type;
      },
      tableClick(){

      }
    },
    watch: {
      'scroll_info.process': function (new_val, old_val) {
        if(new_val >= 0.98 && this.pageChange && this.is_more){
          this.pageChange = false;
          this.page.page++;
          this.get_artist_album();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.singer_detail_common{
  .singer_detail_box{
    display: flex;
    padding: 30px;
    .singer_detail_cover{
      width: 198px;
      height: 198px;
      margin-right: 30px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .singer_detail_info{
      flex: 1;
      .singer_detail_title{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding-top: 5px;
        margin-bottom: 20px;
        .singer_detail_title_left{
          display: flex;
          align-items: flex-start;
          .title_tip{
            color: #ffffff;
            /*border: 1px solid #e03f40;*/
            background: #c62f2f;
            flex: none;
            padding: 2px 7px;
            border-radius: 2px;
            font-size: 12px;
          }
          .title_box{
            padding-left: 5px;
            .name{
              font-size: 23px;
              color: #333333;
              line-height: 1;
              /*font-weight: bolder;*/
            }
            .alias{
              &>span{
                color: #666;
                font-size: 12px;
              }
            }
          }
        }
        .collection_btn{
          border: 1px solid #e1e1e2;
          border-radius: 3px;
          background: #ffffff;
          font-size: 12px;
          color: #333333;
        }
      }

      .singer_detail_label{
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 22px;
        .label{

        }
        .name{
          display: flex;
          align-items: center;
          div{
            color: #0c73c2;
            cursor: pointer;
          }
          span{
            color: #6a6aaf;
            margin: 0 2px;
          }
        }
      }
      .singer_detail_item{
        font-size: 12px;
        line-height: 22px;
        display: flex;
        align-items: center;
        .label{
          color: #333333;
        }
        .value{
          color: #666666;
        }
        .icon, i{
          width: 25px;
          justify-content: left;
        }
        .icon-left_music2{
          font-size: 20px;
        }
        .icon-zhuanji{
          font-weight: 600;
          font-size: 14px;
          padding-left: 3px;
        }
      }
    }
  }

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

  .singer_album{
    padding: 20px 30px 0 35px;
    .album_picUrl{
      height: 40px;
      width: 48px;
      margin: 10px 0;
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
}
</style>
<style lang="less">
  .singer_detail_common{
    .tool_button{
      padding-left: 2px;
      .play_video_icon_button{
        border-color: #666!important;
        padding: 0!important;
        height: 12px!important;
        i{
          color: #666!important;
          font-size: 12px!important;
        }
      }
    }
    .singer_album{
      .item_img{
        padding-right: 32px;
      }
    }
  }

</style>
