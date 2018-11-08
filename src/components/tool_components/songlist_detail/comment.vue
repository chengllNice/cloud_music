<template>
  <div class="comment">
    <div class="comment_textarea">
      <div class="textarea_box" @click="textareaBoxClick">
        <textarea v-model="comment_value" name="" id="" class="textarea_el" rows="3"></textarea>
        <!--<Input v-model="comment_value" type="textarea" :autosize="{minRows: 2}" />-->
        <div class="comment_limit">{{comment_limit}}</div>
      </div>
      <div class="comment_opear">
        <i class="iconfont icon-smiling_face1"></i>
        <i class="iconfont icon-at"></i>
        <i class="iconfont icon-well"></i>
      </div>
    </div>
    <div class="comment_main">
      <div class="comment_title">
        最新评论<span>(32)</span>
      </div>
      <div class="comment_list">
        <div class="comment_item" v-for="(comment_item, comment_index) in commentData.comment" :key="comment_index">
          <div class="comment_img">
            <img :src="comment_item.user.avatarUrl" alt="">
          </div>
          <div class="comment_content">
            <div class="comment_info">
              <span class="name">{{comment_item.user.nickname}}:</span>
              <span class="content">{{comment_item.content}}</span>
            </div>
            <div class="comment_beReplied_info" v-for="(replied_item, replied_index) in comment_item.beReplied" :key="replied_index">
              <span class="name">{{replied_item.user.nickname}}:</span>
              <span class="content">{{replied_item.content}}</span>
            </div>
            <div class="comment_content_bottom">
              <div class="comment_time">{{comment_item.time}}</div>
              <div class="comment_item_opare">
                <span>举报</span>
                <span><i class="iconfont icon-praise"></i> <span>({{2}})</span></span>
                <span>分享</span>
                <span>回复</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "comment",
    props: {
      data: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        comment_value: '',
        comment_limit: 140
      }
    },
    computed: {
      commentData(){
        let result = this.data;
        this.data.comment.forEach(item=>{
          let time = this.$timeFormat(item.time, 'comment');
          console.log(time)
          this.$setObjectValue(item, 'time', time)
        });
        return result;
      }
    },
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      textareaBoxClick(){

      }
    }
  }
</script>

<style lang="less" scoped>
.comment{
  padding: 0 30px;
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
        /*position: absolute;
        bottom: 0;
        right: 0;*/
        color: #999;
      }
    }
    .comment_opear{
      display: flex;
      align-items: center;
      margin-top: 6px;
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
  .comment_main{
    padding-top: 20px;
    .comment_title{
      font-size: 12px;
      padding: 10px 0;
    }
    .comment_list{
      .comment_item{
        border-top: 1px solid #efefef;
        display: flex;
        padding: 12px 0;
        .comment_img{
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;
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
              &>span{
                border-right: 1px solid #ceccd4;
                padding: 0 10px;
              }
              i{
                color: #999999;
                font-size: 12px;
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
