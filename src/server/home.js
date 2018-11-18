import {ajax_get} from "./index";

// 获取banner
export const get_banner = data => ajax_get('/banner',data);
// 获取推荐歌单
export const get_personalized = data => ajax_get('/personalized',data);
// 独家放送
export const get_privatecontent = data => ajax_get('/personalized/privatecontent',data);
// 新歌推荐（最新音乐）
export const get_newsong = data => ajax_get('/personalized/newsong',data);
// 推荐MV
export const get_mv = data => ajax_get('/personalized/mv',data);
// 推荐电台
export const get_djprogram = data => ajax_get('/personalized/djprogram',data);

// 最新音乐--新歌速递
export const get_top_song = data => ajax_get('/top/song',data);
// 新碟上架
export const get_top_album = data => ajax_get('/top/album',data);

// 歌单
// 歌单分类
export const get_playlist_catlist = data => ajax_get('/playlist/catlist',data);
// 歌单热门分类
export const get_playlist_hot = data => ajax_get('/playlist/hot',data);
// 歌单列表
export const get_top_playlist = data => ajax_get('/top/playlist',data);

// 歌手
// 热门歌手
export const get_top_artists = data => ajax_get('/top/artists',data);
// 根据分类筛选歌手
export const get_artists_list = data => ajax_get('/artist/list',data);


// 排行榜
export const get_top_list = data => ajax_get('/top/list',data);
// 歌手榜
export const get_toplist_artist = data => ajax_get('/toplist/artist',data);
// 所有榜单内容摘要
export const get_toplist_detail = data => ajax_get('/toplist/detail',data);
