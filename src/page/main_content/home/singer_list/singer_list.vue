<template>
  <div class="singer_list">
    <div class="singer_cat">
      <tool-filter-select :data="songer_cat_language" :type="true" @click="languageFilterHandler"></tool-filter-select>
      <tool-filter-select :data="songer_cat_sub" :type="true" @click="subFilterHandler"></tool-filter-select>
      <tool-filter-select :data="songer_cat_select" :type="true" @click="selectFilterHandler"></tool-filter-select>
    </div>
    <div class="">
      <base-sing-list :list-data="songer_data"
                      :cols-num="songer_data.colsNum" @songlistClick="songlistClickHandler">
      </base-sing-list>
    </div>
  </div>
</template>

<script>
  import {
    songer_cat_language,
    songer_cat_select,
    songer_cat_sub,
    songer_data} from "./singer_list_data";
  import {get_top_artists, get_artists_list} from "../../../../server/home";
  import { mapState} from 'vuex'

  export default {
    name: "singer_list",
    data() {
      return {
        songer_cat_language: [],
        songer_cat_select: [],
        songer_cat_sub: [],
        language_value: '10',
        select_value: '',
        sub_value: '01',
        songer_data: {},
        page: {
          page: 1,
          pageSize: 100,
          total: 0
        },
        pageChange: true,
        is_songer_more: true,//是否还有更多歌手，继续请求
      }
    },
    computed: {
      ...mapState(['device_info', 'scroll_info'])
    },
    components: {},
    created() {
      this.songer_cat_language = this.$deepClone(songer_cat_language);
      this.songer_cat_select = this.$deepClone(songer_cat_select);
      this.songer_cat_sub = this.$deepClone(songer_cat_sub);
      this.songer_data = this.$deepClone(songer_data);
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.get_top_artists();
        // this.get_artists_list();
      },
      get_top_artists() {
        let get_data = {
          limit: this.page.pageSize,//每页显示数量
          offset: (this.page.page-1) * this.page.pageSize,//分页
        };
        get_top_artists(get_data).then(res => {
          let format_data = this.$uiconfigFormat(res.artists,this.songer_data.uiconfig);
          this.songer_data.data.push(...format_data);
          this.is_songer_more = res.more;
          this.pageChange = true;
          // this.loading = false;
        }).catch(err => {
          console.log('err', err)
        })
      },
      get_artists_list(){
        let get_data = {
          cat: this.language_value + this.sub_value,
          limit: this.page.pageSize,//每页显示数量
          offset: (this.page.page-1) * this.page.pageSize,//分页
          initial: this.select_value
        };
        get_artists_list(get_data).then(res => {
          let format_data = this.$uiconfigFormat(res.artists,this.songer_data.uiconfig);
          this.songer_data.data.push(...format_data);
          this.is_songer_more = res.more;
          // this.this.language_value + this.sub_value
          this.pageChange = true;
        }).catch(err => {
          console.log('err', err)
        })
      },
      languageFilterHandler(data){
        this.language_value = data.id;
        this.page.page = 1;
        this.songer_data.data = [];
        this.get_artists_list();
      },
      subFilterHandler(data){
        this.sub_value = data.id;
        this.page.page = 1;
        this.songer_data.data = [];
        this.get_artists_list();
      },
      selectFilterHandler(data){
        this.select_value = data.id;
        this.page.page = 1;
        this.songer_data.data = [];
        if(this.select_value == 'hot'){
          this.get_top_artists();
          this.select_value = ''
        }else{
          this.get_artists_list();
        }
      },
      songlistClickHandler(data){
        this.$router.push({
          path: '/singer_detail_common',
          query: { id: data.id}
        })
      }
    },
    watch: {
      'scroll_info.process': function (new_val, old_val) {
        if(new_val >= 0.98 && this.pageChange && this.is_songer_more){
          this.pageChange = false;
          // this.page.page++;
          // this.get_artists_list();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .singer_list{
    .singer_cat{

    }
  }

</style>
