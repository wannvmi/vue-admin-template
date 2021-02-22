import { Loading } from 'element-ui'
import debounce from 'lodash/debounce'

// Vue.js - 封装Axios实现全局的loading自动显示效果（结合Element UI） https://www.hangge.com/blog/cache/detail_2554.html

// loading对象
let loading

// 当前正在请求的数量
let needLoadingRequestCount = 0

// 显示loading
export function showLoading(target) {
  // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  if (needLoadingRequestCount === 0 && !loading) {
    loading = Loading.service({
      lock: true,
      text: 'Loading...',
      background: 'rgba(255, 255, 255, 0.7)',
      target: target || 'body'
    })
  }
  needLoadingRequestCount++
}

// 隐藏loading
export function hideLoading() {
  needLoadingRequestCount--
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0) // 做个保护
  if (needLoadingRequestCount === 0) {
    // 关闭loading
    toHideLoading()
  }
}

// 防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
const toHideLoading = debounce(() => {
  loading.close()
  loading = null
}, 300)
