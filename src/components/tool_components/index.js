import Vue from 'vue';
import { baseButton, baseToolButton } from './button/button.js'
import { clForm, clInput } from './form/cl_form.js'
import { baseSingList } from './base_list/base_list.js'

const components = [
  baseButton,
  clForm,
  clInput,
  baseToolButton,
  baseSingList
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
  clInput,
  baseToolButton,
  baseSingList
}
