const state = {
  loginName: '',
  password: '',
  isRemember: true
}
const mutations = {
  SET_LOGIN_NAME: (state, loginName) => {
    state.loginName = loginName
  },
  SET_PASSWORD: (state, password) => {
    state.password = password
  },
  SET_IS_REMEMBER: (state, isRemember) => {
    state.isRemember = isRemember
  }
}

const actions = {
  setLoginInfo(
    { commit },
    { loginName = '', password = '', isRemember = false }
  ) {
    if (isRemember) {
      commit('SET_LOGIN_NAME', loginName)
      commit('SET_PASSWORD', password)
      commit('SET_IS_REMEMBER', isRemember)
    } else {
      commit('SET_LOGIN_NAME', '')
      commit('SET_PASSWORD', '')
      commit('SET_IS_REMEMBER', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
