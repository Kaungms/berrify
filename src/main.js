import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css';


import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from './components/WelcomePage.vue'
import LoginPage from './components/LoginPage.vue'
import ChooseMode from './components/ChooseMode.vue'
import Home from './components/Home.vue';


const routes = [
  { path: '/', component: LoginPage },
  { path: '/welcome', component: WelcomePage },
  { path: '/choose-mode', component: ChooseMode },
  { path: '/home', component: Home }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')

