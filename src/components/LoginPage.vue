<template>
  <div class="app login-page">
    <div class="form-container">
      <!-- 🌸 Show form only when not loading -->
      <div v-if="!isLoading">
        <h1 class="welcome-text">Welcome to<br /><span>BERRIFY!</span></h1>

        <div class="form-card">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button class="btn-main" @click="handleLogin">Sign In</button>
          <a href="#" class="forgot-link" @click="goToForgotPassword">Forgot password?</a>
        </div>

        <p class="signup-link">
          Don't have an account?
          <span @click="goToSignup">Sign Up</span>
        </p>

        <div class="social-buttons">
          <button class="btn-social">Continue with Apple</button>
          <button class="btn-social">Continue with Google</button>
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
import "./LoginPage.css";

export default {
  name: "LoginPage",
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    handleLogin() {
      this.isLoading = true;

      // Simulate authentication delay (2s)
      setTimeout(() => {
        this.$router.push("/welcome");
      }, 2000);
    },
    goToSignup() {
      this.$router.push("/signup");
    },
    goToForgotPassword() {
      this.$router.push("/forgot-password");
    },
  },
};
</script>
