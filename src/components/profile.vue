<template>
  <div class="page-container">
    <!-- Back Button -->
    <div class="back-button" @click="$router.go(-1)">
      <i class="fas fa-arrow-left"></i>
    </div>

    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Profile</h1>
    </div>

    <!-- Page Content -->
    <div class="page-content">
      <!-- Add New Strawberry Plant Button -->
      <button class="add-plant-btn" @click="showChooseMode = true" v-if="!showChooseMode">
        Add New Strawberry Plant
      </button>

      <!-- Choose Mode Section (embedded) -->
      <div v-if="showChooseMode" class="choose-mode-section">
        <h2>Choose Tracking Mode</h2>
        <p>Choose how you want to track your strawberry plant</p>

        <div class="option-card">
          <div class="option" 
               :class="{ selected: selectedOption === 'hardware' }"
               @click="selectOption('hardware')">
            <div class="option-icon">
              <i class="fas fa-microchip"></i>
            </div>
            <div class="option-content">
              <strong>Hardware</strong>
              <span>Use Specialized hardware device</span>
            </div>
          </div>

          <div class="option" 
               :class="{ selected: selectedOption === 'phone' }"
               @click="selectOption('phone')">
            <div class="option-icon">
              <i class="fas fa-camera"></i>
            </div>
            <div class="option-content">
              <strong>Phone</strong>
              <span>Use your phone camera</span>
            </div>
          </div>
        </div>

        <!-- Plant Name Input -->
        <div v-if="selectedOption" class="plant-name-section">
          <h3>Name Your Plant</h3>
          <input v-model="newPlantName" placeholder="e.g. Strawberry 01" class="plant-name-input" />
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn-secondary" @click="cancelAddPlant">Cancel</button>
          <button class="btn-primary" @click="addPlant" :disabled="!selectedOption || !newPlantName">
            Add Plant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
  data() {
    return {
      showChooseMode: false,
      selectedOption: null,
      newPlantName: ""
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
    },
    addPlant() {
      if (!this.selectedOption || !this.newPlantName.trim()) {
        alert("Please select a mode and enter a plant name.");
        return;
      }
      
      // Save new plant data to localStorage
      const plants = JSON.parse(localStorage.getItem('strawberryPlants') || '[]');
      plants.push({
        name: this.newPlantName.trim(),
        mode: this.selectedOption,
        dateAdded: new Date().toISOString()
      });
      localStorage.setItem('strawberryPlants', JSON.stringify(plants));
      
      // Reset form
      this.showChooseMode = false;
      this.selectedOption = null;
      this.newPlantName = "";
      
      // Show success message instead of navigating
      alert("Plant added successfully!");
    },
    cancelAddPlant() {
      this.showChooseMode = false;
      this.selectedOption = null;
      this.newPlantName = "";
    }
  }
};
</script>

<style scoped>
.add-plant-btn {
  width: 100%;
  padding: 20px 24px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 25px rgba(76, 175, 80, 0.3);
  letter-spacing: 0.5px;
}

.add-plant-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.4);
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
}

.choose-mode-section {
  background: white;
  padding: 32px;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.choose-mode-section h2 {
  margin-bottom: 12px;
  color: #333;
  font-size: 24px;
  font-weight: 700;
}

.choose-mode-section p {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.5;
}

.option-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.option {
  display: flex;
  align-items: center;
  padding: 24px;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  gap: 20px;
}

.option:hover {
  border-color: #4CAF50;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.1);
}

.option.selected {
  border-color: #4CAF50;
  background: linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 100%);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.2);
}

.option-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.option.selected .option-icon {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
}

.option-icon i {
  font-size: 28px;
  color: #4CAF50;
  transition: all 0.3s ease;
}

.option.selected .option-icon i {
  color: white;
  transform: scale(1.1);
}

.option-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-content strong {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.option-content span {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 500;
}

.plant-name-section {
  margin-bottom: 30px;
}

.plant-name-section h3 {
  margin-bottom: 12px;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.plant-name-input {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background: white;
}

.plant-name-input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.1);
  transform: translateY(-1px);
}

.action-buttons {
  display: flex;
  gap: 20px;
}

.btn-secondary, .btn-primary {
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.btn-secondary {
  background: white;
  color: #333;
  border: 2px solid #e0e0e0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border-color: #4CAF50;
  color: #4CAF50;
}

.btn-primary {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
