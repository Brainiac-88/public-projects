<template>
     <Navbar />
    <img alt="Restaurant logo" src="../assets/res-logo.png">
    <div v-if=" store.isLogged" id="main">
        <h1>Welcome {{ user.name }} !</h1>
        <p>Restaurants: {{ restaurants.length }}</p>
        <hr />
        <div class="container">
            <div class="row align-items-center">
                <div class="col"></div>
                <div class="col">
                    <div class="card" v-for="restaurant in restaurants" :key="restaurant.id" style="width:400px; margin-bottom:30px;">
                        <img class="card-img-top" v-bind:src="restaurant.img" alt="Card image">
                        <div class="card-body">
                            <h4 class="card-title">{{ restaurant.name }}</h4>
                            <p class="card-text">{{ restaurant.info }}</p>
                            <p class="card-text">{{ restaurant.address }}</p>
                            <router-link style="float: left" class="btn btn-warning" :to="{ path: '/update-restaurant/'+ restaurant.id}" >Edit</router-link>
                            <a @click="DeleteRestaurant(restaurant.id)" href="#" style="float: right" class="btn btn-danger">Delete</a>
                        </div>
                    </div>
                </div>
                <div class="col"></div>
            </div>
           
        </div>  
      
        
    </div>
</template>

<script setup>
    import Navbar from './Navbar';
    import axios from 'axios';
    import { ref } from 'vue';

    //State management
    import { store } from '../store.js';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const user = JSON.parse(localStorage.getItem("user-data"));
    
    const restaurants = ref([]);

    if(!user){
        router.push({name: 'Login'});
        }
    else{
        store.isLogged = true;
    }
    const GetRestaurants = async () => {
        let result = await axios.get(`http://localhost:3000/restaurant`);
        if(result.status == 200){
            restaurants.value = result.data
        }
    }

    GetRestaurants();
    
    const DeleteRestaurant = async (id) => {
            //Delete
            let deleteResult = await axios.delete(`http://localhost:3000/restaurant/${id}`);
            if(deleteResult.status == 200){
                const index = restaurants.value.findIndex((obj) => obj.id === id);
                restaurants.value.splice(index, 1);
                alert("Deleted!");
            }
    }
</script>