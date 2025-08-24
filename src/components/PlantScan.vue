<template>
  <div class="page-container">
    <!-- Back Button -->
    <div class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i>
    </div>

    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Scan {{ plantName }}</h1>
      <p class="page-subtitle">Upload a photo to analyze your strawberry plant</p>
    </div>

    <!-- Page Content -->
    <div class="page-content">
      <!-- Upload Area -->
      <div class="upload-section">
        <div class="upload-area" 
             :class="{ 'has-image': selectedImage, 'drag-over': isDragOver }"
             @click="triggerFileInput"
             @drop="handleDrop"
             @dragover.prevent="isDragOver = true"
             @dragleave="isDragOver = false"
             @dragenter.prevent>
          
          <!-- Upload Icon and Text -->
          <div v-if="!selectedImage" class="upload-content">
            <div class="upload-icon">
              <i class="fas fa-camera"></i>
            </div>
            <h3>Take or Upload Plant Photo</h3>
            <p>Click to select a photo or drag and drop</p>
            <div class="supported-formats">
              <span>Supported: JPG, PNG, WEBP</span>
            </div>
          </div>

          <!-- Preview Image -->
          <div v-if="selectedImage" class="image-preview">
            <img :src="imagePreview" :alt="plantName" />
            <div class="image-overlay">
              <button class="change-photo-btn" @click="triggerFileInput">
                <i class="fas fa-edit"></i>
                Change Photo
              </button>
            </div>
          </div>
        </div>

        <!-- Hidden File Input -->
        <input 
          ref="fileInput" 
          type="file" 
          accept="image/*" 
          style="display: none"
          @change="handleFileSelect"
        />
      </div>

      <!-- Plant Info Section -->
      <div v-if="selectedImage" class="analysis-section">
        <div class="analysis-card">
          <h3>
            <i class="fas fa-search"></i>
            Analyzing {{ plantName }}
          </h3>
          <div class="analysis-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: analysisProgress + '%' }"></div>
            </div>
            <span class="progress-text">{{ analysisProgress }}% Complete</span>
          </div>
          <div v-if="analysisComplete" class="analysis-results">
            <div class="result-item">
              <i class="fas fa-strawberry"></i>
              <span>{{ detectedStrawberries }} strawberries detected</span>
            </div>
            <div class="result-item">
              <i class="fas fa-leaf"></i>
              <span>Plant health: {{ plantHealth }}</span>
            </div>
            <div class="result-item">
              <i class="fas fa-calendar"></i>
              <span>Growth stage: {{ growthStage }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn-secondary" @click="goBack">
          <i class="fas fa-arrow-left"></i>
          Cancel
        </button>
        <button 
          class="btn-primary" 
          @click="completeScan"
          :disabled="!analysisComplete">
          <i class="fas fa-check"></i>
          Complete Scan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { notify } from '../services/NotificationService';
import './PlantScan.css';

export default {
  name: 'PlantScan',
  data() {
    return {
      selectedImage: null,
      imagePreview: null,
      isDragOver: false,
      plantName: 'Plant',
      plantId: null,
      analysisProgress: 0,
      analysisComplete: false,
      detectedStrawberries: 0,
      plantHealth: 'Excellent',
      growthStage: 'Flowering'
    };
  },
  mounted() {
    this.loadPlantDetails();
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

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        this.processSelectedFile(file);
      }
    },
    
    handleDrop(event) {
      event.preventDefault();
      this.isDragOver = false;
      
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
          this.processSelectedFile(file);
        } else {
          notify.error('Please select a valid image file.');
        }
      }
    },
    
    processSelectedFile(file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        notify.error('Please select a JPG, PNG, or WEBP image.');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        notify.error('File size must be less than 10MB.');
        return;
      }

      this.selectedImage = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
        this.startAnalysis();
      };
      reader.readAsDataURL(file);
      
      notify.info(`Photo selected: ${file.name}`);
    },

    startAnalysis() {
      // Reset analysis state
      this.analysisProgress = 0;
      this.analysisComplete = false;
      
      // Simulate analysis progress
      const interval = setInterval(() => {
        this.analysisProgress += 10;
        
        if (this.analysisProgress >= 100) {
          clearInterval(interval);
          this.completeAnalysis();
        }
      }, 200);
    },

    completeAnalysis() {
      // Generate random analysis results
      this.detectedStrawberries = Math.floor(Math.random() * 12) + 3; // 3-15 strawberries
      this.plantHealth = ['Excellent', 'Good', 'Fair'][Math.floor(Math.random() * 3)];
      this.growthStage = ['Flowering', 'Fruiting', 'Ripening'][Math.floor(Math.random() * 3)];
      
      this.analysisComplete = true;
      
      notify.scanComplete(this.plantName, this.detectedStrawberries);
    },

    completeScan() {
      if (!this.analysisComplete) return;

      // Store scan results for the plant
      const scanData = {
        plantId: this.plantId,
        plantName: this.plantName,
        detectedStrawberries: this.detectedStrawberries,
        plantHealth: this.plantHealth,
        growthStage: this.growthStage,
        scanDate: new Date().toISOString(),
        photo: this.imagePreview
      };

      // Save to localStorage for the plant
      if (this.plantId) {
        localStorage.setItem(`lastScanTime_${this.plantId}`, new Date().getTime().toString());
        localStorage.setItem(`scanData_${this.plantId}`, JSON.stringify(scanData));
      } else {
        // For default plant
        localStorage.setItem('lastScanTime', new Date().getTime().toString());
        localStorage.setItem('scanData_default', JSON.stringify(scanData));
      }

      notify.success(`Scan completed for ${this.plantName}! Found ${this.detectedStrawberries} strawberries.`);
      
      // Navigate back to MyDiary
      this.$router.push('/my-diary');
    },
    
    goBack() {
      this.$router.push('/my-diary');
    }
  }
};
</script>
