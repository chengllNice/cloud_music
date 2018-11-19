<template>
  <div class="cl_input">
    <Input v-model="input_value"
           :search="search"
           :placeholder="data.placeholder || ''"
           :clearable="data.clearable || false"
           :icon="data.icon || ''"
           @on-enter="enter"
           @on-click="iconClick"/>
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
      },
      search: {
        type: Boolean,
        default: false
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
      },
      enter(){
        this.$emit('enter', this.input_value)
      },
      iconClick(){
        this.$emit('iconClick', this.input_value)
      },
    },
    watch: {
      'input_value': function (new_val, old_val) {
        this.$emit('input', new_val)
      },
      'value': function () {
        this.init_input_value();
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
