
export default {
  get_device_info(state){
    state.device_info = {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };
    console.log(document.body.clientWidth)
  }
}
