<template>
  <div class="app admin-login-page">
    <div class="form-container">
      <!-- 🌸 Show form only when not loading -->
      <div v-if="!isLoading">
        <h1 class="welcome-text">
          Welcome to<br /><span>BERRIFY ADMIN!</span>
        </h1>

        <div class="form-card">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button class="btn-main" @click="handleLogin">Sign In</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
      </div>

      <!-- 🌸 Show flower loader only when loading -->
      <div v-else class="flower">
        <div class="petal petal1"></div>
        <div class="petal petal2"></div>
        <div class="petal petal3"></div>
        <div class="petal petal4"></div>
        <div class="petal petal5"></div>
        <div class="petal petal6"></div>
        <div class="petal petal7"></div>
        <div class="petal petal8"></div>
        <div class="center"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "./AdminLogin.css";

export default {
  name: "AdminLogin",
  data() {
    return {
      isLoading: false,
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = "";
      this.isLoading = true;

      // Allow anyone to login without authentication
      alert("✅ Login successful!");
      // Navigate to admin page or dashboard
      this.$router.push("/adminpage");
      this.isLoading = true;
    },
  },
};
</script>
