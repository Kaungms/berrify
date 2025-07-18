<template>
  <div class="app login-page">
    <div class="form-container">
      <h1 class="welcome-text">Welcome to<br /><span>BERRIFY!</span></h1>

      <div class="form-card">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="Value" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" placeholder="Value" />
        </div>
        <button class="btn-main" @click="goToWelcome">Sign In</button>
        <a href="#" class="forgot-link">Forgot password?</a>
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
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  methods: {
  goToWelcome() {
    this.$router.push("/welcome");
  },
  goToSignup() {
    this.$router.push("/signup");
  }
}

};
</script>

