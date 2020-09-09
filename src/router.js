import Vue from 'vue'
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import Axios from 'axios';
import VueBootstrapToasts from "vue-bootstrap-toasts";
import Profile from './components/Profile.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueRouter);
Vue.use(VueAxios, Axios);
Vue.use(VueBootstrapToasts);

Vue.config.productionTip = false; 

// function guardMyroute(to, from, next)
// {
//     var isAuthenticated= false; 
//     if(localStorage.getItem('token')&& localStorage.getItem('user')){
//       isAuthenticated = true;
//     }else{
//       isAuthenticated= false;
//     }
//     if(isAuthenticated) {
//       next(); 
//     }else{
//       next('/login'); 
//     }
// }


const routes = [
  { 
    name: 'Profile',
    path: '/profile',
    // meta: { 
    //     requiresAuth: true
    //   },
    // beforeEnter : guardMyroute,
    component: Profile
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Home',
    path: '/home',
    component: Home
  }
];

const router = new VueRouter({ mode: 'history', routes: routes });

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
     console.log('route')
    } else {
      next() 
    }
  })
  
  export default router

// new Vue({
//   render: h => h(App),
//   router
// }).$mount('#app')