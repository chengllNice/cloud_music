<template>
  <div class="search_user">
    <base-table :data="search_user_data.data"
                :config="search_user_data.config"
                @dbclick="tableClick"
                @pageChange="pageChange"
                stripe="stripe">
      <template slot="name" slot-scope="data">
        <div class="name_box">
          <div class="user_box">
            <div class="user_img">
              <img :src="data.data.avatarUrl+'param=512y512'" alt="">
            </div>
            <div class="user_info">
              <span class="name">{{data.data.name}}</span>
              <span class="gender">
                <i v-if="data.data.gender" class="iconfont icon-sex_men"></i>
                <i v-else class="iconfont icon-sex_women"></i>
              </span>
            </div>
          </div>
          <div class="signature ellipsis_1">{{data.data.signature}}</div>
        </div>
      </template>
    </base-table>
  </div>
</template>

<script>
  import searchPageMixin from '../search_page_mixin.vue'

  export default {
    name: "search_user",
    data(){
      return {}
    },
    mixins: [searchPageMixin],
    computed: {

    },
    created(){
      this.search_type = '1002';
    },
    mounted(){

    },
    methods: {
      tableClick(data){

      },
      pageChange(page){
        this.search_user_data.data.t_body = [];
        this.pageData.page = this.search_user_data.data.t_page.page = page;
        this.get_search();
      }
    }
  }
</script>

<style lang="less" scoped>
.search_user{
  padding-bottom: 20px;
  .name_box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user_box{
      display: flex;
      align-items: center;
      padding: 10px 30px;
      *{
        cursor: pointer;
      }
      .user_img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        img{
          width: 100%;
        }
      }
      .user_info{
        display: flex;
        align-items: center;
        .gender{
          margin-left: 5px;
          .icon-sex_men{
            color: #1379ab;
            font-size: 10px;
          }
          .icon-sex_women{
            color: #e494d2;
            font-size: 12px;
          }
        }
      }
    }
    .signature{
      flex: 1;
      text-align: right;
      padding: 0 20px;
    }
  }

}
</style>
