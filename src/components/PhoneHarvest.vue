<template>
  <div class="page-container">
    <!-- Back Button -->
    <div class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i>
    </div>

    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Harvest {{ plantName }}</h1>
      <p class="page-subtitle">Record your strawberry harvest</p>
    </div>

    <!-- Page Content -->
    <div class="page-content">
      <!-- Harvest Card -->
      <div class="harvest-card">
        <div class="harvest-icon">
          <i class="fas fa-strawberry"></i>
        </div>
        
        <h2>How many strawberries did you harvest?</h2>
        <p class="harvest-description">Enter the number of strawberries you collected from {{ plantName }}</p>
        
        <!-- Number Input -->
        <div class="number-input-section">
          <div class="number-input-container">
            <button class="decrease-btn" @click="decreaseCount" :disabled="harvestCount <= 0">
              <i class="fas fa-minus"></i>
            </button>
            
            <input 
              type="number" 
              v-model.number="harvestCount" 
              min="0" 
              max="100"
              class="harvest-input"
              @input="validateInput"
            />
            
            <button class="increase-btn" @click="increaseCount">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          
          <div class="input-label">
            <i class="fas fa-strawberry"></i>
            <span>Strawberries</span>
          </div>
        </div>

        <!-- Quick Select Buttons -->
        <div class="quick-select">
          <h3>Quick Select</h3>
          <div class="quick-buttons">
            <button 
              v-for="count in quickCounts" 
              :key="count"
              class="quick-btn"
              :class="{ active: harvestCount === count }"
              @click="setCount(count)">
              {{ count }}
            </button>
          </div>
        </div>

        <!-- Harvest History Preview -->
        <div v-if="previousHarvests.length > 0" class="history-preview">
          <h3>Previous Harvests</h3>
          <div class="history-items">
            <div v-for="(harvest, index) in previousHarvests.slice(0, 3)" :key="index" class="history-item">
              <span class="history-count">{{ harvest.count }} strawberries</span>
              <span class="history-date">{{ formatDate(harvest.date) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn-secondary" @click="goBack">
          <i class="fas fa-times"></i>
          Cancel
        </button>
        <button 
          class="btn-primary" 
          @click="saveHarvest"
          :disabled="harvestCount < 0">
          <i class="fas fa-check"></i>
          Save Harvest
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { notify } from '../services/NotificationService';
import './PhoneHarvest.css';

export default {
  name: 'PhoneHarvest',
  data() {
    return {
      plantName: 'Plant',
      plantId: null,
      harvestCount: 0,
      quickCounts: [5, 10, 15, 20, 25],
      previousHarvests: []
    };
  },
  mounted() {
    this.loadPlantDetails();
    this.loadHarvestHistory();
  },
  methods: {
    loadPlantDetails() {
      // Get plant details from query parameters
      if (this.$route.query.plantName) {
        this.plantName = this.$route.query.plantName;
      }
      if (this.$route.query.plantId) {
        this.plantId = this.$route.query.plantId;
      }
    },

    loadHarvestHistory() {
      // Load previous harvests for this plant
      const historyKey = this.plantId ? `harvestHistory_${this.plantId}` : 'harvestHistory_default';
      const savedHistory = localStorage.getItem(historyKey);
      
      if (savedHistory) {
        this.previousHarvests = JSON.parse(savedHistory);
        // Sort by date (most recent first)
        this.previousHarvests.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    },

    increaseCount() {
      if (this.harvestCount < 100) {
        this.harvestCount++;
      }
    },

    decreaseCount() {
      if (this.harvestCount > 0) {
        this.harvestCount--;
      }
    },

    setCount(count) {
      this.harvestCount = count;
    },

    validateInput() {
      // Ensure the input is within valid range
      if (this.harvestCount < 0) {
        this.harvestCount = 0;
      } else if (this.harvestCount > 100) {
        this.harvestCount = 100;
      }
    },

    saveHarvest() {
      if (this.harvestCount < 0) return;

      const harvestData = {
        count: this.harvestCount,
        date: new Date().toISOString(),
        plantName: this.plantName,
        plantId: this.plantId
      };

      // Add to harvest history
      this.previousHarvests.unshift(harvestData);
      
      // Keep only last 20 harvests
      if (this.previousHarvests.length > 20) {
        this.previousHarvests = this.previousHarvests.slice(0, 20);
      }

      // Save to localStorage
      const historyKey = this.plantId ? `harvestHistory_${this.plantId}` : 'harvestHistory_default';
      localStorage.setItem(historyKey, JSON.stringify(this.previousHarvests));

      // Update total harvest count for the plant
      this.updateTotalHarvest();

      // Show success notification
      if (this.harvestCount === 0) {
        notify.info(`No strawberries harvested from ${this.plantName} today.`);
      } else if (this.harvestCount === 1) {
        notify.success(`Harvested 1 strawberry from ${this.plantName}! 🍓`);
      } else {
        notify.success(`Harvested ${this.harvestCount} strawberries from ${this.plantName}! 🍓`);
      }

      // Navigate back to My Diary
      this.$router.push('/my-diary');
    },

    updateTotalHarvest() {
      // Calculate total harvests for this plant
      const totalStrawberries = this.previousHarvests.reduce((total, harvest) => total + harvest.count, 0);
      
      // Save total harvest count
      const totalKey = this.plantId ? `totalHarvest_${this.plantId}` : 'totalHarvest_default';
      localStorage.setItem(totalKey, totalStrawberries.toString());
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const today = new Date();
      const diffTime = today - date;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      
      return date.toLocaleDateString();
    },

    goBack() {
      this.$router.push('/my-diary');
    }
  }
};
</script>
