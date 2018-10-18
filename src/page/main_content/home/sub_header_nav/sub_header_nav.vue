<template>
  <div class="sub_header_nav">
    <div class="list">
      <div class="item" v-for="(item, index) in nav_data" :key="index" :class="{'active': active == index}">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
  import { sub_header_nav_data} from "./sub_header_nav_data";

  export default {
    name: "sub_header_nav",
    data() {
      return {
        nav_data: [],
        active: 0
      }
    },
    computed: {},
    components: {},
    created() {
      this.nav_data = this.$deepClone(sub_header_nav_data)
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
.sub_header_nav{
  width: 100%;
  height: 40px;
  background: #f5f5f7;
  border-bottom: 1px solid #e1e1e2;

  .list{
    display: flex;
    justify-content: center;
    height: 100%;

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
}
</style>
