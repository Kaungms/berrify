<template>
  <div class="home">
    <div class="menu-bar" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </div>

    <h1>Welcome to Berrify</h1>
    <h2>Tips</h2>
    <carousel
      :items-to-show="1"
      :wrap-around="true"
      :transition="500"
      :navigation-enabled="true"
    >
      <slide>
        <img src="/tips_banner.png" alt="Strawberry 1" class="carousel-img" />
      </slide>
      <slide>
        <img src="/tips_banner.png" alt="Strawberry 2" class="carousel-img" />
      </slide>
      <slide>
        <img src="/tips_banner.png" alt="Strawberry 3" class="carousel-img" />
      </slide>
    </carousel>

    <p>Choose how you want to analyze your strawberries</p>

    <div class="sidebar" :class="{ open: sidebarOpen }">
      <ul>
        <li @click="$router.push('/')">Home</li>
        <li @click="$router.push('/tips')">Tips</li>
        <li @click="$router.push('/mydairy')">My Dairy</li>
        <li>Notifications</li>
        <li>Profile</li>
        <li @click="$router.push('/setting')">Settings</li>
      </ul>
    </div>

    <div v-if="sidebarOpen" class="overlay" @click="toggleSidebar"></div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  name: "Home",
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      sidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
};
</script>

<style scoped>
.home {
  position: relative;
  padding: 20px;
  min-height: 100vh;
  background: #8ab58a;
  color: black;
}

.menu-bar {
  position: fixed;
  top: 10px;
  left: 10px;
  font-size: 28px;
  cursor: pointer;
  color: black;
  z-index: 1100;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
  padding: 20px;
  transition: left 0.3s ease;
  z-index: 1000;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.sidebar.open {
  left: 0;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin-top: 40px;
}

.sidebar li {
  margin-bottom: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.sidebar li:hover {
  color: #4caf50;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 500;
}

.carousel-img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  max-height: 250px;
}
</style>
