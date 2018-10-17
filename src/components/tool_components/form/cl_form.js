import clForm from './cl_form.vue'
import clInput from './cl_input.vue'

clForm.install = function (Vue) {
  Vue.component(clForm.name, clForm)
};

clInput.install = function (Vue) {
  Vue.component(clInput.name, clInput)
};

export {
  clForm,
  clInput
}
