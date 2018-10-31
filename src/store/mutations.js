
export default {
  get_music_info(state, info){
    Object.keys(info).forEach(key=>{
      state.music_info[key] = info[key];
    });
  },
  get_device_info(state, info){
    state.device_info = info;
  },
  get_scroll_info(state, info){
    state.scroll_info = info;
  },
  set_lrc_panal_show(state, info){
    state.lrc_panal_show = info;
  }
}
