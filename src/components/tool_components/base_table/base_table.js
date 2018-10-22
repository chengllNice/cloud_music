import baseTable from './base_table.vue'
import iviewTable from './table_iview/index'

baseTable.install = function (Vue) {
  Vue.component(baseTable.name, baseTable)
};

iviewTable.install = function (Vue) {
  Vue.component(iviewTable.name, iviewTable)
};



export {
  baseTable,
  iviewTable,
}
