// import errorLog from '@/api/errorLog'

const state = {
  logs: []
}

const mutations = {
  ADD_ERROR_LOG: (state, log) => {
    state.logs.push(log)
  },
  CLEAR_ERROR_LOG: state => {
    state.logs.splice(0)
  }
}

const actions = {
  async addErrorLog({ commit, state }, log) {
    commit('ADD_ERROR_LOG', log)
    if (state.logs && state.logs.length > 5) {
      console.log('发送错误日志')

      // await errorLog.save(state.logs).then((res) => {
      //   commit('CLEAR_ERROR_LOG')
      // })
      commit('CLEAR_ERROR_LOG')
    }
  },
  clearErrorLog({ commit }) {
    commit('CLEAR_ERROR_LOG')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
