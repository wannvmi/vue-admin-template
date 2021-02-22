import axios from 'axios'
import { Message } from 'element-ui'
import { showLoading, hideLoading } from '@/utils/loading'
import store from '@/store'
import AwaitLock from 'await-lock'

const lock = new AwaitLock()

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 判断当前请求是否设置了不显示Loading
    if (config.showLoading) {
      showLoading(config.headers.loadingTarget)
    }

    if (store.getters.accessToken) {
      // let each request carry token
      config.headers.Authorization = `${store.getters.scheme} ${store.getters.accessToken}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log(res, `url:${response.config.url}`)

    // 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (response.config.showLoading) {
      hideLoading()
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  async error => {
    const { data } = error.response
    console.log(data, error, `error url:${error.config.url}`) // for debug

    // 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (error.config.showLoading) {
      hideLoading()
    }

    console.log(error.response)
    if (error.response.status === 401) {
      await lock.acquireAsync()
      try {
        await store.dispatch('token/refreshToken')
        location.reload()
      } catch (error) {
        // 超时 直接返回登录页
        Message.error(error || 'Has Error')
        store.dispatch('errorLog/addErrorLog', {
          error: error,
          response: error.response
        })
        await store.dispatch('token/logout')
        location.reload()
      } finally {
        lock.release()
      }
    } else {
      Message({
        message: data.message || error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
