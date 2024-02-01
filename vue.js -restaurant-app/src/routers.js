import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import RestaurantAdd from './components/RestaurantAdd';
import RestaurantUpdate from './components/RestaurantUpdate';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'        
    },
    {
        name: 'SignUp',
        component: SignUp,
        path:'/sign-up'        
    },
    {
        name: 'Login',
        component: Login,
        path:'/login'        
    },
    {
        name: 'RestaurantAdd',
        component: RestaurantAdd,
        path:'/add-restaurant'        
    },
    {
        name: 'RestaurantUpdate',
        component: RestaurantUpdate,
        path:'/update-restaurant/:id'        
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;


