<template>
     <Navbar />
    <h1>Sign Up</h1>
    <div>
        <form>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" :class="{cls_error : isWrongEmail}" aria-describedby="emailHelp"  v-model="email" id="email" name="email" placeholder="E-mail">
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" :class="{cls_error : isWrongName}" v-model="name" id="name" name="name" placeholder="Name">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" :class="{cls_error : isWrongPassword}" v-model="password" id="password" name="password" placeholder="Password">
        </div>
        <button type="button" class="btn btn-primary" v-on:click="SignUp">SignUp</button>
        <hr />
            <router-link to="/login">Login</router-link>
        </form>
    </div>
</template>
<script>

//Import my custom utils library
import utils  from '../utils';
import axios from 'axios';

//Components
import Navbar from './Navbar';
import { RouterLink } from 'vue-router';

export default {
    name: 'SignUp',
    components: {
    Navbar,
    RouterLink
},
    data(){
        return {
            isWrongEmail: false,
            isWrongPassword: false,
            isWrongName: false,
            name: "",
            email:"",
            password:""
        }
    },
    methods: {
        async SignUp(){
            //Validation
            let isValidEmail = utils.ValidateEmail(this.email);
            let isValidPassword = utils.ValidatePassword(this.password);
            let isValidName = utils.ValidateName(this.name);
        
            isValidEmail ? this.isWrongEmail = false : this.isWrongEmail = true;
            isValidPassword ? this.isWrongPassword = false : this.isWrongPassword = true;
            isValidName ? this.isWrongName = false : this.isWrongName = true;

            //SignUp
            //D:\Vue\restaurant-app\db>json-server --watch db.json
            if(isValidEmail && isValidName && isValidPassword){
                let result = await axios.post("http://127.0.0.1:3000/users/",{
                    id: new Date().valueOf(),
                    email: this.email,
                    name: this.name, 
                    password: this.password
                });

                if(result.status == 201){
                    alert("SignUp success!");
                    localStorage.setItem("user-id", JSON.stringify(result.data.id));
                    this.$router.push({name: 'Home'});
                }
            }
        }
    },
    mounted(){
        let user = localStorage.getItem("user-data");
        if(user){
            this.$router.push({name: 'Home'});
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
