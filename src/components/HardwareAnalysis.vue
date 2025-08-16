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
        <h3 v-if="!isScanning && !scanComplete">Device Connected</h3>
        <h3 v-if="isScanning">Scanning in Progress...</h3>
        <h3 v-if="scanComplete" class="scan-done">Done Scanning!</h3>
        
        <p v-if="!isScanning && !scanComplete">Please take the picture of your strawberries</p>
        <p v-if="isScanning">Please wait while we analyze your strawberries...</p>
        <p v-if="scanComplete" class="thank-you-message">Thank you for updating! Your scanned photo has been saved.</p>
      </div>

      <button v-if="!scanComplete" class="scan-button" @click="startScan" :disabled="isScanning">
        <i v-if="isScanning" class="fas fa-spinner fa-spin"></i>
        <i v-else class="fas fa-camera"></i>
        {{ isScanning ? 'Scanning...' : 'Scan' }}
      </button>

      <button v-if="scanComplete" class="back-to-diary-button" @click="backToDiary">
        <i class="fas fa-arrow-left"></i>
        Back to My Diary
      </button>
    </div>
  </div>
</template>

<script>
import "./HardwareAnalysis.css";

export default {
  name: "HardwareAnalysis",
  data() {
    return {
      isScanning: false,
      scanComplete: false
    };
  },
  methods: {
    startScan() {
      console.log("Starting scan...");
      this.isScanning = true;
      
      // Simulate scanning process
      setTimeout(() => {
        this.isScanning = false;
        this.scanComplete = true;
        console.log("Scan completed!");
      }, 3000); // 3 second scanning simulation
    },
    backToDiary() {
      // Navigate back to My Diary
      console.log("Going back to My Diary...");
      this.$router.push('/mydairy');
    }
  }
};
</script>
