import songlistDetail from './songlist_detail'

songlistDetail.install = function (Vue) {
  Vue.component(songlistDetail.name, songlistDetail)
};


export {
  songlistDetail
}
