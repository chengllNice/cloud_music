import {
  ajax_get
} from './index'

// 获取歌曲url
export const get_song_url = (data) => ajax_get('/song/url',data);
// 获取歌曲歌词
export const get_song_lrc = (data) => ajax_get('/lyric',data);
// 获取歌曲详情
export const get_song_detail = (data) => ajax_get('/song/detail',data);
// 获取歌单详情
export const get_songlist_detail = (data) => ajax_get('/playlist/detail',data);
// 获取歌单评论
export const get_songlist_comment = (data) => ajax_get('/comment/playlist',data);
// 评论
export const post_songlist_comment = (data) => ajax_get('/comment',data);
// 手机登录
export const phone_login = (data) => ajax_get('/login/cellphone',data);
// 获取用于歌单等信息
export const get_user_subcount = (data) => ajax_get('/user/subcount',data);
// 获取用户歌单
export const get_user_playlist = (data) => ajax_get('/user/playlist',data);

// 获取歌手详情
export const get_artist_detail = (data) => ajax_get('/artists',data);
// 获取歌手描述
export const get_artist_desc = (data) => ajax_get('/artist/desc',data);
// 获取歌手专辑
export const get_artist_album = (data) => ajax_get('/artist/album',data);
// 获取专辑内容
export const get_album = (data) => ajax_get('/album',data);
// 获取专辑评论
export const get_album_comment = (data) => ajax_get('/comment/album',data);
// 获取歌手mv
export const get_artist_mv = (data) => ajax_get('/artist/mv',data);
// 相似歌手
export const get_simi_artist = (data) => ajax_get('/simi/artist',data);
// mv地址
export const get_mv_url = (data) => ajax_get('/mv/url',data);
// 获取mv详情
export const get_mv_detail = (data) => ajax_get('/mv/detail',data);
// 获取mv评论
export const get_mv_comment = (data) => ajax_get('/comment/mv',data);
// 获取相似mv
export const get_mv_simi = (data) => ajax_get('/simi/mv',data);
// 获取视频地址
export const get_video_url = (data) => ajax_get('/video/url',data);
// 视频详情
export const get_video_detail = (data) => ajax_get('/video/detail',data);
// 视频评论
export const get_video_comment = (data) => ajax_get('/comment/video',data);
// 获取相似视频
export const get_video_simi = (data) => ajax_get('/related/allvideo',data);
// 给资源点赞
export const post_resource_like = (data) => ajax_get('/resource/like',data);
