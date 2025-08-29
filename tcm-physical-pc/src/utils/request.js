import axios from 'axios';

// 创建一个 axios 实例
const service = axios.create({
    baseURL: 'http://localhost:8001', // 从环境变量中获取 API 基础 URL
    timeout: 20000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    config => {


        config.headers['Authorization'] = `Bearer ` + sessionStorage.getItem("token");
        // config.headers['Authorization'] = `Bearer ${token}`;

        return config;
    },
    error => {
        // 处理请求错误
        console.log(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        // 如果返回的状态码不是预期的成功状态码，可以在这里处理
        if (res.code !== 0 && res.code !== -1) {
            return Promise.reject(new Error(res.message || 'Error'));
        } else {

            return res;
        }
    },
    error => {
        if (error.code === "ERR_NETWORK") {

            // setTimeout(() => {
            //     location.href = '/login';
            // }, 1000);
            return;
        }
        if (error.status === 401) {
            // location.href = '/login';
        }

        // 处理响应错误
        //   console.log('err' + error);
        return Promise.reject(error);
    }
);



export default service;
