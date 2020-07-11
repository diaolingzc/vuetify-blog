import { getCategories as getCacheCategories, setCategories as setCacheCategories } from '@/utils/cache'
import { getCategories as getWebCategories } from '@/api/categories'

const state = {
  categories: getCacheCategories(),
  drawer: false,
  categoryid: '',
}

const mutations = {
  SET_CATEGORIES: (state, categories) => {
    state.categories = categories
  },

  SET_DRAWER: (state, drawer) => {
    state.drawer = drawer
  },

  SET_CATEGORY_ID: (state, categoryid) => {
    state.categoryid = categoryid
  },
}

const actions = {
  setCategories ({ commit }) {
    return new Promise((resolve, reject) => {
      getWebCategories().then(response => {
        const { data } = response.data
        setCacheCategories(data)
        commit('SET_CATEGORIES', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  toggleDrawer ({ commit, state }) {
    commit('SET_DRAWER', !state.drawer)
  },

  setDrawer ({ commit }, drawer) {
    commit('SET_DRAWER', drawer)
  },

  setCategoryId ({ commit }, categoryid) {
    commit('SET_CATEGORY_ID', categoryid)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
