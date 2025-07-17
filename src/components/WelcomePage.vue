<template>
  <div class="app welcome-screen">
    <h1>Welcome to<br /><span>BERRIFY!</span></h1>
    <img src="/berry.png" alt="Berry Icon" class="berry-image" />
    <p class="description">
      “Its time to get your plants settled in and ready to grow strong and healthy.”
    </p>
    <button class="btn-main" @click="$router.push('/choose-mode')">Get Started</button>
  </div>
</template>

<script>
export default {
  name: "WelcomePage",
};
</script>
