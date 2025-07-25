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
  },
};
</script>

<style>
.flower {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 50px auto;
  animation-name: rotateFlower;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}

.petal {
  position: absolute;
  width: 35px;
  height: 60px;
  background: linear-gradient(180deg, #ffffff, #ffeef2);
  border-radius: 50%;
  animation-name: changeColor;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  box-shadow: 0 0 20px rgba(255, 150, 180, 0.25);
}

.petal1 {
  transform: rotate(0deg) translateY(-50%);
  animation-delay: 0.1s;
}
.petal2 {
  transform: rotate(45deg) translateY(-50%);
  animation-delay: 0.2s;
}
.petal3 {
  transform: rotate(90deg) translateY(-50%);
  animation-delay: 0.3s;
}
.petal4 {
  transform: rotate(135deg) translateY(-50%);
  animation-delay: 0.4s;
}
.petal5 {
  transform: rotate(180deg) translateY(-50%);
  animation-delay: 0.5s;
}
.petal6 {
  transform: rotate(225deg) translateY(-50%);
  animation-delay: 0.6s;
}
.petal7 {
  transform: rotate(270deg) translateY(-50%);
  animation-delay: 0.7s;
}
.petal8 {
  transform: rotate(315deg) translateY(-50%);
  animation-delay: 0.8s;
}

.center {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #f6d56f;
  border-radius: 50%;
}

@keyframes changeColor {
  0% {
    background: linear-gradient(180deg, #ffffff, #ffeef2);
  }
  25% {
    background: linear-gradient(180deg, #fef9f9, #ffebef);
  }
  50% {
    background: linear-gradient(180deg, #fffafc, #ffe4ec);
  }
  75% {
    background: linear-gradient(180deg, #ffffff, #ffe5f2);
  }
  100% {
    background: linear-gradient(180deg, #fdfdff, #ffeef4);
  }
}

@keyframes rotateFlower {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.5) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}
</style>
