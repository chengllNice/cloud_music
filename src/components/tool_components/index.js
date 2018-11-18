import Vue from 'vue';
import { baseButton, baseToolButton } from './button/button.js'
import { clForm, clInput, clCheckbox } from './form/cl_form.js'
import { baseSingList } from './base_list/base_list.js'
import { baseTable, iviewTable } from './base_table/base_table.js'
import { headerTab } from './header_tab/header_tab.js'
import { toolModal } from './tool_modal/tool_modal.js'
import { toolFilterSelect } from './tool_filter_select/tool_filter_select.js'
import { toolPage } from './pagination/tool_page.js'
import { toolComment } from './tool_comment/tool_comment.js'

const components = [
  baseButton,
  clForm,
  clInput,
  baseToolButton,
  baseSingList,
  baseTable,
  iviewTable,
  headerTab,
  toolModal,
  clCheckbox,
  toolFilterSelect,
  toolPage,
  toolComment
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
  toolModal,
  clCheckbox,
  toolFilterSelect,
  toolPage,
  toolComment
}
