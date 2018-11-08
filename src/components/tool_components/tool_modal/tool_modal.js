import toolModal from './tool_modal.vue'

toolModal.install = function (Vue) {
  Vue.component(toolModal.name, toolModal)
};


export {
  toolModal,
}
