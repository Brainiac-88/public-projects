<template>
    <Navbar /><br />
    <h1>Login</h1>
        <form>
        <div class="mb-3">
            <label for="login-email" class="form-label">Email address</label>
            <input type="email" class="form-control" :class="{cls_error : isWrongEmail}" v-model="loginEmail" id="login-email" placeholder="E-mail" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="login-password" class="form-label">Password</label>
            <input type="password" class="form-control" :class="{cls_error : isWrongPassword}" v-model="loginPassword" id="login-password" placeholder="Password">
        </div>
        <button type="button" @click="Login" class="btn btn-success">Login</button>
        <hr />
            <router-link to="/sign-up">SignUp</router-link>
        </form>
</template>

<script>
//Import my custom utils library
import utils  from '../utils';
import axios from 'axios';

//State management
import { store } from '../store.js';
import Navbar from './Navbar';

export default {
    name: 'Login',
    components: {
        Navbar
    },
    data(){
        return {
            isWrongEmail: false,
            isWrongPassword: false,
            loginEmail: "",
            loginPassword: ""
        }
    },
    methods: {
       async Login(){

              //Validation
            let isValidEmail = utils.ValidateEmail(this.loginEmail);
            let isValidPassword = utils.ValidatePassword(this.loginPassword);

            isValidEmail ? this.isWrongEmail = false : this.isWrongEmail = true;
            isValidPassword ? this.isWrongPassword = false : this.isWrongPassword = true;

            if(isValidEmail && isValidPassword){
                let result = await axios.get(`http://localhost:3000/users/?email=${this.loginEmail}&password=${this.loginPassword}`);
                if(result.status == 200){
                    if(result.data.length > 0) {
                        let userData = result.data[0];
                        localStorage.setItem("user-data", JSON.stringify(userData));
                        store.Login();
                        this.$router.push({name: 'Home'});
                    }
                }
            }


        }
    }    
}
</script>

<style scoped>
    form {
        max-width: 70%;
        margin: auto;
        padding: 30px;
        background: #E6E6FA;
    }

    .cls_error {
        border: 2px solid red;
    }
</style>