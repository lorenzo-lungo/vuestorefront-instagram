import * as types from './mutation-types'
import config from 'config'

export const module = {
  namespaced: true,
  state: {
    media: []
  },
  mutations: {
    [types.SET_INSTAGRAM_FEED] (state, payload) {
      state.media = payload
    }
  },
  actions: {
    get ({ commit }) {
      fetch(`${config.instagram.endpoint}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      })
        .then(res => {
          return res.json()
        })
        .then(res => {
          commit(types.SET_INSTAGRAM_FEED, res.result)
        })
    }
  },
  getters: {
    media: state => state.media
  }
}
