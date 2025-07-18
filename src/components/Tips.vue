
<template>
  <div class="tips-page">
    <div class="back-button" @click="$router.push('/')">
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
export default {
  name: "Tips"
};
</script>

<style scoped>
.tips-page {
  background: #8AB58A;
  min-height: 100vh;
  padding: 20px;
}

.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 24px;
  cursor: pointer;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin-top: 80px;
}

.tips-list li {
  margin-bottom: 20px;
  font-weight: 600;
  cursor: pointer;
  background: white;
  padding: 12px;
  border-radius: 12px;
  transition: background 0.2s ease;
}

.tips-list li:hover {
  background: #e6e6e6;
}
</style>
