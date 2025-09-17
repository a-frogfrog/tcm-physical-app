import request from '../utils/request'
/**
 * 登录
 * @param {*} param0 
 * @returns 
 */
export const logins = (obj) => {
    return request({
        url: "/api/Logins/Logins",
        method: "POST",
        data: obj
    }); 
}