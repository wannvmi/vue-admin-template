module.exports = {
  title: 'Vue Admin Template',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: ['staging', 'production'],
  // errorLog: ['production', 'development']

  /**
   * @type { string }
   * @description cookie 存储 refreshToken
   */
  refreshTokenKey: 'vue-admin-template-RefreshToken',

  /**
   * @type { string }
   * @description vuex 持久化存储
   */
  vuexKey: 'vue-admin-template-vuex'
}
