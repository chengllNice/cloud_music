<template>
  <div class="comment">
    <div class="comment_textarea">
      <div class="textarea_box" @click="textareaBoxClick">
        <textarea v-model="comment_value" name="" id="" class="textarea_el" rows="3" @keyup.enter="submitComment"></textarea>
        <!--<Input v-model="comment_value" type="textarea" :autosize="{minRows: 2}" />-->
        <div class="comment_limit" :class="{'comment_limit_over': comment_limit < 0}">{{comment_limit}}</div>
      </div>
      <div class="comment_opear">
        <div class="comment_opear_left">
          <i class="iconfont icon-smiling_face1"></i>
          <i class="iconfont icon-at"></i>
          <i class="iconfont icon-well"></i>
        </div>
        <div class="submit_comment" @click="submitComment">评论</div>
      </div>
    </div>
    <div class="comment_main">
      <div class="comment_hot" v-if="commentHot.length">
        <div class="comment_title">
          精彩评论
        </div>
        <div class="comment_list">
          <div class="comment_item" v-for="(comment_item, comment_index) in commentHot" :key="comment_index">
            <div class="comment_img">
              <img :src="comment_item.user.avatarUrl" alt="">
            </div>
            <div class="comment_content">
              <div class="comment_info">
                <span class="name">{{comment_item.user.nickname}}:</span>
                <span class="content">{{comment_item.content}}</span>
              </div>
              <div class="comment_beReplied_info" v-for="(replied_item, replied_index) in comment_item.beReplied" :key="replied_index" v-if="comment_item.beReplied.length">
                <span class="name">@{{replied_item.user.nickname}}:</span>
                <span class="content">{{replied_item.content}}</span>
              </div>
              <div class="comment_content_bottom">
                <div class="comment_time">{{comment_item.time}}</div>
                <div class="comment_item_opare">
                  <span class="report">举报</span>
                  <span><i class="iconfont icon-praise"></i> <span v-if="comment_item.likedCount">({{comment_item.likedCount}})</span></span>
                  <span>分享</span>
                  <span>回复</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="comment_all" v-if="totalComment">
        <div class="comment_title">
          最新评论<span v-if="pageData.total">({{pageData.total}})</span>
        </div>
        <div class="comment_list">
          <div class="comment_item" v-for="(comment_item, comment_index) in commentAll" :key="comment_index">
            <div class="comment_img">
              <img :src="comment_item.user.avatarUrl" alt="">
            </div>
            <div class="comment_content">
              <div class="comment_info">
                <span class="name">{{comment_item.user.nickname}}:</span>
                <span class="content">{{comment_item.content}}</span>
              </div>
              <div class="comment_beReplied_info" v-for="(replied_item, replied_index) in comment_item.beReplied" :key="replied_index" v-if="comment_item.beReplied.length">
                <span class="name">@{{replied_item.user.nickname}}:</span>
                <span class="content">{{replied_item.content}}</span>
              </div>
              <div class="comment_content_bottom">
                <div class="comment_time">{{comment_item.time}}</div>
                <div class="comment_item_opare">
                  <span class="report">举报</span>
                  <span><i class="iconfont icon-praise"></i> <span v-if="comment_item.likedCount">({{comment_item.likedCount}})</span></span>
                  <span>分享</span>
                  <span>回复</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="no_comment" v-else>还没有评论，快来抢沙发~</div>

      <div class="pagination">
        <tool-page :pageData="pageData" @pageChange="pageChange"></tool-page>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "toolComment",
    props: {
      commentAllData: {
        type: Array,
        default: []
      },
      commentHotData: {
        type: Array,
        default: []
      },
      pageData:{
        type: Object,
        default: function () {
          return {}
        }
      },
      totalComment: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        comment_value: '',
        loading: true
      }
    },
    computed: {
      comment_limit(){
        let result = 140;
        result = result - this.comment_value.length;
        return result;
      },
      commentAll(){
        let result = this.commentAllData;
        result.forEach(item=>{
          let time = this.$timeFormat(item.time, 'comment');
          this.$setObjectValue(item, 'time', time)
        });
        return result;
      },
      commentHot(){
        let result = this.commentHotData;
        result.forEach(item=>{
          let time = this.$timeFormat(item.time, 'comment');
          this.$setObjectValue(item, 'time', time)
        });
        return result;
      }
    },
    components: {

    },
    created() {
    },
    mounted() {
    },
    methods: {
      textareaBoxClick(){

      },
      submitComment(){
        let value = this.comment_value;
        this.$emit('submitComment', value)
      },
      pageChange(page){
        this.$emit('pageChange', page)
      }
    }
  }
</script>

<style lang="less" scoped>
  .comment{
    padding: 0 30px;
    padding-top: 20px;
    .comment_textarea{
      background: #f0f0f2;
      padding: 10px;
      .textarea_box{
        position: relative;
        border: 1px solid #e1e1e2;
        background: #ffffff;
        overflow: hidden;
        .textarea_el{
          width: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 4px 10px;
          font-size: 12px;
          color: #666;
          border: none;
        }
        .comment_limit{
          width: 100%;
          text-align: right;
          font-size: 12px;
          padding-right: 5px;
          /*position: absolute;
          bottom: 0;
          right: 0;*/
          color: #999;
        }
        .comment_limit_over{
          color: #cd1818;
        }
      }
      .comment_opear{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 6px;
        .submit_comment{
          padding: 2px 10px;
          color: #333333;
          background: #ffffff;
          border-radius: 3px;
          border: 1px solid #e1e1e2;
          cursor: pointer;
          font-size: 13px;
          &:hover{
            background: #f5f5f7;
          }
        }
        .comment_opear_left{
          display: flex;
          align-items: center;
          &>*{
            margin-right: 10px;
            cursor: pointer;
            color: #898989;
            &:hover{
              color: #333;
            }
          }
          .icon-at{
            font-weight: 100;
            font-size: 19px;
          }
          .icon-smiling_face1{
            font-weight: 600;
            font-size: 16px;
          }
          .icon-well{
            font-weight: 600;
            font-size: 16px;
          }
        }

      }
    }
    .comment_main{
      padding-top: 20px;
      .no_comment{
        color: #888;
        text-align: center;
      }
      .comment_hot{

      }
      .comment_all{
        padding-top: 20px;
      }
      .comment_title{
        font-size: 12px;
        padding: 20px 0 10px 0;
      }
      .comment_list{
        .comment_item{
          border-top: 1px solid #efefef;
          display: flex;
          padding: 12px 0;
          &:hover{
            .report{
              opacity: 1!important;
            }
          }
          .comment_img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 1px solid #eeefee;
            overflow: hidden;
            margin-right: 12px;
            cursor: pointer;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .comment_content{
            width: 100%;
            font-size: 12px;
            .comment_info,.comment_beReplied_info{
              .name{
                color: #0c73c2;
              }
              .content{
                color: #333333;
              }
            }
            .comment_beReplied_info{
              background: #f1f1f4;
              padding: 8px 10px;
            }
            .comment_content_bottom{
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 5px;
              .comment_time{
                color: #999999;
              }
              .comment_item_opare{
                color: #999999;
                *{
                  cursor: pointer;
                }
                &>span{
                  border-right: 1px solid #ceccd4;
                  padding: 0 10px;
                  &:nth-of-type(1){
                    opacity: 0;
                    transition: all 0.3s;
                  }
                  &:nth-last-of-type(1){
                    border: none;
                  }
                }
                i{
                  color: #999999;
                  font-size: 14px;
                }
              }
            }

          }

        }
      }
    }
  }
</style>
<style lang="less">
  .comment{
    textarea.ivu-input{
      outline: none;
      /*width: calc(100% + 7px);*/
      max-width: none;
      border-width: 0px;
      border-radius: 0;
    }
  }
</style>
