<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li v-if="showItem" class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li v-if="showItem" class="nav-item">
          <router-link class="nav-link" to="/add-restaurant">Add Restaurant</router-link>
        </li>
        <li v-if="!showItem" class="nav-item">
          <router-link class="nav-link" to="/sign-up">SignUp</router-link>
        </li>
      </ul>
      <ul class="navbar-nav d-flex">       
        <li v-if="showItem" class="nav-item">
          <a class="nav-link" @click="LogOut" href="#">Exit</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script setup>
  //State management
  import { store } from '../store.js';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  let showItem = store.isLogged;

  function LogOut(){
        localStorage.removeItem("user-data");
        store.Logout();
        router.push({name: 'Login'});
        }
</script>

