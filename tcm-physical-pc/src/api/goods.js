import request from '../utils/request'


/**
 * 获取商品列表
 * @param {*} obj 
 * @returns 
 */
export const get_goods = (obj) =>{
    return request({
        url:'/api/Good/Get_Goods',
        method:'get',
        params:obj
    })
}