<template>
  <Modal v-model="modal" :width="width" :footer-hide="true">
    <div class="modal_header">
      <slot name="header"></slot>
    </div>
    <div class="modal_body">
      <slot name="body"></slot>
    </div>
    <div class="modal_footer">
      <slot v-if="$slots.footer" name="footer"></slot>
      <div v-else-if="nofooter"></div>
      <div v-else>
        <Button>取消</Button>
        <Button type="primary">确定</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "toolModal",
    props: {
      modal: {
        type: Boolean,
        default: false
      },
      width: {
        type:String,
        default: "500"
      },
      nofooter: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {

      }
    },
    created(){

    },
    mounted(){

    },
    methods: {
      sureClick(){

      },
      cancel(){

      }
    }
  }
</script>

<style lang="less">
.ivu-modal-body{
  padding: 0!important;
}
</style>
