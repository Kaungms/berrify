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
  min-height: 100vh;
  background: linear-gradient(135deg, #8AB58A 0%, #A8D4A8 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-container {
  background: white;
  border-radius: 24px;
  padding: 40px 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;
}

.welcome-text {
  color: #333;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
  line-height: 1.2;
}

.welcome-text span {
  color: #4CAF50;
  font-weight: 800;
}

.form-card {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  background: white;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.1);
  transform: translateY(-1px);
}

.btn-main {
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  letter-spacing: 0.5px;
  margin-top: 16px;
}

.btn-main:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
}

.login-link {
  color: #666;
  font-size: 14px;
  margin-top: 20px;
}

.login-link span {
  color: #4CAF50;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: all 0.3s ease;
}

.login-link span:hover {
  color: #45a049;
  text-decoration: none;
  text-shadow: 0 1px 3px rgba(76, 175, 80, 0.3);
}

/* Responsive Design */
@media (max-width: 480px) {
  .signup-page {
    padding: 15px;
  }
  
  .form-container {
    padding: 32px 24px;
  }
  
  .welcome-text {
    font-size: 24px;
  }
}
</style>

