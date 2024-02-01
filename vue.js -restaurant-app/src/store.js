import { reactive } from 'vue'

export const store = reactive({
  isLogged: false,
  Login(){
    this.isLogged = true;
  },
  Logout(){
    this.isLogged = false;
  }
})