<template>
  <div class="banner">
    <div class="list_box">
      <div class="list_img_box">
        <transition v-for="(item, index) in banner_data" :key="index">
          <div class="item_img"
               @click="bannerGo(item)"
               :class="{ 'item_active' : index == item_active,
                'item_active_pre' : index == item_active_pre,
                'item_active_next' : index == item_active_next }"
                :style="{transform: 'translateX('+ (index == item_active_pre ? (-translate_x) + 'px' : (index == item_active_next ? (translate_x + 'px') : '0px')) +')'}">
            <img :src="item.imageUrl" :alt="item.typeTitle">
            <div class="item_cover" v-if="index != item_active"></div>
            <div class="img_type" :style="{background: item.titleColor}">{{item.typeTitle}}</div>
          </div>
        </transition>
      </div>
      <div class="list_opare_box">
        <div :class="{'opare_active' : (index+1) == (item_active == 0 ? '6' : item_active)}"
             v-for="(item, index) in banner_data"
             :key="index"
              @click="opare_click(index)"></div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapState } from 'vuex'
  export default {
    name: "banner",
    props: {
      listData: {
        type: Array,
        default: []
      }
    },
    data(){
      return {
        item_active: 1,
        translate_x: '0',
        interval: null
        // item_active_pre: 0,
        // item_active_next: 2
      }
    },
    computed: {
      ...mapState(['device_info']),
      banner_data(){
        return this.listData;
      },
      item_active_pre(){
        let result = 0;
        if(this.item_active == 0){
          result = this.banner_data.length-1;
        }else{
          result = this.item_active - 1;
        }
        return result;
      },
      item_active_next(){
        let result = 2;
        if(this.item_active == this.banner_data.length-1){
          result = 0;
        }else{
          result = this.item_active + 1;
        }
        return result;
      }
    },
    components: {

    },
    created(){

    },
    mounted(){
      this.init();
      let vue = this;
      /*window.onresize = ()=>{
        vue.get_init();
      }*/
    },
    methods: {
      init(){
        let vue = this;
        this.get_init();
        clearInterval(this.interval);
        this.interval = setInterval(function () {
          vue.play();
        },4000)
      },
      get_init(){
        let h = 0;
        h = ($('.list_img_box').width() - 408) / 2;
        // console.log(h,'==========')
        this.translate_x = h;
      },
      play(){
        this.item_active++;
        if(this.item_active >= this.banner_data.length){
          this.item_active = 0;
        }
      },
      opare_click(index){
        if(index == 5){
          this.item_active = 0;
        }else{
          this.item_active = index+1;
        }
        this.init();
      },
      async bannerGo(data){
        if(data.url){
          window.open(data.url,'_blank')
        }else if(data.targetType == 10){//专辑
          this.$router.push({
            path: '/album_detail_common',
            query: { id: data.targetId}
          })
        }else if(data.targetType == 1004){//mv
          this.$router.push({
            path: '/play_mv',
            query: { id: data.targetId, type: 0}
          })
        }else if(data.targetType == 1){//单曲
          await this.get_music_detail(data.targetId);
          await this.get_music_url(data.targetId);
        }
      },
      async get_music_url(id){
        let get_data = {
          id: id
        };
        this.$commonApi.getSongUrl(get_data).then(res=>{
          if(res.data && res.data.length){
            let url = res.data[0].url;
            let info = {
              id: id,
              url: url,
              playStatus: 'play',
            };
            this.$store.commit('get_music_info',info);
          }
        }).catch(err=>{
          console.log('err',err)
        });
      },
      async get_music_detail(id){
        let get_data = {
          ids: id
        };
        let source_path = this.$route.path;
        let data = {};
        this.$commonApi.getSongDetail(get_data).then(res=>{
          let data = res.songs[0];
          let info = {
            picUrl: data.al.picUrl,
            song_name: data.name,
            artists: data.ar,
            album: data.al,
            alias: data.alia,
            source_path: { path: source_path, id: ''},
            data: {
              album_name: data.al,
              alias: data.alia,
              artists: data.ar,
              duration: this.$timeFormat(data.dt),
              id: id,
              maxbr: res.privileges[0].maxbr,
              mvid: data.mv,
              picUrl: data.al.picUrl,
              playStatus: "play",
              privilege: res.privileges[0],
              song_name: data.name,
              sort_num: "01",
              source_path: { path: source_path, id: ''},
            }
          };
          this.$store.commit('get_music_info',info);
        }).catch(err=>{
          console.log('err',err)
        })
      }
    },
    watch: {
      'device_info.clientWidth': function (new_val, old_val) {
        this.init();
      }
    }
  }
</script>

<style lang="less" scoped>
.banner{
  width: 100%;
  /*margin-top: 20px;*/
  .list_box{
    position: relative;
    min-width: 764px;
    max-width: 1040px;
    margin: auto;
    padding-bottom: 15px;
    .list_img_box{
      height: 200px;
      position: relative;
      .item_img{
        cursor: pointer;
        width: 408px;
        height: 192px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: -1;
        transform: translateX(0px);
        /*transition: transform 10s cubic-bezier(0,0,0.58,1), width 8s cubic-bezier(0,0,0.58,1), height 8s cubic-bezier(0,0,0.58,1), z-index 7s cubic-bezier(0,0,0.58,1);*/
        transition: transform 0.4s cubic-bezier(0,0,0.58,1), width 0.2s cubic-bezier(0,0,0.58,1), height 0.2s cubic-bezier(0,0,0.58,1), z-index 0.25s cubic-bezier(0,0,0.58,1);
        /*transition-property: transform,width,height;*/
        img{
          width: 100%;
          height: 100%;
        }
        .item_cover{
          color: #fff;
          font-size: 50px;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          transition: all 4.2s;
        }
        .img_type{
          cursor: pointer;
          position: absolute;
          right: -2px;
          bottom: 10px;
          padding: 1px 8px;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          color: #FFFFFF;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .item_active{
        width: 540px;
        height: 200px;
        z-index: 10;
        transform: translateX(0px);
      }
      .item_active_pre{
        z-index: 9;
        .item_cover{
          background: #000;
          opacity: 0.7;
        }
        /*transform: translateX(-200px) !important;*/
      }
      .item_active_next{
        z-index: 9;
        .item_cover{
          background: #000;
          opacity: 0.7;
        }
        /*transform: translateX(calc(50%)) !important;*/
        /*transform: translateX(calc(50% - 204px)) !important;*/
      }
    }
    .list_opare_box{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      &>div{
        width: 16px;
        height: 2.4px;
        background: #c8c8c8;
        margin: 0 3px;
      }
      .opare_active{
        background: #c62f2f;
      }
    }
  }
}
</style>
