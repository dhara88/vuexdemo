import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from 'axios';
Vue.config.productionTip = false;
// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');










// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import Axios from 'axios'
// import vueResource from 'vue-resource';

// Vue.use(vueResource); 
// Vue.prototype.$http = Axios;

// const token = localStorage.getItem('user-token')
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }

// Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')