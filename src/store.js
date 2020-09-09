// src/store.js (Vue CLI 1.x & 2.x) oder src/store/index.js (Vue CLI 3.x or newer)

import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    token: '',
    user: {}
  };
};

export default new Vuex.Store({
  strict: true,
  // plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLoggedIn: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    login: ({ commit, dispatch }, { token, user }) => {
	  console.log(dispatch,token,user);
      commit('SET_TOKEN', token);
      commit('SET_USER', user);

      // set auth header
      Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    }
  }
});


// import Vue from 'vue'
// import Vuex from 'vuex'
// import axios from 'axios'

// Vue.use(Vuex)
// /* eslint-disable vue/no-unused-components */ 
// export default new Vuex.Store({
// 	state: {
// 	status: '',
// 	token: localStorage.getItem('token') || '',
// 	user : {}
// },
// 	mutations: {
// 	auth_request(state){
// 		state.status = 'loading'
// 	},
// 	auth_success(state, token, user){
// 		state.status = 'success'
// 		state.token = token
// 		state.user = user
// 	},
// 	auth_error(state){
// 		state.status = 'error'
// 	},
// 	logout(state){
// 		state.status = ''
// 		state.token = ''
// 	},
// 	},
// 	actions: {
// 	login({commit}, user){
// 		return new Promise((resolve, reject) => {
// 			commit('auth_request')
// 			axios({url: 'http://localhost:3000/auth/login', data: user, method: 'POST' })
// 			.then(resp => {
// 				const token = resp.data.token
// 				const user = resp.data.user
// 				localStorage.setItem('token', token)
// 				axios.defaults.headers.common['Authorization'] = token
// 				commit('auth_success', token, user)
// 				resolve(resp)
// 			})
// 			.catch(err => {
// 				commit('auth_error')
// 				localStorage.removeItem('token')
// 				reject(err)
// 			})
// 		})
// 	},
// 	logout({commit}){
// 		return new Promise((resolve) => {
// 			commit('logout')
// 			localStorage.removeItem('token')
// 			delete axios.defaults.headers.common['Authorization']
// 			resolve()
// 		})
// 	}
// 	},
// 	getters : {
// 	isLoggedIn: state => !!state.token,
// 	authStatus: state => state.status,
// }
// })
