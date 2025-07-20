import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css';


import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from './components/WelcomePage.vue'
import LoginPage from './components/LoginPage.vue'
import ChooseMode from './components/ChooseMode.vue'
import Home from './components/Home.vue';
import MyDairy from './components/MyDairy.vue';
import Tips from './components/Tips.vue';
import StrawberryCycle from './components/strawberry_cycle.vue';
import StrawberryJam from './components/jam_receipe.vue';
import SignupPage from './components/SignUp.vue';
import Settings from './components/Setting.vue'




const routes = [
  { path: '/', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/welcome', component: WelcomePage },
  { path: '/choose-mode', component: ChooseMode },
  { path: '/home', component: Home },
  { path: '/mydairy', name: 'MyDairy', component: MyDairy },
  { path: '/tips', name: 'Tips', component: Tips },
  { path: '/strawberry-cycle', name: 'StrawberryCycle', component: StrawberryCycle },
  { path: '/strawberry-jam', name: 'StrawberryJam', component: StrawberryJam },
  { path: '/setting', component: Settings}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')


import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  components: { VueCal },
  name: 'SettingsPage',
  data() {
    return {
      autoWatering: true
    };
  }
};

