<template>
  <div class="simi_singer_info">
    <div class="singer_info" v-for="(item, index) in data" :key="index" @click="singerInfoHandler(item)">
      <div class="avatar">
        <img :src="item.picUrl+'?param=500y500'" alt="">
      </div>
      <div class="name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  import { get_simi_artist} from "../../../server/common_api";

  export default {
    name: "simi_singer_info",
    data() {
      return {
        data: []
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
        this.get_simi_data();
      },
      get_simi_data(){
        let get_data = {
          id: this.$route.query.id || ''
        };
        get_simi_artist(get_data).then(res=>{
          this.data = res.artists;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      singerInfoHandler(data){
        this.$router.push({
          path: '/singer_detail_common',
          query: { id: data.id}
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
.simi_singer_info{
  padding: 0 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .singer_info{
    padding: 0 20px 40px 20px;
    cursor: pointer;
    .avatar{
      width: 120px;
      height: 120px;
      img{
        /*width: 100%;*/
        height: 100%;
      }
    }
    .name{
      margin-top: 10px;
      font-size: 12px;
      text-align: center;
      color: #666;
      &:hover{
        color: #111111;
      }
    }
  }
}
</style>
