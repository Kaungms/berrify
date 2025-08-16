<template>
  <div class="welcome">
    <h1>Welcome to Berrify</h1>
    <p>Your strawberry tracking companion</p>
    <button class="btn-main" @click="goToHome">Get Started</button>
  </div>
</template>

<script>
export default {
  name: "WelcomePage",
  methods: {
    goToHome() {
      this.$router.push("/home");
    }
  }
};
</script>


