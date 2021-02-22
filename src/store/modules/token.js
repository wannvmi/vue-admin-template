import account from '@/api/account'
import {
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken
} from '@/utils/auth'
import { resetRouter } from '@/router'
import md5 from 'crypto-js/md5'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import { v4 as uuidv4 } from 'uuid'

const state = {
  accessToken: '',
  accessTokenExpireTime: '',
  accessTokenExpireUtcTime: '',
  refreshToken: getRefreshToken(),
  refreshTokenExpireTime: '',
  scheme: 'Bearer',
  secret: uuidv4()
}

const mutations = {
  SET_TOKEN: (state, tokenResult) => {
    state.accessToken = tokenResult.accessToken
    state.accessTokenExpireTime = tokenResult.accessTokenExpireTime
    state.accessTokenExpireUtcTime = tokenResult.accessTokenExpireUtcTime
    state.refreshToken = tokenResult.refreshToken
    state.refreshTokenExpireTime = tokenResult.refreshTokenExpireTime
    state.scheme = tokenResult.scheme || 'Bearer'
    state.secret = uuidv4()
  }
}

const actions = {
  // user login
  login({ commit, state }, userInfo) {
    const { loginName, password } = userInfo
    return new Promise((resolve, reject) => {
      const passwordMD5 = md5(password).toString()
      const secret = state.secret
      const sign = Base64.stringify(
        hmacSHA256(`${loginName}${passwordMD5}${secret}`, secret)
      )

      account.accountLogin({
        loginName: loginName,
        password: passwordMD5,
        secret: secret,
        sign: sign
      })
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data)
          setRefreshToken(data.refreshToken)

          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // refreshToken
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      const refreshTokenStr = getRefreshToken()
      const secret = state.secret
      const sign = Base64.stringify(
        hmacSHA256(`${refreshTokenStr}${secret}`, secret)
      )

      account.refreshToken({
        refreshToken: refreshTokenStr,
        secret: secret,
        sign: sign
      })
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data)
          setRefreshToken(data.refreshToken)

          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      const refreshTokenStr = getRefreshToken()
      account.logout({ refreshToken: refreshTokenStr })
        .then(() => {
          commit('SET_TOKEN', {})
          removeRefreshToken()
          resetRouter()

          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
