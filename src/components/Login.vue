<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>username</label>
     <input required v-model="username" type="text" placeholder="Name"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <input type="button" @click="login" value="Login" />
    <p v-if="msg">{{ msg }}</p>
   </form>
 </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */ 
import AuthService from '@/services/AuthService.js';

export default 
{
	data:function(){
		return {
			username : "",
			password : "",
			msg:''
		}
	},
	methods: {
	async login() {
      try {
        const credentials = {
          email: this.username,
          password: this.password
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;
        const tokenParse = JSON.parse(atob(response.access_token.split('.')[1]));
        const token = response.access_token;
		    const user = tokenParse.email;
		    // console.log("t",token,user, response)
        this.$store.dispatch('login', { token, user });
        this.$router.push('/profile');
      } catch (errror) {
        this.msg = 'Invalid Username or Password!!';
      }
    }
		// login() {
		// 	let email = this.email 
		// 	let password = this.password
		// 	this.$store.dispatch('login', { email, password })
		// 	.then(() => this.$router.push('/'))
		// 	.catch(err => console.log(err))
		// }
	}
}
</script>