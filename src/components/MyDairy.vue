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

      <!-- Plant Entries -->
      <div v-for="plant in allPlants" :key="plant.id">
        <div class="diary-entry">
          <div class="entry-content">
            <div class="plant-header">
              <h2>{{ plant.name }}</h2>
              <button v-if="!plant.isDefault" class="remove-plant-btn" @click="removePlant(plant.id)" title="Remove Plant">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <p class="tracking-description">
              <i :class="plant.trackingIcon || 'fas fa-camera'"></i>
              {{ plant.trackingDescription || 'Tracking: Phone Camera - Manual photo scanning' }}
            </p>
            <p>{{ plant.status || 'Not yet scanned' }}</p>
            <p class="status-alert">{{ plant.statusAlert || 'Scan to check status' }}</p>
            <div class="moisture">
              <i class="fas fa-tint"></i>
              <span class="moisture-value">{{ plant.moisture !== null ? plant.moisture : '--' }}%</span>
              <span class="moisture-label">Soil Moisture</span>
            </div>
            
            <!-- Action Buttons -->
            <div class="plant-actions">
              <button class="scan-btn" @click="scanPlant(plant)">
                <i class="fas fa-qrcode"></i>
                Scan Now
              </button>
              <button class="moisture-btn" @click="measurePlantSoilMoisture(plant)">
                <i class="fas fa-tint"></i>
                Soil Moisture
              </button>
              <button class="harvest-btn" @click="harvestPlant(plant)">
                <i class="fas fa-cut"></i>
                I want to harvest now
              </button>
            </div>
          </div>

          <img src="/basket.png" alt="Basket" class="basket-icon">

          <div class="dropdown-icon" @click="toggleExpandPlant(plant.id)">
            <i :class="plant.expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
          </div>
        </div>

        <!-- Expanded Image for This Plant (appears directly below the card) -->
        <transition name="fade">
          <div v-if="plant.expanded" class="plant-photo-container">
            <!-- Show plant's custom photo if available, otherwise default image -->
            <img 
              v-if="plant.photo" 
              :src="plant.photo" 
              :alt="plant.name" 
              class="plant-photo custom-photo"
            />
            <img 
              v-else 
              src="/strawberry_pot.png" 
              :alt="plant.name" 
              class="plant-photo default-photo"
            />
            
            <!-- Photo info for custom photos -->
            <div v-if="plant.photo" class="photo-info-overlay">
              <span class="photo-label">
                <i class="fas fa-camera"></i>
                Custom Photo
              </span>
            </div>
          </div>
        </transition>
      </div>

      <!-- Add Another Plant Button -->
      <div class="add-plant-card">
        <button class="add-plant-btn" @click="showAddPlantDialog">
          <i class="fas fa-plus"></i>
          Add Another Plant
        </button>
      </div>

      <!-- Test Notification Buttons (for demonstration) -->
      <div class="test-notifications" style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 12px;">
        <h3 style="margin-bottom: 12px; color: #333;">Test Notifications:</h3>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button @click="testNotifications.success()" style="padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 6px; cursor: pointer;">Success</button>
          <button @click="testNotifications.error()" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 6px; cursor: pointer;">Error</button>
          <button @click="testNotifications.warning()" style="padding: 8px 16px; background: #ff9800; color: white; border: none; border-radius: 6px; cursor: pointer;">Warning</button>
          <button @click="testNotifications.info()" style="padding: 8px 16px; background: #2196F3; color: white; border: none; border-radius: 6px; cursor: pointer;">Info</button>
          <button @click="testNotifications.plant()" style="padding: 8px 16px; background: #9C27B0; color: white; border: none; border-radius: 6px; cursor: pointer;">Plant Alert</button>
        </div>
      </div>

      <!-- Choose Mode Modal -->
      <div v-if="showChooseMode" class="modal-overlay" @click="closeChooseMode">
        <div class="choose-mode-modal" @click.stop>
          <h2>Choose Tracking Mode</h2>
          <p>Select how you want to track your new strawberry plant</p>

          <div class="mode-options">
            <div class="mode-option" 
                 :class="{ selected: selectedMode === 'hardware' }"
                 @click="selectMode('hardware')">
              <div class="mode-icon">
                <i class="fas fa-microchip"></i>
              </div>
              <div class="mode-content">
                <h3>Hardware Device</h3>
                <p>Real-time monitoring with specialized sensors</p>
                <ul>
                  <li>Automatic soil moisture tracking</li>
                  <li>24/7 environmental monitoring</li>
                  <li>Instant alerts and notifications</li>
                </ul>
              </div>
            </div>

            <div class="mode-option" 
                 :class="{ selected: selectedMode === 'phone' }"
                 @click="selectMode('phone')">
              <div class="mode-icon">
                <i class="fas fa-camera"></i>
              </div>
              <div class="mode-content">
                <h3>Phone Camera</h3>
                <p>Manual photo scanning and analysis</p>
                <ul>
                  <li>Take photos when convenient</li>
                  <li>AI-powered strawberry detection</li>
                  <li>Manual growth tracking</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="selectedMode" class="plant-name-section">
            <h3>Name Your Plant</h3>
            <input 
              v-model="newPlantName" 
              :placeholder="defaultPlantName" 
              class="plant-name-input" 
              @keyup.enter="confirmAddPlant"
            />
          </div>

          <div class="modal-actions">
            <button class="btn-cancel" @click="closeChooseMode">Cancel</button>
            <button class="btn-confirm" 
                    @click="confirmAddPlant" 
                    :disabled="!selectedMode">
              Add Plant
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import "./MyDairy.css";
import { notify } from '../services/NotificationService';

export default {
  name: 'MyDairy',
  components: { VueCal },
  data() {
    return {
      plants: [],
      nextPlantNumber: 2, // Start from 2 since Plant 01 is default
      showChooseMode: false,
      selectedMode: null,
      newPlantName: '',
      defaultPlant: {
        id: 'plant-01',
        name: 'Strawberry Plant 01',
        mode: 'hardware',
        trackingDescription: 'Tracking: Hardware Device - Real-time monitoring with specialized sensors',
        trackingIcon: 'fas fa-microchip',
        status: '80% are ready to harvest',
        statusAlert: 'Ready to Harvest!',
        moisture: 72,
        expanded: false,
        isDefault: true,
        dateAdded: new Date().toISOString()
      }
    };
  },
  computed: {
    defaultPlantName() {
      return `Strawberry Plant ${this.nextPlantNumber.toString().padStart(2, '0')}`;
    },
    allPlants() {
      return [this.defaultPlant, ...this.plants];
    }
  },
  mounted() {
    this.loadPlants();
    this.loadDefaultPlant();
    this.checkForNewPlantWithPhoto();
  },
  methods: {
    checkForNewPlantWithPhoto() {
      // Check if returning from photo upload
      if (this.$route.query.addPlantWithPhoto === 'true') {
        const plantDataString = localStorage.getItem('newPlantWithPhoto');
        if (plantDataString) {
          try {
            const plantData = JSON.parse(plantDataString);
            this.addPlant(plantData.name, plantData.mode, plantData);
            
            // Clean up
            localStorage.removeItem('newPlantWithPhoto');
            localStorage.removeItem('newPlantName');
            localStorage.removeItem('newPlantMode');
            
            // Show success notification
            notify.plantAdded(plantData.name);
            
            // Remove query parameter
            this.$router.replace('/my-diary');
          } catch (error) {
            console.error('Error processing plant with photo:', error);
            notify.error('Failed to add plant. Please try again.');
          }
        }
      }
    },
    loadPlants() {
      const savedPlants = localStorage.getItem('myDairyPlants');
      if (savedPlants) {
        this.plants = JSON.parse(savedPlants);
        // Update next plant number based on existing plants
        this.updateNextPlantNumber();
      }
    },
    loadDefaultPlant() {
      // Load saved state for default plant
      const savedDefaultPlant = localStorage.getItem('defaultPlant');
      if (savedDefaultPlant) {
        this.defaultPlant = { ...this.defaultPlant, ...JSON.parse(savedDefaultPlant) };
      }
    },
    savePlants() {
      localStorage.setItem('myDairyPlants', JSON.stringify(this.plants));
    },
    saveDefaultPlant() {
      localStorage.setItem('defaultPlant', JSON.stringify({
        moisture: this.defaultPlant.moisture,
        status: this.defaultPlant.status,
        statusAlert: this.defaultPlant.statusAlert,
        expanded: this.defaultPlant.expanded
      }));
    },
    updateNextPlantNumber() {
      // Find the highest number from existing plant names
      let maxNumber = 1; // Start from 1 since Plant 01 exists
      
      this.plants.forEach(plant => {
        const match = plant.name.match(/Strawberry Plant (\d+)/);
        if (match) {
          const number = parseInt(match[1]);
          if (number > maxNumber) {
            maxNumber = number;
          }
        }
      });
      
      this.nextPlantNumber = maxNumber + 1;
    },
    showAddPlantDialog() {
      this.showChooseMode = true;
      this.selectedMode = null;
      this.newPlantName = '';
    },
    closeChooseMode() {
      this.showChooseMode = false;
      this.selectedMode = null;
      this.newPlantName = '';
    },
    selectMode(mode) {
      this.selectedMode = mode;
    },
    confirmAddPlant() {
      if (!this.selectedMode) return;
      
      const finalName = this.newPlantName.trim() || this.defaultPlantName;
      
      if (this.selectedMode === 'phone') {
        // For phone mode, redirect to photo upload page
        localStorage.setItem('newPlantName', finalName);
        localStorage.setItem('newPlantMode', this.selectedMode);
        
        this.closeChooseMode();
        
        // Navigate to photo upload page
        this.$router.push({
          path: '/add-plant-photo',
          query: {
            plantName: finalName,
            mode: this.selectedMode
          }
        });
      } else {
        // For hardware mode, proceed with current flow
        this.addPlant(finalName, this.selectedMode);
        this.closeChooseMode();
        
        // Show success notification
        notify.plantAdded(finalName);
      }
    },
    addPlant(name, mode, photoData = null) {
      if (!name || !mode) return;
      
      // Create tracking description based on mode
      let trackingDescription = '';
      let trackingIcon = '';
      
      if (mode === 'hardware') {
        trackingDescription = 'Tracking: Hardware Device - Real-time monitoring with specialized sensors';
        trackingIcon = 'fas fa-microchip';
      } else if (mode === 'phone') {
        trackingDescription = 'Tracking: Phone Camera - Manual photo scanning';
        trackingIcon = 'fas fa-camera';
      }
      
      const newPlant = {
        id: Date.now(), // Use timestamp as unique ID
        name: name,
        mode: mode,
        trackingDescription: trackingDescription,
        trackingIcon: trackingIcon,
        status: 'Not yet scanned',
        statusAlert: 'Scan to check status',
        moisture: mode === 'hardware' ? Math.floor(Math.random() * 30) + 50 : null, // Random moisture for hardware
        expanded: false,
        dateAdded: new Date().toISOString(),
        photo: photoData ? photoData.photo : null,
        photoName: photoData ? photoData.photoName : null,
        photoSize: photoData ? photoData.photoSize : null
      };
      
      this.plants.push(newPlant);
      this.updateNextPlantNumber();
      this.savePlants();
      
      console.log(`Added new plant: ${name} with ${mode} tracking`);
    },
    removePlant(plantId) {
      const plantIndex = this.plants.findIndex(p => p.id === plantId);
      if (plantIndex === -1) return;
      
      const plant = this.plants[plantIndex];
      const confirmDelete = confirm(`Are you sure you want to remove "${plant.name}"?`);
      
      if (confirmDelete) {
        this.plants.splice(plantIndex, 1);
        this.updateNextPlantNumber();
        this.savePlants();
        console.log(`Removed plant: ${plant.name}`);
        
        // Show notification
        notify.info(`${plant.name} has been removed from your garden.`);
      }
    },
    toggleExpandPlant(plantId) {
      if (plantId === 'plant-01') {
        // Handle default plant
        this.defaultPlant.expanded = !this.defaultPlant.expanded;
        this.saveDefaultPlant();
      } else {
        // Handle dynamic plants
        const plant = this.plants.find(p => p.id === plantId);
        if (plant) {
          plant.expanded = !plant.expanded;
          this.savePlants();
        }
      }
    },
    scanPlant(plant) {
      console.log(`Scanning plant: ${plant.name} with ${plant.mode} mode`);
      
      // Record scan time for this specific plant
      if (plant.isDefault) {
        localStorage.setItem('lastScanTime', new Date().getTime().toString());
      } else {
        localStorage.setItem(`lastScanTime_${plant.id}`, new Date().getTime().toString());
      }
      
      // Navigate based on tracking mode
      if (plant.mode === 'hardware') {
        // For hardware mode, go to hardware analysis
        this.$router.push('/hardware-analysis');
      } else {
        // For phone camera mode, go to plant scan with photo upload
        this.$router.push({
          path: '/plant-scan',
          query: {
            plantName: plant.name,
            plantId: plant.isDefault ? 'default' : plant.id
          }
        });
      }
    },
    harvestPlant(plant) {
      console.log(`Starting harvest process for: ${plant.name}`);
      
      // Check if there's a recent scan for this specific plant
      let lastScanTime;
      if (plant.isDefault) {
        lastScanTime = localStorage.getItem('lastScanTime');
      } else {
        lastScanTime = localStorage.getItem(`lastScanTime_${plant.id}`);
      }
      
      const now = new Date().getTime();
      const oneHourAgo = now - (60 * 60 * 1000); // 1 hour in milliseconds
      
      if (!lastScanTime || parseInt(lastScanTime) < oneHourAgo) {
        alert(`Please scan "${plant.name}" first to detect the current status before harvesting.`);
        return;
      }
      
      // Generate detection results and navigate to ScannedPhoto page
      const detectedStrawberries = Math.floor(Math.random() * 8) + 5;
      
      // Store data for ScannedPhoto page
      localStorage.setItem('detectedStrawberries', detectedStrawberries);
      localStorage.setItem('currentPlantName', plant.name);
      
      // Navigate to ScannedPhoto page
      this.$router.push({
        path: '/scanned-photo',
        query: {
          detected: detectedStrawberries,
          plantName: plant.name
        }
      });
    },
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
    measurePlantSoilMoisture(plant) {
      console.log(`Measuring soil moisture for: ${plant.name}`);
      
      if (plant.mode === 'hardware') {
        // For hardware mode, simulate real-time sensor reading
        const newMoisture = Math.floor(Math.random() * 40) + 50; // Random between 50-90%
        plant.moisture = newMoisture;
        
        if (plant.isDefault) {
          this.saveDefaultPlant();
        } else {
          this.savePlants();
        }
        
        // Replace alert with notification
        notify.moistureUpdated(plant.name, newMoisture);
        
        // Check if watering is needed
        if (newMoisture < 50) {
          notify.plantWatering(plant.name);
        }
      } else {
        // For phone mode, prompt for manual entry or use sensor if available
        const moistureReading = prompt(`Manual Soil Moisture Entry for ${plant.name}\n\nEnter the soil moisture percentage (0-100):`);
        
        if (moistureReading !== null && !isNaN(moistureReading) && moistureReading >= 0 && moistureReading <= 100) {
          const moisture = parseInt(moistureReading);
          plant.moisture = moisture;
          
          if (plant.isDefault) {
            this.saveDefaultPlant();
          } else {
            this.savePlants();
          }
          
          // Replace alert with notification
          notify.moistureUpdated(plant.name, moisture);
          
          // Check if watering is needed
          if (moisture < 50) {
            notify.plantWatering(plant.name);
          }
        } else if (moistureReading !== null) {
          alert('Please enter a valid number between 0 and 100.');
        }
      }
    },
    
    // Test notification methods
    testNotifications: {
      success() {
        notify.success('🎉 This is a success notification!');
      },
      error() {
        notify.error('❌ This is an error notification!');
      },
      warning() {
        notify.warning('⚠️ This is a warning notification!');
      },
      info() {
        notify.info('ℹ️ This is an info notification!');
      },
      plant() {
        notify.plantReady('Test Plant');
        setTimeout(() => notify.scanComplete('Test Plant', 7), 1000);
        setTimeout(() => notify.harvestSuccess('Test Plant', 5), 2000);
      }
    }
  }
};
</script>
