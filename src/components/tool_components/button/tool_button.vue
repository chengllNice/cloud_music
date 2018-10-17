<template>
  <div class="tool_button">
    <base-button>
      <div class="" v-if="type == 'icon'"></div>
    </base-button>
  </div>
</template>

<script>
  export default {
    name: "tool_button",
    props: {
      type: {
        type: String,
        default: '' //icon 纯图标  beforeicon 图标在前 aftericon 图标在后
      },
      iconClass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>

</style>
