<template>
  <div class="profile-page">
    <!-- Top Section -->
    <div class="profile-header">
      <img src="/userImage.png" class="profile-avatar" />
      <h2 class="profile-name">User</h2>
    </div>

    <!-- My Strawberries Section -->
    <section class="section">
      <h3 class="section-title">My Strawberries</h3>
      <div class="strawberries-grid">
        <!-- Loop through user's plants -->
        <div
          class="strawberry-card"
          v-for="(plant, index) in userPlants"
          :key="index"
        >
          <img
            src="/strawberries.png"
            alt="Strawberry"
            class="strawberry-img"
          />
        </div>
      </div>
    </section>

    <!-- Add New Strawberry Button -->
    <button
      class="add-plant-btn"
      @click="showChooseMode = true"
      v-if="!showChooseMode"
    >
      Add New Strawberry Plant
    </button>

    <!-- Choose Mode Section -->
    <div v-if="showChooseMode" class="choose-mode-section">
      <h2>Choose Tracking Mode</h2>
      <p>Choose how you want to track your strawberry plant</p>

      <div class="option-card">
        <div
          class="option"
          :class="{ selected: selectedOption === 'hardware' }"
          @click="selectOption('hardware')"
        >
          <div class="option-icon"><i class="fas fa-microchip"></i></div>
          <div class="option-content">
            <strong>Hardware</strong>
            <span>Use Specialized hardware device</span>
          </div>
        </div>

        <div
          class="option"
          :class="{ selected: selectedOption === 'phone' }"
          @click="selectOption('phone')"
        >
          <div class="option-icon"><i class="fas fa-camera"></i></div>
          <div class="option-content">
            <strong>Phone</strong>
            <span>Use your phone camera</span>
          </div>
        </div>
      </div>

      <div v-if="selectedOption" class="plant-name-section">
        <h3>Name Your Plant</h3>
        <input
          v-model="newPlantName"
          placeholder="e.g. Strawberry 01"
          class="plant-name-input"
        />
      </div>

      <div class="action-buttons">
        <button class="btn-secondary" @click="cancelAddPlant">Cancel</button>
        <button
          class="btn-primary"
          @click="addPlant"
          :disabled="!selectedOption || !newPlantName"
        >
          Add Plant
        </button>
      </div>
    </div>

    <!-- My Achievement Section -->
    <section class="section">
      <h3 class="section-title">My Achievement</h3>
      <div class="achievement-card">
        <img src="/basket.png" class="achievement-img" />
        <div class="achievement-info">
          <h4 class="harvest-count">100</h4>
          <p class="harvest-times">Harvest times</p>
        </div>
      </div>
    </section>

    <!-- Bottom Icon Navigation -->
    <div class="icon-nav">
      <div class="nav-item" @click="$router.push('/home')">
        <i class="fas fa-home"></i>
      </div>
      <div class="nav-item" @click="$router.push('/tips')">
        <i class="fas fa-list"></i>
      </div>
      <div class="nav-item" @click="$router.push('/mydairy')">
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
</template>

<script>
import "./Profile.css";

export default {
  name: "Profile",
  data() {
    return {
      showChooseMode: false,
      selectedOption: null,
      newPlantName: "",
      userPlants: [
        { name: "Berry 1" },
        { name: "Berry 2" },
        { name: "Berry 3" },
      ],
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
      const plants = JSON.parse(
        localStorage.getItem("strawberryPlants") || "[]"
      );
      plants.push({
        name: this.newPlantName.trim(),
        mode: this.selectedOption,
        dateAdded: new Date().toISOString(),
      });
      localStorage.setItem("strawberryPlants", JSON.stringify(plants));

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
    },
  },
};
</script>
