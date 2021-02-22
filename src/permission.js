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
  const hasRefreshToken = getRefreshToken()

  if (hasRefreshToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.accessTokenExpireUtcTime) {
        // 未超时
        if (
          dayjs
            .utc()
            .add(10, 'minute')
            .isBefore(dayjs(store.getters.accessTokenExpireUtcTime))
        ) {
          next()
        } else if (
          store.getters.refreshTokenExpireTime &&
          dayjs
            .utc()
            .add(29, 'day')
            .isAfter(dayjs(store.getters.refreshTokenExpireTime))
        ) {
          // 超时 直接返回登录页
          store.dispatch('token/logout')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        } else {
          console.log(getRefreshToken())
          try {
            await store.dispatch('token/refreshToken')
            next()
            NProgress.done()
          } catch (error) {
            // 超时 直接返回登录页
            Message.error(error || 'Has Error')
            await store.dispatch('token/logout')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }

      // const hasGetUserInfo = store.getters.name
      // if (hasGetUserInfo) {
      //   next()
      // } else {
      //   try {
      //     // get user info
      //     await store.dispatch('user/getInfo')

      //     next()
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
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
