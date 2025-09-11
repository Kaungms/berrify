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
        <!-- Add New Strawberry Card (always first) -->
        <div
          class="strawberry-card add-card"
          @click="showChooseMode = true"
          v-if="!showChooseMode"
        >
          <div class="add-icon">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </div>
        </div>

        <!-- User plants -->
        <div
          class="strawberry-card"
          v-for="plant in userPlants"
          :key="plant.id"
          title="Tap to view"
          @click="$router.push(`/plant/${plant.id}`)"
        >
          <img
            :src="plant.photo || '/strawberries.png'"
            alt="Strawberry"
            class="strawberry-img"
          />

          <p class="plant-name">{{ plant.name }}</p>

          <button
            class="delete-btn"
            @click.stop="deletePlant(plant.id)"
            aria-label="Delete plant"
            title="Delete"
          >
            ×
          </button>
        </div>
      </div>
    </section>

    <!-- Choose Mode Modal -->
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
            <span>Use specialized hardware device</span>
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
          :disabled="!selectedOption || !newPlantName.trim()"
        >
          Add Plant
        </button>
      </div>
    </div>

    <!-- Bottom Icon Navigation -->
    <div class="icon-nav">
      <div class="nav-item" @click="$router.push('/home')">
        <i class="fas fa-home"></i>
      </div>
      <div class="nav-item" @click="$router.push('/tips')">
        <i class="fas fa-list"></i>
      </div>
      <div class="nav-item" @click="$router.push('/my-diary')">
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

const newId = () =>
  (crypto && crypto.randomUUID && crypto.randomUUID()) || String(Date.now());

export default {
  name: "Profile",
  data() {
    return {
      showChooseMode: false,
      selectedOption: null,
      newPlantName: "",
      userPlants: [],
    };
  },
  mounted() {
    this.loadPlants();
  },
  methods: {
    loadPlants() {
      try {
        this.userPlants = JSON.parse(
          localStorage.getItem("strawberryPlants") || "[]"
        );
      } catch {
        this.userPlants = [];
      }
    },
    persist(plants) {
      localStorage.setItem("strawberryPlants", JSON.stringify(plants));
      this.userPlants = plants;
    },
    selectOption(option) {
      this.selectedOption = option;
    },
    addPlant() {
      const name = this.newPlantName.trim();
      if (!this.selectedOption || !name) return;

      const plants = JSON.parse(
        localStorage.getItem("strawberryPlants") || "[]"
      );

      const plant = {
        id: newId(),
        name,
        mode: this.selectedOption,
        dateAdded: new Date().toISOString(),
        notes: [],
        photo: null,
      };

      plants.push(plant);
      this.persist(plants);

      this.showChooseMode = false;
      this.selectedOption = null;
      this.newPlantName = "";
    },
    deletePlant(id) {
      const plants = this.userPlants.filter((p) => p.id !== id);
      this.persist(plants);
    },
    cancelAddPlant() {
      this.showChooseMode = false;
      this.selectedOption = null;
      this.newPlantName = "";
    },
  },
};
</script>
