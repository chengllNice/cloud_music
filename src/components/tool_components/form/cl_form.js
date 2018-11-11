import clForm from './cl_form.vue'
import clInput from './cl_input.vue'
import clCheckbox from './cl_checkbox.vue'

clForm.install = function (Vue) {
  Vue.component(clForm.name, clForm)
};

clInput.install = function (Vue) {
  Vue.component(clInput.name, clInput)
};

clCheckbox.install = function (Vue) {
  Vue.component(clCheckbox.name, clCheckbox)
};

export {
  clForm,
  clInput,
  clCheckbox
}
