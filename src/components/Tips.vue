
<template>
  <div class="tips-page">
    <div class="back-button" @click="$router.push('/home')">
      <i class="fas fa-arrow-left"></i>
    </div>

    <h1>Tips</h1>

    <ul class="tips-list">
     <li @click="$router.push('/strawberry-cycle')">Strawberry Cycle</li>
      <li @click="$router.push('/strawberry-jam')">Strawberry Jam Recipe</li>
    </ul>
  </div>
</template>



<script>
import "./Tips.css";

export default {
  name: "Tips"
};
</script>