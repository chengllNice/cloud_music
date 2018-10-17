<template>
  <div class="cl_input">
    <Input v-model="value"
           :placeholder="data.placeholder || ''"
           :clearable="data.clearable || false"
           :icon="data.icon || ''"/>
  </div>
</template>

<script>
  export default {
    name: "clInput",
    props: {
      data: {
        type: Object,
        default: function () {
          return {
            name: '',
            placeholder: ''
          }
        }
      },
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        input_value: ''
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
      this.init_input_value();
    },
    methods: {
      init_input_value(){
        if(this.input_value != this.value){
          this.input_value = this.value;
        }
      }
    },
    watch: {
      'input_value': function () {

      },
      'value': function () {
        this.init_input_value();
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
