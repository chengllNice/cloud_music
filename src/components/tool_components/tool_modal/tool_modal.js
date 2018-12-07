import toolModal from './tool_modal.vue'
import toolModalFee from './tool_modal_fee/tool_modal_fee.js'

toolModal.install = function (Vue) {
  Vue.component(toolModal.name, toolModal)
};


export {
  toolModal,
  toolModalFee
}
