import {ajax_get} from "./index";

export const get_search = (data) => ajax_get('/search', data);
// 搜索建议
export const get_search_suggest = (data) => ajax_get('/search/suggest', data);
// 多重匹配
export const get_search_multimatch = (data) => ajax_get('/search/multimatch', data);
// 热门搜搜
export const get_search_hot = (data) => ajax_get('/search/hot', data);


