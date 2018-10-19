import baseSingList from './base_sing_list.vue'

baseSingList.install = function (Vue) {
  Vue.component(baseSingList.name, baseSingList)
};


export {
  baseSingList,
}
