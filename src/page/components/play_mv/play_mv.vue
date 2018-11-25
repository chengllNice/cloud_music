<template>
  <div class="play_mv">
    <div class="mv_main">
      <div class="main_left">
        <div class="mv_box">
          <div class="mv_title_info">
            <div class="back_icon" @click="go_back"><i class="iconfont icon-arrow_drop_left"></i></div>
            <div class="mv_icon" v-if="!type">MV</div>
            <div class="mv_name">{{mv_data.name}}</div>
            <div class="mv_singer" v-if="!type" v-for="(item, index) in mv_data.artists" :key="index">
              <span v-if="index != 0">/</span>
              <span>{{item.name}}</span>
            </div>
            <div class="mv_singer" v-if="type == '1' && mv_data.creator">
              {{mv_data.creator.nickname}}
            </div>
          </div>
          <div class="mv_play_box">
            <jplayer-mv :mv_url="mv_url" :data="mv_data" @changeBr="changeBr"></jplayer-mv>
            <div class="mv_opare_box">
              <div class="mv_opare">
                <div class="opare_item" @click="opareHandler('praise')">
                  <i class="iconfont icon-praise"></i>
                  <div>
                    <span>赞</span>
                    <span>({{mv_data.praisedCount || 0}})</span>
                  </div>
                </div>
                <div class="opare_item" @click="opareHandler('collection')">
                  <i class="iconfont icon-my_collections"></i>
                  <div>
                    <span>收藏</span>
                    <span>({{mv_data.subscribeCount || mv_data.subCount || 0}})</span>
                  </div>
                </div>
                <div class="opare_item" @click="opareHandler('shape')">
                  <i class="iconfont icon-shape"></i>
                  <div>
                    <span>分享</span>
                    <span>({{mv_data.shareCount || 0}})</span>
                  </div>
                </div>
                <div class="opare_item" @click="opareHandler('download')">
                  <i class="iconfont icon-download"></i>
                  <div>
                    <span>下载MV</span>
                  </div>
                </div>
              </div>
              <div class="opare_right">举报</div>
            </div>

            <!--<video src=""></video>-->
          </div>
        </div>
        <div class="mv_comment">
          <div class="title">评论 <span>({{mv_data.commentCount}})</span></div>
          <tool-comment :comment-all-data="commentData.comment" :comment-hot-data="commentData.hot" :pageData="pageData" @pageChange="pageChange" @submitComment="submitComment" :totalComment="pageData.total"></tool-comment>
        </div>
      </div>
      <div class="main_right">
        <div class="mv_info">
          <div class="title">
            <span v-if="type == '1'">视频介绍</span>
            <span v-else>MV介绍</span>
          </div>
          <div class="content">
            <div class="publish_play">
              <div class="publish_time">
                <span class="label">发布时间：</span>
                <span class="name">{{mv_data.publishTime}}</span>
              </div>
              <div class="play_count">
                <span class="label">播放次数：</span>
                <span class="name" v-if="mv_data.playCount">{{mv_data.playCount}}次</span>
              </div>
            </div>
            <div class="description">
              <div>{{mv_data.briefDesc}}</div>
              <div v-if="mv_data.desc">
                <span>简介：</span>
                {{mv_data.desc}}
              </div>
            </div>
            <div class="tags">
              <div class="label">标签：</div>
              <div class="name" v-for="(tag_item, tag_index) in mv_data.videoGroup" :key="tag_index">
                <span v-if="tag_index != '0'">/</span>
                <span class="tag_name">{{tag_item.name}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mv_simi_box">
          <div class="title">相关推荐</div>
          <div class="content">
            <div class="mv_simi_item" v-for="(item, index) in simi_mv_data" :key="index">
              <div class="mv_cover_img" @click="change_play_mv(item)">
                <img :src="item.cover" alt="">
                <div class="cover">
                  <i class="iconfont icon-left_video"></i>
                  <span>{{item.playCount}}</span>
                </div>
              </div>
              <div class="simi_mv_info">
                <div class="mv_name ellipsis_2">{{item.name}}</div>
                <div class="mv_duration">{{$timeFormat(item.duration)}}</div>
                <div class="mv_singer ellipsis_1">
                  <span v-for="(artists_item, artists_index) in item.artists" :key="artists_index">
                    <span v-if="artists_index != '0'">/</span><span v-if="type == '1'">by </span><span>{{artists_item.name}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    get_mv_url,
    get_mv_detail,
    get_mv_comment,
    get_mv_simi,
    get_video_url,
    get_video_detail,
    get_video_comment,
    get_video_simi,
    post_resource_like} from "../../../server/common_api";
  import jplayerMv from './jplayer_mv'

  export default {
    name: "play_mv",
    data() {
      return {
        mv_data: {},
        simi_mv_data: [],
        mv_id: '',
        type: '',
        mv_url: '',
        mv_br: 480,
        commentData: {
          hot: [],
          comment: []
        },
        pageData: {
          total: 0,
          page: 1,
          pageSize: 30
        },
      }
    },
    computed: {},
    components: {
      jplayerMv
    },
    created() {
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.mv_id = this.$route.query.id || '';
        this.type = this.$route.query.type || '';//1视频0mv
        this.pageData = {
          total: 0,
            page: 1,
            pageSize: 30
        };
        if(this.type == '1'){
          this.get_video_detail();
          this.get_video_simi();
          this.get_video_url();
          this.get_video_comment();
        }else{
          this.get_mv_detail();
          this.get_mv_simi();
          this.get_mv_url();
          this.get_mv_comment();
        }
      },
      get_mv_detail(id){
        let get_data = {
          mvid: this.mv_id
        };
        get_mv_detail(get_data).then(res=>{
          this.mv_data = res.data;
          this.$unitFormat(this.mv_data, 'playCount');
          // this.mv_url = res.data.brs['480'];
        }).catch(err=>{
          console.log('err',err)
        })
      },
      get_mv_url(id){
        let get_data = {
          id: this.mv_id,
          res: this.mv_br || 480
        };
        get_mv_url(get_data).then(res=>{
          // this.mv_url_data = res.data;
          this.mv_url = res.data.url;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      get_mv_simi(){
        let get_data = {
          mvid: this.mv_id
        };
        get_mv_simi(get_data).then(res=>{
          this.simi_mv_data = res.mvs;
          this.$unitFormat(this.simi_mv_data, 'playCount');
        }).catch(err=>{
          console.log('err',err)
        })
      },
      get_mv_comment(){
        let get_data = {
          id: this.mv_id,
          limit: this.pageData.pageSize,
          offset: (this.pageData.page-1)*this.pageData.pageSize
        };
        this.commentData.comment = [];
        this.commentData.hot = [];
        get_mv_comment(get_data).then(res=>{
          this.commentData.comment = res.comments;
          if(res.hotComments){
            this.commentData.hot = res.hotComments;
          }
          this.pageData.total = res.total;
          // this.header_tab_data[1].value = res.total
        }).catch(err=>{
          console.log('err',err)
        })
      },

      get_video_detail(id){
        let get_data = {
          id: this.mv_id
        };
        get_video_detail(get_data).then(res=>{
          this.mv_data = res.data;
          this.mv_data.playCount = res.data.playTime;
          this.mv_data.desc = res.data.description;
          this.mv_data.name = res.data.title;
          this.mv_data.brs = [];
          res.data.resolutions.forEach(item=>{
            let obj = {
              br: item.resolution
            };
            this.mv_data.brs.push(obj);
          });
          this.$unitFormat(this.mv_data, 'playCount');
          this.mv_data.publishTime = this.$timeFormat(this.mv_data.publishTime,'yy-mm-dd');
          console.log(this.mv_data)
          // this.mv_url = res.data.brs['480'];
        }).catch(err=>{
          console.log('err',err)
        })
      },
      get_video_url(id){
        let get_data = {
          id: this.mv_id,
          res: this.mv_br || 480
        };
        get_video_url(get_data).then(res=>{
          // this.mv_url_data = res.data;
          this.mv_url = res.urls[0].url;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      get_video_simi(){
        let get_data = {
          id: this.mv_id
        };
        get_video_simi(get_data).then(res=>{
          this.simi_mv_data = res.data;
          this.simi_mv_data.forEach(item=>{
            item.id = item.vid;
            item.playCount = item.playTime;
            item.cover = item.coverUrl;
            item.name = item.title;
            item.duration = item.durationms;
            item.artists = [];
            item.creator.forEach(item01=>{
              item.artists.push({
                name: item01.userName,
                id: item01.userId
              })
            });
          });
          this.$unitFormat(this.simi_mv_data, 'playCount');
        }).catch(err=>{
          console.log('err',err)
        })
      },
      get_video_comment(){
        let get_data = {
          id: this.mv_id,
          limit: this.pageData.pageSize,
          offset: (this.pageData.page-1)*this.pageData.pageSize
        };
        this.commentData.comment = [];
        this.commentData.hot = [];
        get_video_comment(get_data).then(res=>{
          this.commentData.comment = res.comments;
          if(res.hotComments){
            this.commentData.hot = res.hotComments;
          }
          this.pageData.total = res.total;
          // this.header_tab_data[1].value = res.total
        }).catch(err=>{
          console.log('err',err)
        })
      },

      change_play_mv(data){
        this.$router.push({
          path: 'play_mv',
          query: {
            id: data.id,
            type: data.type || ''
          }
        });
        this.init();
      },
      go_back(){
        this.$router.go(-1)
      },
      changeBr(data){
        this.mv_br = data.id;
        if(this.type == '1'){
          this.get_video_url();
        }else{
          this.get_mv_url();
        }
      },
      pageChange(page){
        this.pageData.page = page;
        if(this.type == '1'){
          this.get_video_comment();
        }else{
          this.get_mv_comment();
        }
      },
      submitComment(value){
        let post_data = {
          t: 1,
          type: this.type == '1' ? 5 : 1,
          id: this.$route.query.id,
          content: value
        };
        this.$commonApi.postSonglistComment(post_data).then(res=>{
          if(res.code == 200){
            this.$Message.success(res.msg);
            this.pageData.page = 1;
            this.getSonglistComment();
          }else{
            this.$Message.warning(res.msg)
          }
          console.log(res)
        }).catch(err=>{
          console.log(err)
          this.$Message.warning('需要登录')
          console.log('err',err)
        })
      },
      // 点赞、分享、下载
      opareHandler(type){
        let get_data = {
          type: this.type == '1' ? 5 : 1,
          t: 1,//1点赞，其他取消点赞
          id: this.mv_id
        };
        if(type == 'praise'){
          post_resource_like(get_data).then(res=>{

          }).catch(err=>{
            console.log('err',err)
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.play_mv{
  width: 100%;
  min-width: 970px;
  height: 100%;
  overflow: auto;
  background: #fafafa;
  .mv_main{
    padding: 25px 0 25px 0;
    width: 970px;
    margin: auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .main_left{
      width: 690px;
      .mv_box{
        .mv_title_info{
          display: flex;
          align-items: center;
          margin-bottom: 5px;
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
          .mv_opare_box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .mv_opare{
              display: flex;
              align-items: center;
              margin-top: 12px;
              .opare_item{
                border: 1px solid #e1e1e2;
                border-radius: 3px;
                padding: 2px 8px;
                font-size: 12px;
                color: #333333;
                display: flex;
                align-items: center;
                cursor: pointer;
                background: #ffffff;
                margin-right: 10px;
                &:hover{
                  background: #f5f5f7;
                }
                &>div{
                  display: flex;
                  align-items: center;
                  padding-left: 5px;
                }
                i{
                  font-size: 14px;
                  color: #333333;
                  &.icon-download{
                    font-weight: 600;
                  }
                }
              }
            }
            .opare_right{
              font-size: 12px;
              color: #666;
              text-decoration: underline;
              cursor: pointer;
              &:hover{
                color: #333333;
              }
            }
          }

        }
      }
      .mv_comment{
        margin-top: 50px;
        .title{
          color: #333333;
          font-size: 18px;
          /*font-weight: 600;*/
          border-bottom: 1px solid #e1e1e2;
          padding: 5px 0;
          span{
            font-size: 12px;
            color: #666;
          }
        }
        .comment{
          padding-left: 0;
          padding-right: 0;
        }
      }
    }
    .main_right{
      width: 255px;
      .title{
        font-size: 18px;
        border-bottom: 1px solid #e1e1e2;
        padding: 5px 0 5px 0;
        margin-bottom: 10px;
      }
      .mv_info{
        margin-bottom: 40px;
        .content{
          .publish_play{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: #666;
            .publish_time,.play_count{
              display: flex;
              align-items: center;
              color: #888;
            }
            .label{

            }
            .name{

            }
          }
          .description{
            color: #666;
            font-size: 12px;
            margin: 10px 0;
          }
          .tags{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            font-size: 12px;
            color: #666;
            margin: 25px 0 0 0;
            .name{
              .tag_name{
                color: #0c73c2;
                cursor: pointer;
                &:hover{
                  color: #0a63a8;
                }
              }
            }
          }
        }
      }
      .mv_simi_box{
        .content{
          .mv_simi_item{
            display: flex;
            margin-bottom: 12px;
            .mv_cover_img{
              position: relative;
              cursor: pointer;
              img{
                width: 120px;
              }
              .cover{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                color: #ffffff;
                background: linear-gradient(left, rgba(232,234,236,0.1), rgba(0,0,0,0.3));
                font-size: 12px;
                text-align: right !important;
                padding: 2px 5px;
                cursor: pointer;
                i{
                  font-size: 12px;
                  margin-right: 1px;
                }
                .icon-left_video{
                  font-size: 14px;
                }
              }
            }
            .simi_mv_info{
              font-size: 12px;
              padding-left: 15px;
              line-height: 16px;
              cursor: pointer;
              .mv_duration,.mv_singer{
                color: #888;
              }
            }
          }
        }
      }
    }
  }
}
</style>
