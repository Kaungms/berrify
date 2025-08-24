<template>
  <div class="page-container">
    <!-- Back Button -->
    <div class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i>
    </div>

    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Add Plant Photo</h1>
      <p class="page-subtitle">Upload a photo of {{ plantName }}</p>
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
            <h3>Add Plant Photo</h3>
            <p>Click to select or drag & drop an image</p>
            <span class="file-types">Supports: JPG, PNG, WEBP</span>
          </div>

          <!-- Preview Image -->
          <div v-if="selectedImage" class="image-preview">
            <img :src="imagePreview" :alt="plantName" />
            <div class="image-overlay">
              <button class="change-photo-btn" @click.stop="triggerFileInput">
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
          @change="handleFileSelect"
          style="display: none;"
        />
      </div>

      <!-- Photo Options -->
      <div v-if="selectedImage" class="photo-options">
        <h3>Photo Details</h3>
        <div class="photo-info">
          <div class="info-item">
            <i class="fas fa-file-image"></i>
            <span>{{ selectedImage.name }}</span>
          </div>
          <div class="info-item">
            <i class="fas fa-weight"></i>
            <span>{{ formatFileSize(selectedImage.size) }}</span>
          </div>
          <div class="info-item">
            <i class="fas fa-calendar"></i>
            <span>{{ new Date().toLocaleDateString() }}</span>
          </div>
        </div>
      </div>

      <!-- Plant Information -->
      <div class="plant-info-section">
        <h3>Plant Information</h3>
        <div class="info-card">
          <div class="info-row">
            <label>Plant Name:</label>
            <span>{{ plantName }}</span>
          </div>
          <div class="info-row">
            <label>Tracking Mode:</label>
            <span>
              <i class="fas fa-camera"></i>
              Phone Camera - Manual photo scanning
            </span>
          </div>
          <div class="info-row">
            <label>Date Added:</label>
            <span>{{ new Date().toLocaleDateString() }}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn-secondary" @click="goBack">
          <i class="fas fa-arrow-left"></i>
          Back
        </button>
        <button 
          class="btn-primary" 
          @click="savePlantWithPhoto"
          :disabled="!selectedImage"
        >
          <i class="fas fa-save"></i>
          Save Plant
        </button>
      </div>

      <!-- Camera Options (Future Enhancement) -->
      <div class="camera-options">
        <h3>Alternative Options</h3>
        <div class="option-buttons">
          <button class="option-btn" @click="openCamera">
            <i class="fas fa-camera"></i>
            Take Photo Now
          </button>
          <button class="option-btn" @click="skipPhoto">
            <i class="fas fa-forward"></i>
            Skip Photo (Add Later)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { notify } from '../services/NotificationService';
import './AddPlantPhoto.css';

export default {
  name: 'AddPlantPhoto',
  data() {
    return {
      selectedImage: null,
      imagePreview: null,
      isDragOver: false,
      plantName: 'New Plant',
      plantMode: 'phone'
    };
  },
  mounted() {
    // Get plant details from query parameters or localStorage
    this.loadPlantDetails();
  },
  methods: {
    loadPlantDetails() {
      // Get from query parameters
      if (this.$route.query.plantName) {
        this.plantName = this.$route.query.plantName;
      }
      if (this.$route.query.mode) {
        this.plantMode = this.$route.query.mode;
      }
      
      // Fallback to localStorage
      const storedPlantName = localStorage.getItem('newPlantName');
      const storedPlantMode = localStorage.getItem('newPlantMode');
      
      if (storedPlantName) this.plantName = storedPlantName;
      if (storedPlantMode) this.plantMode = storedPlantMode;
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
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        notify.error('Image size should be less than 10MB.');
        return;
      }
      
      this.selectedImage = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
        notify.success('Photo selected successfully! 📸');
      };
      reader.readAsDataURL(file);
    },
    
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    async savePlantWithPhoto() {
      if (!this.selectedImage) {
        notify.warning('Please select a photo first.');
        return;
      }
      
      try {
        // Convert image to base64 for storage
        const base64Image = await this.convertToBase64(this.selectedImage);
        
        // Create plant object with photo
        const plantData = {
          name: this.plantName,
          mode: this.plantMode,
          photo: base64Image,
          photoName: this.selectedImage.name,
          photoSize: this.selectedImage.size,
          dateAdded: new Date().toISOString()
        };
        
        // Store plant data
        localStorage.setItem('newPlantWithPhoto', JSON.stringify(plantData));
        
        notify.success(`${this.plantName} saved with photo! 🌱`);
        
        // Navigate back to diary to complete the plant addition
        this.$router.push('/my-diary?addPlantWithPhoto=true');
        
      } catch (error) {
        console.error('Error saving plant photo:', error);
        notify.error('Failed to save photo. Please try again.');
      }
    },
    
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    
    openCamera() {
      // For future implementation - open device camera
      notify.info('Camera feature coming soon! For now, please select from gallery.');
    },
    
    skipPhoto() {
      // Save plant without photo
      const plantData = {
        name: this.plantName,
        mode: this.plantMode,
        photo: null,
        dateAdded: new Date().toISOString()
      };
      
      localStorage.setItem('newPlantWithPhoto', JSON.stringify(plantData));
      notify.info('Plant saved without photo. You can add a photo later.');
      
      this.$router.push('/my-diary?addPlantWithPhoto=true');
    },
    
    goBack() {
      // Clear temporary data
      localStorage.removeItem('newPlantName');
      localStorage.removeItem('newPlantMode');
      this.$router.push('/my-diary');
    }
  }
};
</script>
