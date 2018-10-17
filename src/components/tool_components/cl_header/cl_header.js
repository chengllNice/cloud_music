import clCommonHeader from './cl_common_header.vue'

clCommonHeader.install = function (Vue) {
  Vue.component(clCommonHeader.name, clCommonHeader)
};

export {
  clCommonHeader
}
