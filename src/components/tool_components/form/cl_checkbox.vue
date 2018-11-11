<template>
  <div class="cl_checkbox">
    <Checkbox v-model="value" @on-change="changeHandler">{{name}}</Checkbox>
  </div>
</template>

<script>
  export default {
    name: "clCheckbox",
    props: {
      name: {
        type: String,
        default: ''
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      changeHandler(){

      }
    }
  }
</script>

<style lang="less">
  .cl_checkbox{
    .ivu-checkbox-checked .ivu-checkbox-inner{
      background: #ea4848;
      border-color: #ea4848;
    }
  }

</style>
