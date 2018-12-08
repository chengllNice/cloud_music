<template>
  <div class="detail_info">
    <div class="no_detail" v-if="no_detail">暂无介绍</div>
    <div class="info" v-if="data.length" v-for="(item, index) in data" :key="index">
      <div class="title">{{item.ti}}</div>
      <div class="text" v-html="item.txt"></div>
    </div>
  </div>
</template>

<script>
  import { get_artist_desc} from "../../../server/common_api";

  export default {
    name: "detail_info",
    props: {

    },
    data() {
      return {
        data: [],
        no_detail: false
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.get_detail_info();
      },
      get_detail_info(){
        let get_data = {
          id: this.$route.query.id || ''
        };
        get_artist_desc(get_data).then(res=>{
          let result = res.introduction;
          result.forEach(item=>{
            item.txt = item.txt.replace(/\n/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
          });
          this.data = result;
          if(!result.length){
            this.no_detail = true;
          }else{
            this.no_detail = false;
          }
        }).catch(err=>{
          console.log('err', err)
        })
      }
    },
    watch: {
      '$route.query.id': function (new_val, old_val) {
        if(new_val){
          this.init();
        }
      }
    },
  }
</script>

<style lang="less" scoped>
.detail_info{
  padding: 0 30px;
  .no_detail{
    text-align: center;
  }
  .info{
    margin-bottom: 30px;
    .title{
      font-size: 14px;
      font-weight: bolder;
      color: #333333;
      margin-bottom: 10px;
    }
    .text{
      font-size: 14px;
      color: #666666;
      text-indent: 2em;
      line-height: 30px;
    }
  }
}
</style>
