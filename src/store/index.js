import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import getters from './getters'
import setting from '@/settings'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// https://github.com/robinvdvleuten/vuex-persistedstate#encrypted-local-storage
const ls = new SecureLS({
  encodingType: 'aes',
  encryptionSecret: setting.vuexKey,
  encryptionNamespace: setting.vuexKey
})

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [
    createPersistedState({
      key: setting.vuexKey,
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ]
})

export default store
