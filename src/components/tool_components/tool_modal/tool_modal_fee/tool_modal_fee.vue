<template>
  <div class="tool_modal_fee">
    <tool-modal :modal="modal">
      <div class="" v-if="type == '1'">

      </div>
      <div class="" v-if="type == '4'">
        版权方要求，当前专辑需单独付费，购买数字专辑即可无限畅想
      </div>
    </tool-modal>
  </div>
</template>

<script>
  export default {
    name: "tool_modal_fee",
    data() {
      return {
        modal: false,
        type: '4',
        data: {}
      }
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
