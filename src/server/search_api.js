import {ajax_get} from "./index";

export const get_search = (data) => ajax_get('/search', data)
