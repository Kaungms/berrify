<template>
  <div class="app signup-page">
    <div class="form-container">
      <h1 class="welcome-text">
        Create Your<br /><span>BERRIFY</span> Account
      </h1>

      <div class="form-card">
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" type="name" placeholder="Enter your Name" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="Enter your email" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
          />
        </div>

        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm password"
          />
        </div>

        <button class="btn-main" @click="goToWelcome">Sign Up</button>
      </div>

      <p class="login-link">
        Already have an account?
        <span @click="goToLogin">Log In</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  methods: {
    goToWelcome() {
      this.$router.push("/welcome");
    },
    goToLogin() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.signup-page {
  background: #8ab58a;
  min-height: 100vh;
  padding: 20px;
}

.form-container {
  max-width: 400px;
  margin: 0 auto;
}

.form-card {
  background: white;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group input {
  width: 90%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.btn-main {
  width: 100%;
  padding: 12px;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.login-link {
  margin-top: 20px;
  text-align: center;
}

.login-link span {
  color: blue;
  font-weight: bold;
  cursor: pointer;
}
</style>
