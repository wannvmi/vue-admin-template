module.exports = [
  // user login
  {
    url: '/api/account/accountlogin',
    type: 'post',
    response: config => {
      return {
        success: true,
        code: 200,
        message: 'string',
        data: {
          userRole: 'string',
          accessToken: 'string',
          accessTokenExpireTime: '2025-02-22T11:18:21.543Z',
          accessTokenExpireUtcTime: '2025-02-22T11:18:21.543Z',
          refreshToken: 'string',
          refreshTokenExpireTime: '2025-12-22T11:18:21.543Z',
          scheme: 'Bearer'
        }
      }
    }
  },

  // get user info
  {
    url: '/api/account/refreshtoken',
    type: 'get',
    response: config => {
      return {
        success: true,
        code: 200,
        message: 'string',
        data: {
          userRole: 'string',
          accessToken: 'string',
          accessTokenExpireTime: '2025-02-22T11:18:21.543Z',
          accessTokenExpireUtcTime: '2025-02-22T11:18:21.543Z',
          refreshToken: 'string',
          refreshTokenExpireTime: '2025-12-22T11:18:21.543Z',
          scheme: 'Bearer'
        }
      }
    }
  },

  // user logout
  {
    url: '/api/account/logout',
    type: 'post',
    response: _ => {
      return {
        success: true,
        code: 200,
        message: 'string'
      }
    }
  }
]
