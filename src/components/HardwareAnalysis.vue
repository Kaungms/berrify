<template>
  <div class="hardware-analysis">
    <!-- Header with back button -->
    <div class="header">
      <div class="back-button" @click="$router.go(-1)">
        <i class="fas fa-arrow-left"></i>
      </div>
      <h1>Hardware Analysis</h1>
    </div>

    <!-- Hardware Device Card -->
    <div class="device-card">
      <div class="device-icon">
        <i class="fas fa-hdd"></i>
      </div>
      <h2>Hardware Device</h2>
      
      <div class="connection-status">
        <h3>Device Connected</h3>
        <p>Please take the picture of your strawberries</p>
      </div>

      <button class="scan-button" @click="startScan">
        Scan
      </button>
    </div>
  </div>
</template>

<script>
import "./HardwareAnalysis.css";

export default {
  name: "HardwareAnalysis",
  methods: {
    startScan() {
      // Navigate to scanned photo results
      console.log("Starting scan...");
      this.$router.push('/scanned-photo');
    }
  }
};
</script>
