<template>
    <Navbar />
   <img alt="Restaurant logo" src="../assets/res-logo.png">
   <div v-if="store.isLogged" id="main">
        <h1>Add Restaurant</h1>
        <form>
            <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control"  v-model="restaurant.Name" id="restaurantName" name="restaurantName" placeholder="Name of restaurant">
        </div>
        <div class="mb-3">
            <label for="restaurantAddress" class="form-label">Adress</label>
            <input type="text" class="form-control" v-model="restaurant.Address" id="restaurantAddress" name="restaurantAddress" placeholder="Address of restaurant">
        </div>
        <div class="mb-3">
            <label for="restaurantInfo" class="form-label">Info</label>
            <input type="text" class="form-control" v-model="restaurant.Info" id="restaurantInfo" name="restaurantInfo" placeholder="Info of restaurant">
        </div>
        <button type="button" class="btn btn-success" v-on:click="createRestaurant">Add restaurant</button>
        </form>
   </div>
</template>

<script setup>
   import Navbar from './Navbar';
   //State management
   import { store } from '../store.js';
   import { useRouter } from 'vue-router';
   import axios from 'axios';

   const router = useRouter()
   const user = JSON.parse(localStorage.getItem("user-data"));
    
   let restaurant = {
     Id: "",
     Name : "",
     Address : "",
     Info : ""
   };
    
   const createRestaurant = async () => {
    if(restaurant.Name && restaurant.Address && restaurant.Info){
        //Call Get endpoint to calculate the max Id
        let result = await axios.get(`http://localhost:3000/restaurant`);
        if(result.status == 200){
            restaurant.Id  = result.data.length + 1;
            //Add
            let createResult = await axios.post("http://localhost:3000/restaurant/",{
                    id: restaurant.Id,
                    img: "https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-restaurant-300x300.png",
                    name: restaurant.Name, 
                    info: restaurant.Info,
                    address: restaurant.Address
            });

            if(createResult.status == 201){
                alert("Created!");
                router.push({name: 'Home'});
            }
            else {
                alert("Error during the saving process.");
            }
        }
    }
    else{
      alert("Missing parameters.")
    }
    
   }

   if(!user){
       router.push({name: 'Login'});
       }
   else{
       store.isLogged = true;
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