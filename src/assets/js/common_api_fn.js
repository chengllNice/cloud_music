import {
  get_song_url,
  get_song_detail,
  get_song_lrc
} from "../../server/common_api";

const getSongUrl = (data) => {
  return new Promise((resolve, reject) => {
    get_song_url(data).then(res => {
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
};

const getSongLrc = (data) => {
  return new Promise((resolve, reject) => {
    get_song_lrc(data).then(res => {
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
};

const getSongDetail = (data) => {
  return new Promise((resolve, reject) => {
    get_song_url(data).then(res => {
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
};

export default {
  getSongUrl,
  getSongLrc,
  getSongDetail
}
