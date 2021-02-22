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
          accessTokenExpireTime: '2021-02-22T11:18:21.543Z',
          accessTokenExpireUtcTime: '2021-02-22T11:18:21.543Z',
          refreshToken: 'string',
          refreshTokenExpireTime: '2021-02-22T11:18:21.543Z',
          scheme: 'string'
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
          accessTokenExpireTime: '2021-02-22T11:18:42.617Z',
          accessTokenExpireUtcTime: '2021-02-22T11:18:42.617Z',
          refreshToken: 'string',
          refreshTokenExpireTime: '2021-02-22T11:18:42.617Z',
          scheme: 'string'
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
