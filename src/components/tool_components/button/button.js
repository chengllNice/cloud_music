import baseButton from './base_button.vue'
import baseToolButton from './tool_button.vue'

baseButton.install = function (Vue) {
  Vue.component(baseButton.name, baseButton)
};
baseToolButton.install = function (Vue) {
  Vue.component(baseToolButton.name, baseToolButton)
};


export {
  baseButton,
  baseToolButton
}
