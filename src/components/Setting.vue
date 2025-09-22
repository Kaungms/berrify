<template>
  <div class="page-container">
    <!-- Back Button -->
    <div class="back-button" @click="goHome">
      <i class="fas fa-arrow-left"></i>
    </div>

    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Settings</h1>
    </div>

    <!-- Page Content -->
    <div class="page-content">
      <!-- Auto-Watering Toggle -->
      <div class="setting-card">
        <span>Auto-Watering</span>
        <label class="switch">
          <input type="checkbox" v-model="autoWatering" />
          <span class="slider round"></span>
        </label>
      </div>

      <!-- Notifications Toggle -->
      <div class="setting-card">
        <span>Notifications</span>
        <label class="switch">
          <input type="checkbox" v-model="notifications" />
          <span class="slider round"></span>
        </label>
      </div>

      <div class="social-buttons">
        <button class="btn-social" @click="logout">Logout</button>
        <button class="btn-social danger-button">Delete Account</button>
      </div>

      <!-- Bottom Icon Navigation -->
      <div class="icon-nav">
        <div class="nav-item" @click="$router.push('/home')">
          <i class="fas fa-home"></i>
        </div>
        <div class="nav-item" @click="$router.push('/tips')">
          <i class="fas fa-list"></i>
        </div>
        <div class="nav-item" @click="$router.push('/my-diary')">
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const autoWatering = ref(false);
const notifications = ref(false);
const router = useRouter();

function goHome() {
  router.push("/home");
}

function logout() {
  // Clear any stored user data
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("strawberryPlants");
  localStorage.removeItem("lastScanTime");
  localStorage.removeItem("strawberriesToKeep");
  localStorage.removeItem("detectedStrawberries");

  // Navigate back to login page
  router.push("/");
}
</script>

<style scoped>
.setting-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.setting-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}

.setting-card span {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input:checked + .slider {
  background-color: #896c5f;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.social-buttons {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn-social {
  width: 100%;
  padding: 16px 24px;
  background: white;
  color: #333;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
}

.btn-social:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  border-color: #896c5f;
}

.danger-button {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%) !important;
  color: white !important;
  border-color: #f44336 !important;
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3) !important;
}

.danger-button:hover {
  background: linear-gradient(135deg, #d32f2f 0%, #c62828 100%) !important;
  box-shadow: 0 6px 20px rgba(244, 67, 54, 0.4) !important;
  border-color: #d32f2f !important;
}
</style>
