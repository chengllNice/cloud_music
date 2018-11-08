<template>
  <Modal v-model="modal" :width="width">
    <div slot="header">
      <slot name="header"></slot>
    </div>
    <div class="modal_body">
      <slot name="body"></slot>
    </div>
    <div slot="footer">
      <div v-if="footer">
        <Button>取消</Button>
        <Button type="primary">确定</Button>
      </div>
      <slot v-else name="footer"></slot>
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

<style scoped>

</style>
