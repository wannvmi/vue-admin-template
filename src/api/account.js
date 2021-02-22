import request from '@/utils/request'

export default {
  accountLogin(data) {
    return request({
      url: '/api/account/accountlogin',
      method: 'post',
      data
    })
  },

  refreshToken(data) {
    return request({
      url: '/api/account/refreshtoken',
      method: 'post',
      data
    })
  },

  logout(data) {
    return request({
      url: '/api/account/logout',
      method: 'post',
      data
    })
  }
}
