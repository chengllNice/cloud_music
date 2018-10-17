import baseButton from './base_button.vue'

baseButton.install = function (Vue) {
  Vue.component(baseButton.name, baseButton)
};

export {
  baseButton
}
