<template>
  <div class="setting">
    <!-- Back Button -->
    <div class="back-button" @click="$router.push('/home')">
      <i class="fas fa-arrow-left"></i>
    </div>

    <!-- Header -->
    <h1 class="settings-title">Settings</h1>

    <!-- Auto-Watering Toggle -->
    <div class="setting-card">
      <span>Auto-Watering</span>
      <label class="switch"> 
      <input type="checkbox" v-model="autoWatering">
      <span class="slider round"></span>
      </label>
    </div>

    <!-- Notifications Toggle -->
    <div class="setting-card">
      <span>Notifications</span>
      <label class="switch"> 
      <input type="checkbox" v-model="Notifications">
      <span class="slider round"></span>
      </label>
    </div>

    <div class="social-buttons">
        <button class="btn-social">Logout</button>
        <button class="btn-social danger-button">Delete Account</button>
      </div>

  </div>
</template>

