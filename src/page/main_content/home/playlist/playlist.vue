<template>
  <div class="playlist">
    <div class="playlist_cat_box">
      <div class="playlist_cat_all">
        <div class="current_select_cat" @click="select_cat_handler">
          <span>{{current_select_cat}}</span>
          <i class="iconfont icon-arrow_drop_down"></i>
        </div>
        <transition>
          <div v-if="cat_toggle" class="playlist_cat_all_main">
            <div class="top_down"></div>
            <div class="add_tag">添加标签</div>
            <div class="all_cat_box">
              <div class="all_playlist" :class="{'cat_sub_active': current_select_cat == '全部歌单'}" @click="subCatClick('全部歌单')">
                <span>全部歌单</span>
                <span class="sub_active"><i class="iconfont icon-right-slim1"></i></span>
              </div>
              <div class="all_cat_wrap" v-for="(cat_item, cat_index) in cat_all_data" :key="cat_index" v-if="cat_all_data.length">
                <div class="cat_name_box">
                  <i class="iconfont" :class="cat_item.icon"></i>
                  <span>{{cat_item.name}}</span>
                </div>
                <div class="cat_sub_box">
                  <div class="cat_sub"
                       :class="{'cat_sub_active': current_select_cat == sub_item.sub_name}"
                       v-for="(sub_item, sub_index) in cat_item.data" :key="sub_index"
                       @click="subCatClick(sub_item.sub_name)">
                    {{sub_item.sub_name}}
                    <span v-if="sub_item.sub_hot" class="sub_hot">HOT</span>
                    <span class="sub_active"><i class="iconfont icon-right-slim1"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="playlist_cat_hot">
        <tool-filter-select :data="cat_hot_data"></tool-filter-select>
      </div>
      <!--<div class="playlist_cat_hot">-->
        <!--<div class="hot_label">热门标签 : </div>-->
        <!--<div class="hot_item" v-for="(hot_item, hot_index) in cat_hot_data" :key="hot_index">-->
          <!--<span class="line" v-if="hot_index != '0'"></span>-->
          <!--<span class="name" @click="subCatClick(hot_item.name)">{{hot_item.name}}</span>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div class="playlist_main" v-loading="loading">
      <base-sing-list class="playlist_main_wrap" :list-data="playlist_data"
                      :cols-num="playlist_data.colsNum" @songlistClick="songlistClickHandler" @pageChange="pageChange">
      </base-sing-list>
    </div>
  </div>
</template>

<script>
  import { playlist_data} from "./playlist_data";
  import { get_playlist_catlist, get_playlist_hot, get_top_playlist} from "../../../../server/home";

  export default {
    name: "playlist",
    data() {
      return {
        playlist_data: {},
        cat_all_data: [],
        cat_hot_data: {
          name: '热门标签',
          data: []
        },
        current_select_cat: '华语',
        cat_toggle: false,
        loading: true
      }
    },
    computed: {},
    components: {},
    created() {
      this.playlist_data = this.$deepClone(playlist_data);
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.get_playlist_catlist();
        this.get_playlist_hot();
        this.get_top_playlist();
      },
      get_top_playlist(){
        this.loading=true;
        let get_data = {
          offset: (this.playlist_data.page.page - 1) * this.playlist_data.page.pageSize,
          limit: this.playlist_data.page.pageSize,
          cat: this.current_select_cat
        };
        this.playlist_data.data = [];
        get_top_playlist(get_data).then(res=>{
          let format_data = this.$uiconfigFormat(res.playlists,this.playlist_data.uiconfig);
          this.playlist_data.data = format_data;
          this.$unitFormat(this.playlist_data.data, 'playCount');
          this.playlist_data.page.total = res.total;
          this.loading = false;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      get_playlist_catlist(){
        get_playlist_catlist().then(res=>{
          let all = res.all;
          let categories = res.categories;
          let sub = res.sub;
          this.format_cat(categories,sub);
          // this.cat_all_data = res
        }).catch(err=>{
          console.log('err',err)
        })
      },
      get_playlist_hot(){
        get_playlist_hot().then(res=>{
          this.cat_hot_data.data = res.tags;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      format_cat(categories,sub){
        let data = [];
        Object.keys(categories).forEach(key=>{
          let icon = '';
          switch (key) {
            case '0':
              icon = 'icon-style';
              break;
            case '1':
              icon = 'icon-yuzhong';
              break;
            case '2':
              icon = 'icon-scene';
              break;
            case '3':
              icon = 'icon-smiling_face1';
              break;
            case '4':
              icon = 'icon-theme';
              break;
          }
          let obj = {
            icon: icon,
            name: categories[key],
            data: []
          };
          sub.forEach(sub_item=>{
            if(sub_item.category == key){
              obj.data.push({
                sub_name: sub_item.name,
                sub_hot: sub_item.hot
              })
            }
          });
          this.cat_all_data.push(obj);
        });
      },
      songlistClickHandler(data){
        this.$router.push({
          path: '/songlist_detail_common',
          query: { id: data.id}
        })
      },
      select_cat_handler(){
        this.cat_toggle = !this.cat_toggle;
      },
      subCatClick(data){
        this.cat_toggle = false;
        this.current_select_cat = data;
        this.playlist_data.page.page = 1;
        this.get_top_playlist();
      },
      pageChange(page){
        this.playlist_data.page.page = page;
        this.get_top_playlist();
      }
    }
  }
</script>

<style lang="less" scoped>
.playlist{
  padding-bottom: 20px;
  .playlist_cat_box{
    .playlist_cat_all{
      position: relative;
      .current_select_cat{
        display: inline-block;
        /*width: 58px;*/
        height: 26px;
        padding: 2px 8px;
        border: 1px solid #e1e1e2;
        border-radius: 3px;
        background: #ffffff;
        color: #333333;
        font-size: 12px;
        line-height: 20px;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        cursor: pointer;
        &:hover{
          background: #f5f5f7;
        }
        *{
          cursor: pointer;
        }
        i{
          margin-left: 5px;
          color: #333333;
          font-size: 12px;
          transform: scale(0.8);
        }
      }
      .playlist_cat_all_main{
        position: absolute;
        top: 36px;
        z-index: 10;
        background: #fafafa;
        width: 542px;
        /*height: 416px;*/
        box-shadow: 0 0 10px #ccc;
        border-radius: 5px;
        .top_down{
          position: absolute;
          top: -7px;
          left: 35px;
          z-index: 2;
          width: 15px;
          height: 15px;
          transform: rotate(45deg);
          box-shadow: 0 0 10px #ccc;
          background: #fafafa;
        }
        .add_tag{
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          position: relative;
          z-index: 5;
          height: 45px;
          border-bottom: 1px solid #e1e1e2;
          text-align: left;
          padding: 0 10px;
          line-height: 45px;
          background: #fafafa;
        }
        .all_playlist{
          margin: 10px 0;
          border: 1px solid #e1e1e2;
          text-align: center;
          font-size: 12px;
          line-height: 35px;
          border-radius: 3px;
          cursor: pointer;
          height: 35px;
          position: relative;
          &:hover{
            background: #f5f5f7;
          }
          .sub_active{

          }
        }
        .all_cat_box{
          padding: 0 20px;
          overflow: auto;
          height: 320px;
          .all_cat_wrap{
            display: flex;
            align-items: flex-start;
            margin-bottom: 10px;
            /*flex-wrap: wrap;*/
            .cat_name_box{
              width: 83px;
              padding-right: 10px;
              color: #de4e4e;
              display: flex;
              align-items: center;
              i{
                color: #e09494;
              }
              span{
                padding-left: 10px;
              }
              .icon-style{
                font-size: 28px;
              }
              .icon-yuzhong{
                font-size: 26px;
                font-weight: bolder;
              }
              .icon-scene{
                font-size: 30px;
                font-weight: 600;
                margin-top: -5px;
              }
              .icon-smiling_face1{
                font-size: 25px;
                /*font-weight: bolder;*/
              }
              .icon-theme{
                font-size: 25px;
                /*font-weight: bolder;*/
              }
            }
            .cat_sub_box{
              flex: 1;
              display: flex;
              flex-wrap: wrap;
              .cat_sub{
                width: 82px;
                height: 35px;
                border: 1px solid #e1e1e2;
                color: #666;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                cursor: pointer;
                position: relative;
                &:hover{
                  background: #f5f5f7;
                }
                .sub_hot{
                  font-size: 12px;
                  color: #c62f2f;
                  position: absolute;
                  right: 0;
                  top: 0;
                  font-weight: bolder;
                  text-shadow: 0 0 1px #c62f2f;
                  transform: scale(0.55);
                }
              }
            }
          }
          .sub_active{
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            width: 17px;
            height: 17px;
            padding-top: 5px;
            padding-left: 8px;
            overflow: hidden;
            position: absolute;
            bottom: -1px;
            right: -1px;
            background: linear-gradient(to left top, #c62f2f 50%, transparent 50%);
            text-align: right;

            i{
              font-size: 12px;
              color: #ffffff;
              font-weight: bolder;
            }
          }
          .cat_sub_active{
            border-color: #c62f2f!important;
            .sub_active{
              opacity: 1;
            }
          }
        }
      }
    }
    .playlist_cat_hot{
      margin: 8px 0 15px 0;
    }
  }
  .playlist_main{

  }
}
</style>
