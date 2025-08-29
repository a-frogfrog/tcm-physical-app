import Cookies from "js-cookie";

const token_key = "jfkahjkfgjdkgjfdkgj_Token"

/**
 * 设置token的方法
 * @param {string} value - 要设置的token值
 * @returns {void} 无返回值
 */
export const set_token = (value) => {
    // 使用Cookies.set方法将token值存储到cookie中
    // token_key是预先定义的cookie键名
    Cookies.set(token_key, value);
}


export const get_token = () => {
    // 使用Cookies.get方法获取存储在cookie中的token值
    // token_key是预先定义的cookie键名
    return Cookies.get(token_key);
}


export const remove_token = () => {
    // 使用Cookies.remove方法删除存储在cookie中的token值
    // token_key是预先定义的cookie键名
    Cookies.remove(token_key);
}