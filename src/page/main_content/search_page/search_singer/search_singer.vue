<template>
  <div class="search_singer">
    <base-table :data="search_singer_data.data"
                :config="search_singer_data.config"
                @dbclick="tableClick"
                @pageChange="pageChange"
                stripe="stripe">
      <template slot="name" slot-scope="data">
        <div class="singer_box">
          <div class="singer_img">
            <img :src="data.data.picUrl+'?param=512y512'" alt="">
          </div>
          <div class="singer_info">
            <span class="name">{{data.data.name}}</span>
            <span class="name_alia" v-if="data.data.alias && data.data.alias.length">({{data.data.alias[0]}})</span>
            <span class="account" v-if="data.data.accountId">
              <i class="iconfont icon-tab_personal"></i>
            </span>
          </div>
        </div>
      </template>
    </base-table>
  </div>
</template>

<script>
  import searchPageMixin from '../search_page_mixin.vue'

  export default {
    name: "search_singer",
    data(){
      return {}
    },
    mixins: [searchPageMixin],
    computed: {

    },
    created(){
      this.search_type = '100';
    },
    mounted(){

    },
    methods: {
      tableClick(data){

      },
      pageChange(page){
        this.search_singer_data.data.t_body = [];
        this.pageData.page = this.search_singer_data.data.t_page.page = page;
        this.get_search();
      }
    }
  }
</script>

<style lang="less" scoped>
  .search_singer{
    .singer_box{
      display: flex;
      align-items: center;
      padding: 10px 30px;
      *{
        cursor: pointer;
      }
      .singer_img{
        width: 40px;
        height: 40px;
        margin-right: 10px;
        img{
          width: 100%;
        }
      }
      .singer_info{
        display: flex;
        align-items: center;
        .name_alia{
          color: #888;
        }
        .account{
          width: 15px;
          height: 15px;
          border: 1px solid #ebc1c1;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 5px;

          &:hover{
            background: #dadbdc;
          }
          i{
            font-size: 12px;
            transform: scale(0.8);
            color: #c62f2f;
          }
        }
      }
    }
  }

</style>
