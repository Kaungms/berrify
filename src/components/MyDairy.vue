<template>
  <div class="my-dairy-page">
    <div class="menu-bar" @click="$router.push('/')">
      <i class="fas fa-bars"></i>
    </div>

    <h1>My Diary</h1>

    <!-- Replace custom calendar-card with vue-cal -->
    <vue-cal 
      style="height: 500px;" 
      :disable-views="['years', 'year', 'week', 'day', 'agenda']"
      :time="false"
      default-view="month"
      hide-title
    />

    <div class="diary-entry">
      <h2>Harvested</h2>
      <p>with 18 strawberries</p>
      <img src="/3.png" alt="Basket">
    </div>
  </div>

  <div class="back-button" @click="$router.push('/home')">
  <i class="fas fa-arrow-left"></i>
  </div>

</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  name: 'MyDairy',
  components: { VueCal }
};
</script>
