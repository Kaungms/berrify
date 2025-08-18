<template>
  <div class="home">
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

    <!-- Bottom Icon Navigation -->
    <div class="icon-nav">
      <div class="nav-item" @click="$router.push('/home')">
        <i class="fas fa-home"></i>
      </div>
      <div class="nav-item" @click="$router.push('/tips')">
        <i class="fas fa-list"></i>
      </div>
      <div class="nav-item" @click="$router.push('/mydairy')">
        <i class="fas fa-seedling"></i>
      </div>
      <div class="nav-item" @click="$router.push('/setting')">
        <i class="fas fa-cog"></i>
      </div>
      <div class="nav-item" @click="$router.push('/profile')">
        <i class="fas fa-user"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import "./Home.css";

export default {
  name: "Home",
  components: {
    Carousel,
    Slide,
  },
};
</script>
