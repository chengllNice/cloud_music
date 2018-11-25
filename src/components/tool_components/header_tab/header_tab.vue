<template>
  <div class="sub_header_nav">
    <div class="iview_tab" v-if="tabType == 'iview_tab'">
      <ButtonGroup size="small">
        <Button v-for="(item, index) in header_tab" :key="index"
                :class="{'tab_active': active_tab == index}"
                @click="navClick(item, index)">{{item.name}}</Button>
      </ButtonGroup>
    </div>

    <div class="iview_tab_song" v-else-if="tabType == 'iview_tab_song'">
      <div class="item" :class="{'active': active_tab == index}" v-for="(item, index) in header_tab" :key="index" @click="navClick(item, index)">{{item.name}} <span v-if="item.value">({{item.value}})</span></div>
      <div class="right_slot">
        <slot></slot>
      </div>
    </div>

    <div class="list" v-else :class="classes">
      <div class="item"
           v-for="(item, index) in header_tab"
           :key="index"
           @click="navClick(item, index)"
           :class="{'active': active_tab == index}">
        {{item.name}}
      </div>
      <div class="right_slot">
        <slot></slot>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "headerTab",
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      tabType: {
        type: String,
        default: '',//类型  左left中center右right
      },
      type: {
        type: String,
        default: 'center',//类型  左left中center右right
      }
    },
    data() {
      return {
        // header_tab: [],
        active_tab: 0,
      }
    },
    computed: {
      header_tab(){
        let result = this.$deepClone(this.data);
        return result;
      },
      classes () {
        return [
          {
            'list_left': this.type === 'left',
            'list_right': this.type === 'right',
            'three_tab': this.tabType === 'three_tab',
          }
        ];
      },
    },
    components: {},
    created() {

    },
    mounted() {
      this.router_changeMatch();
    },
    methods: {
      router_changeMatch() {
        let path_arr = this.$route.path.split('/');
        let path = path_arr.pop();
        let params = this.$route.params;
        if(JSON.stringify(params) != '{}' && !this.tabType){
          Object.keys(params).forEach(key=>{
            let index = path_arr.indexOf(params[key]);
            path = path_arr.splice(index,1)[0];
          })
        }
        for (let index = 0; index < this.header_tab.length; index++) {
          if(!this.header_tab[index].path){
            return
          }
          let tab = this.header_tab[index].path.split('/').pop();
          if(path === tab){
            this.active_tab = index;
            break;
          }
        }
      },
      navClick(item, index){
        this.active_tab = index;
        let query = this.$route.query;
        if(item.path){
          this.$router.push({
            path: item.path,
            query: query
          });
        }
        this.$emit('tabClick', item);
      }
    },
    watch: {
      '$route': function (to, from) {
        // this.router_changeMatch();
      }
    }
  }
</script>

<style lang="less" scoped>
.sub_header_nav{
  width: 100%;
  height: 40px;
  background: #fafafa;

  .iview_tab{
    .ivu-btn{
      padding: 3px 30px;
      background: #ffffff;
      color: rgba(136,136,136,1);
      border-color: rgba(229,229,229,1);
      outline: none;
      box-shadow: 0 0 0 transparent!important;
      &:nth-of-type(1){
        border-right: none!important;
      }
      &:nth-of-type(2){
        border-left: none!important;
      }
      &:hover{
        background: #f5f5f7;
        color: rgba(102,102,102,1);
        border-color: rgba(220,220,221,1);
        padding: 3px 30px;
      }
      &.tab_active{
        background: rgba(124,125,133,1);
        color: rgba(226,226,228,1);
        border-color: rgba(124,125,133,1);
      }
    }
  }

  .iview_tab_song{
    height: 100%;
    display: flex;
    align-items: flex-end;
    position: relative;
    .item{
      border: 1px solid #e1e1e2;
      color: #333333;
      margin-right: 5px;
      padding: 0 15px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      font-size: 12px;
      cursor: pointer;
      border-bottom: none;
      span{
        cursor: pointer;
      }
      &:hover{
        background: #f5f5f7;
      }
      &.active{
        color: #ffffff;
        background: #c62f2f;
      }
    }
  }


  .list_right{
    display: flex;
    justify-content: right!important;
  }
  .list_left{
    display: flex;
    justify-content: left!important;
  }
  .list{
    display: flex;
    justify-content: center;
    height: 100%;
    position: relative;
    border-bottom: 1px solid #e1e1e2;

    .item{
      margin: 0 22px;
      padding: 10px 0;
      color: #333333;
      font-size: 14px;
      cursor: pointer;
      margin-bottom: -1px;
      &:hover{
        color: #c62f2f;
      }
    }
    .active{
      border-bottom: 1.5px solid #c62f2f;
      color: #c62f2f;
    }
  }

  .three_tab{
    border-bottom: 1px solid rgba(225,225,226,1);
    .item{
      margin: 0 22px -1px 0;
      color: rgba(102,102,102,1);
      padding: 0;
      /*padding: 13px 0;*/
      &:hover{
        color: rgba(51,51,51,1);
      }
    }
    .active{
      border-bottom: 1.5px solid rgba(135,135,135,1);
      color: rgba(51,51,51,1);
    }
  }

  .right_slot{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
  }
}
</style>
