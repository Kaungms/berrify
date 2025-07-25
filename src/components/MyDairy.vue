<template>
  <div class="my-dairy-page">
    <!-- Back Button -->
    <div class="back-button" @click="$router.push('/home')">
      <i class="fas fa-arrow-left"></i>
    </div>

    <h1>My Diary</h1>

    <!-- Calendar -->
    <div class="calendar-card outlined">
      <vue-cal 
        style="height: 400px;"
        :disable-views="['years', 'year', 'week', 'day', 'agenda']"
        :time="false"
        default-view="month"
        hide-title
      />
    </div>

    <hr />

    <!-- Harvest Entry with Dropdown -->
    <div class="diary-entry">
      <div class="entry-content">
        <h2>Strawberry 01</h2>
        <p>80% are ready to harvest</p>
        <p class="status-alert">Ready to Harvest!</p>
        <div class="moisture">
          <i class="fas fa-tint"></i>
          <span class="moisture-value">72%</span>
          <span class="moisture-label">Soil Moisture</span>
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
</template>

<style>
h1{
  left: 20px
}
</style>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  name: 'MyDairy',
  components: { VueCal },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    }
  }
};
</script>
