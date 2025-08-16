<template>
  <div class="app forgot-password-page">
    <div class="form-container">
      <!-- Back Button -->
      <div class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i>
      </div>

      <!-- Main Content -->
      <div v-if="!isLoading && !emailSent">
        <h1 class="title">Forgot Password?</h1>
        <p class="subtitle">No worries! Enter your email address and we'll send you a reset link.</p>

        <div class="form-card">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              id="email" 
              type="email" 
              placeholder="Enter your email address"
              v-model="email"
              :class="{ 'error': emailError }"
              @input="clearError"
            />
            <span v-if="emailError" class="error-message">{{ emailError }}</span>
          </div>
          
          <button class="btn-main" @click="sendResetEmail" :disabled="!email">
            Send Reset Link
          </button>
        </div>

        <p class="back-to-login">
          Remember your password? 
          <span @click="goToLogin">Sign In</span>
        </p>
      </div>

      <!-- Loading State -->
      <div v-else-if="isLoading" class="loading-state">
        <div class="spinner">
          <i class="fas fa-envelope fa-spin"></i>
        </div>
        <h2>Sending Reset Link...</h2>
        <p>Please wait while we send the reset link to your email.</p>
      </div>

      <!-- Success State -->
      <div v-else class="success-state">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2>Reset Link Sent!</h2>
        <p class="success-message">
          We've sent a password reset link to <strong>{{ email }}</strong>
        </p>
        <p class="instructions">
          Check your email and click the link to reset your password. 
          Don't forget to check your spam folder!
        </p>
        
        <div class="action-buttons">
          <button class="btn-secondary" @click="resendEmail">
            <i class="fas fa-redo"></i>
            Resend Email
          </button>
          <button class="btn-main" @click="goToLogin">
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./Forgotpassword.css";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      emailError: "",
      isLoading: false,
      emailSent: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goToLogin() {
      this.$router.push('/');
    },
    clearError() {
      this.emailError = "";
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    sendResetEmail() {
      // Clear previous errors
      this.emailError = "";

      // Validate email
      if (!this.email) {
        this.emailError = "Please enter your email address";
        return;
      }

      if (!this.validateEmail(this.email)) {
        this.emailError = "Please enter a valid email address";
        return;
      }

      // Start loading
      this.isLoading = true;

      // Simulate sending email (2-3 seconds)
      setTimeout(() => {
        this.isLoading = false;
        this.emailSent = true;
        console.log(`Reset email sent to: ${this.email}`);
      }, 2500);
    },
    resendEmail() {
      this.isLoading = true;
      
      // Simulate resending email
      setTimeout(() => {
        this.isLoading = false;
        alert("Reset link has been resent to your email!");
      }, 1500);
    }
  }
};
</script>
