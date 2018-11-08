import {
  get_song_url,
  get_song_detail,
  get_song_lrc,
  get_songlist_detail,
  get_songlist_comment,
  post_songlist_comment
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
    get_song_detail(data).then(res => {
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
};

const getSonglistDetail = (data) => {
  return new Promise((resolve, reject) => {
    get_songlist_detail(data).then(res => {
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
};

const getSonglistComment = (data) => {
  return new Promise((resolve, reject) => {
    get_songlist_comment(data).then(res => {
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
};

const postSonglistComment = (data) => {
  return new Promise((resolve, reject) => {
    post_songlist_comment(data).then(res => {
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
};

export default {
  getSongUrl,
  getSongLrc,
  getSongDetail,
  getSonglistDetail,
  getSonglistComment,
  postSonglistComment
}
