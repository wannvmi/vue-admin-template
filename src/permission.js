import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getRefreshToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const tokenEffective = await isTokenEffective()

  if (tokenEffective) {
    if (to.path === '/login') {
      console.log(tokenEffective, 'if is logged in, redirect to the home page')
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getUserInfo')

          next()
        } catch (error) {
          Message.error(error || 'Has Error')
          next(`/404`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

async function isTokenEffective() {
  const hasRefreshToken = getRefreshToken()
  // 无RefreshToken直接返回 false
  if (!hasRefreshToken) {
    return false
  }

  // vuex 无数据直接返回 false
  if (!store.getters.accessToken) {
    return false
  }

  // 正常情况
  if (
    dayjs
      .utc()
      .add(10, 'minute')
      .isBefore(dayjs(store.getters.accessTokenExpireUtcTime))
  ) {
    return true
  }

  // RefreshToken 过期
  if (
    store.getters.refreshTokenExpireTime &&
    dayjs
      .utc()
      .add(29, 'day')
      .isAfter(dayjs(store.getters.refreshTokenExpireTime))
  ) {
    return false
  }

  // 尝试获取新token
  try {
    await store.dispatch('token/refreshToken')
    return true
  } catch (error) {
    // 超时 直接返回登录页
    Message.error(error || 'Has Error')
    return false
  }
}
