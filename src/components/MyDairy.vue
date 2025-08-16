<template>
  <div class="page-container">
    <!-- Back Button -->
    <div class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i>
    </div>

    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">My Diary</h1>
    </div>

    <!-- Page Content -->
    <div class="page-content">
      <!-- Calendar -->
      <div class="calendar-card">
        <div class="calendar-header">
          <button class="today-btn" @click="goToToday">Today</button>
        </div>
        <vue-cal 
          ref="vuecal"
          style="height: 400px;"
          :time="false"
          default-view="month"
          :events="[]"
          :disable-views="['week', 'day']"
          :today-button="false"
          active-view="month"
          :selected-date="new Date()"
        />
      </div>

      <!-- Static Plant Entry Example -->
      <div class="diary-entry">
        <div class="entry-content">
          <h2>Strawberry Plant 01</h2>
          <p class="tracking-description">
            <i class="fas fa-microchip"></i>
            Tracking: Hardware Device - Real-time monitoring with specialized sensors
          </p>
          <p>80% are ready to harvest</p>
          <p class="status-alert">Ready to Harvest!</p>
          <div class="moisture">
            <i class="fas fa-tint"></i>
            <span class="moisture-value">72%</span>
            <span class="moisture-label">Soil Moisture</span>
          </div>
          
          <!-- Action Buttons -->
          <div class="plant-actions">
            <button class="scan-btn" @click="scanNow">
              <i class="fas fa-qrcode"></i>
              Scan Now
            </button>
            <button class="harvest-btn" @click="harvestNow">
              <i class="fas fa-cut"></i>
              I want to harvest now
            </button>
          </div>
        </div>

        <img src="/basket.png" alt="Basket" class="basket-icon">

        <div class="dropdown-icon" @click="toggleExpand">
          <i :class="expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        </div>
      </div>

      <!-- Expanded Image -->
      <transition name="fade">
        <div v-if="expanded" class="plant-photo-container">
          <img src="/strawberry_pot.png" alt="Strawberry plant" class="plant-photo">
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import "./MyDairy.css";

export default {
  name: 'MyDairy',
  components: { VueCal },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    goBack() {
      console.log('Going back to home page');
      this.$router.push('/home');
    },
    goToToday() {
      console.log('Going to today date');
      // Navigate calendar to today's date
      if (this.$refs.vuecal) {
        this.$refs.vuecal.switchToToday();
      }
    },
    scanNow() {
      console.log('Scanning plant with hardware device');
      // Record scan time for harvest validation
      localStorage.setItem('lastScanTime', new Date().getTime().toString());
      // Navigate to hardware analysis or show scan interface
      this.$router.push('/hardware-analysis');
    },
    harvestNow() {
      console.log('Starting harvest process');
      
      // Check if there's a recent scan (simulate checking for latest photo)
      const lastScanTime = localStorage.getItem('lastScanTime');
      const now = new Date().getTime();
      const oneHourAgo = now - (60 * 60 * 1000); // 1 hour in milliseconds
      
      if (!lastScanTime || parseInt(lastScanTime) < oneHourAgo) {
        alert('Please scan your strawberries first to detect the current status before harvesting.');
        return;
      }
      
      // Simulate detecting strawberries from the latest scan
      alert('Analyzing your latest scanned photo...');
      
      setTimeout(() => {
        // Simulate detection results
        const detectedStrawberries = Math.floor(Math.random() * 8) + 5; // Random between 5-12
        
        const keepCount = prompt(`We detected ${detectedStrawberries} strawberries in your latest scan!\n\nHow many of the best quality strawberries do you want to keep for growing? (Enter a number between 1 and ${detectedStrawberries}):`);
        
        if (keepCount !== null && !isNaN(keepCount) && keepCount >= 1 && keepCount <= detectedStrawberries) {
          console.log(`User wants to keep ${keepCount} out of ${detectedStrawberries} strawberries`);
          // Store the data for strawberry ranking
          localStorage.setItem('strawberriesToKeep', keepCount);
          localStorage.setItem('detectedStrawberries', detectedStrawberries);
          
          // Navigate to strawberry ranking with parameters
          this.$router.push({
            path: '/strawberry-ranking',
            query: {
              detected: detectedStrawberries,
              selected: keepCount
            }
          });
        } else if (keepCount !== null) {
          alert(`Please enter a valid number between 1 and ${detectedStrawberries}.`);
        }
      }, 1500); // 1.5 second delay to simulate analysis
    },
    toggleExpand() {
      console.log('Toggling expand');
      this.expanded = !this.expanded;
    }
  }
};
</script>
