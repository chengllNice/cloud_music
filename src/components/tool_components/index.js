import Vue from 'vue';
import { baseButton, baseToolButton } from './button/button.js'
import { clForm, clInput } from './form/cl_form.js'
import { baseSingList } from './base_list/base_list.js'
import { baseTable, iviewTable } from './base_table/base_table.js'
import { headerTab } from './header_tab/header_tab.js'

const components = [
  baseButton,
  clForm,
  clInput,
  baseToolButton,
  baseSingList,
  baseTable,
  iviewTable,
  headerTab
];


const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

install(Vue);

export default {
  version: '0.0.1',
  baseButton,
  clForm,
  clInput,
  baseToolButton,
  baseSingList,
  baseTable,
  iviewTable,
  headerTab,
}
