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