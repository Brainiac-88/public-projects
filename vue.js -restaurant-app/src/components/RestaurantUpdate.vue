<template>
    <Navbar />
   <img alt="Restaurant logo" src="../assets/res-logo.png">
   <div v-if="store.isLogged" id="main">
        <h1>Update Restaurant</h1>
        <form>
            <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control"  v-model="restaurant.name" id="restaurantName" name="restaurantName" placeholder="Name of restaurant">
        </div>
        <div class="mb-3">
            <label for="restaurantAddress" class="form-label">Adress</label>
            <input type="text" class="form-control" v-model="restaurant.address" id="restaurantAddress" name="restaurantAddress" placeholder="Address of restaurant">
        </div>
        <div class="mb-3">
            <label for="restaurantInfo" class="form-label">Info</label>
            <input type="text" class="form-control" v-model="restaurant.info" id="restaurantInfo" name="restaurantInfo" placeholder="Info of restaurant">
        </div>
        <button type="button" class="btn btn-success" v-on:click="UpdateRestaurant">Update restaurant</button>
        </form>
   </div>
</template>

<script setup>
   import Navbar from './Navbar';
   //State management
   import { store } from '../store.js';
   import { useRouter, useRoute } from 'vue-router';
   import { ref } from 'vue';
   import axios from 'axios';

   const router = useRouter()
   const route = useRoute();

   const id = route.params.id;
   
   let restaurant = ref({});

   const getRestaurant = async () => {
        //Get the restaurant
        let getResult = await axios.get(`http://localhost:3000/restaurant/?id=${id}`);
        if(getResult.status == 200){
            restaurant.value = getResult.data[0];
        }
   }

   const UpdateRestaurant = async () => {
            //Update
            let updateResult = await axios.put(`http://localhost:3000/restaurant/${id}`,{
                    name: restaurant.value.name, 
                    img: "https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-restaurant-300x300.png",
                    info: restaurant.value.info,
                    address: restaurant.value.address
            });

            if(updateResult.status == 200){
                alert("Updated!");
                router.push({name: 'Home'});
            }
            else {
                alert("Error during the saving process.");
            }
   }

   getRestaurant();
   const user = JSON.parse(localStorage.getItem("user-data"));
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