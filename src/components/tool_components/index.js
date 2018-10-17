import Vue from 'vue';
import { baseButton } from './button/button.js'
import { clForm, clInput } from './form/cl_form.js'

const components = [
  baseButton,
  clForm,
  clInput
];


const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  });
  // Vue.prototype.$fbmessage = fbMessage;
};

install(Vue);

export default {
  version: '0.0.1',
  baseButton,
  clForm,
  clInput
}
