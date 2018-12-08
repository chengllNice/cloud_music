import {ajax_get} from "./index";

// 私人FM
export const get_personal_fm = (data) => ajax_get('/api/personal_fm',data);
