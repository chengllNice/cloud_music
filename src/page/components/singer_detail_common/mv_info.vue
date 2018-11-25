<template>
  <div class="mv_info">
    <base-sing-list class="home_list" :list-data="mv_data"
                    :cols-num="mv_data.colsNum" @songlistClick="songlistClickHandler">
    </base-sing-list>
  </div>
</template>

<script>
  import { singer_mv_data} from "./singer_detail_data";
  import { get_artist_mv} from "../../../server/common_api";
  import { mapState } from 'vuex'

  export default {
    name: "mv_info",
    props: {
      tab_active: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        mv_data: {},
        page: {
          page: 1,
          pageSize: 20,
          total: 0
        },
        is_more: true,
        pageChange: true
      }
    },
    computed: {
      ...mapState(['device_info', 'scroll_info'])
    },
    components: {},
    created() {
      this.mv_data = this.$deepClone(singer_mv_data);
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.get_mv_data();
      },
      get_mv_data(){
        let get_data = {
          id: this.$route.query.id || '',
          limit: this.page.pageSize,
          offset: (this.page.page-1)*this.page.pageSize
        };
        get_artist_mv(get_data).then(res=>{
          let format_data = this.$uiconfigFormat(res.mvs,this.mv_data.uiconfig);
          format_data.forEach(item=>{
            item.width = '338';
            item.height = '189';
            item.duration = this.$timeFormat(item.duration);
          });
          this.$unitFormat(format_data, 'playCount');
          this.mv_data.data.push(...format_data);
          console.log(this.mv_data)
          this.is_more = res.hasMore;
          this.pageChange = true;
        }).catch(err=>{
          console.log('err',err)
        })
      },
      songlistClickHandler(data){
        this.$router.push({
          path: '/play_mv',
          query: { id: data.id}
        })
      },
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
        if(new_val >= 0.98 && this.pageChange && this.is_more && this.tab_active == '1'){
          this.pageChange = false;
          this.page.page++;
          this.get_mv_data();
        }
      },
    }
  }
</script>

<style lang="less" scoped>
.mv_info{
  padding: 0 30px;
}
</style>
