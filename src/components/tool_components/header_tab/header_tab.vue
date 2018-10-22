<template>
  <div class="sub_header_nav">
    <div class="list" :class="classes">
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
      type: {
        type: String,
        default: 'center',//类型  左left中center右right
      },
      clType: {
        type: String,
        default: '',//类型  左left中center右right
      }
    },
    data() {
      return {
        header_tab: [],
        active_tab: 0,
      }
    },
    computed: {
      classes () {
        return [
          {
            'list_left': this.type === 'left',
            'list_right': this.type === 'right',
            'three_tab': this.clType === 'three_tab',
          }
        ];
      },
    },
    components: {},
    created() {
      this.header_tab = this.$deepClone(this.data);
    },
    mounted() {
      this.router_changeMatch();
    },
    methods: {
      router_changeMatch() {
        let path = this.$route.path.split('/')[2];
        for (let index = 0; index < this.header_tab.length; index++) {
          let tab = this.header_tab[index].path.split('/')[2];
          if (path === tab) {
            this.active_tab = index;
            break;
          }
        }
      },
      navClick(item, index){
        this.active_tab = index;
        this.$router.push({
          path: item.path,
        })
      }
    },
    watch: {
      '$route': function (to, from) {
        this.router_changeMatch();
      }
    }
  }
</script>

<style lang="less" scoped>
.sub_header_nav{
  width: 100%;
  height: 40px;
  background: #fafafa;
  border-bottom: 1px solid #e1e1e2;
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
    .item{
      margin: 0 22px 0 0;
      color: rgba(102,102,102,1);
      padding: 13px 0;
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
