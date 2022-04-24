import axios from "axios"
import config from "../config/index"

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    // 定义axios相关配置的初始值
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}  // 请求头信息
        }
        return config
    }

    // 拦截器，传入axios实例
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 对响应错误做点什么
            console.log('拦截到错误了')
            return Promise.reject(error);
        });
    }

    // 接口请求时会调用，
    request(options) {
        // 创建实例
        const instance = axios.create()
        // 传入相关参数
        options = {...this.getInsideConfig(), ...options}
        this.interceptors(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)