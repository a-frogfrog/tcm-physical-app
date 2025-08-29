import request from '../utils/request'

/**
 * 登录接口
 */
export const logins = (obj) =>{
    return request({
        url: 'api/Login/Logins',
        method: 'post',
        data: obj
    })
}