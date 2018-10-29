import {
  ajax_get
} from './index'

// 获取歌曲url
export const get_song_url = (data) => ajax_get('/song/url',data);
// 获取歌曲歌词
export const get_song_lrc = (data) => ajax_get('/lyric',data);
// 获取歌曲详情
export const get_song_detail = (data) => ajax_get('/song/detail',data);
