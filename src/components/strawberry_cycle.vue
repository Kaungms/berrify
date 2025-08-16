<template>
  <div class="strawberry-cycle">
    <div class="back-button" @click="$router.push('/tips')">
      <i class="fas fa-arrow-left"></i>
    </div>

    <h1>Tips</h1>

    <div class="cycle-card">
      <h2>Strawberry Cycle</h2>
      <img src="/strawberry_cycle.png" alt="Strawberry Cycle" />
      <ul class="cycle-steps">
        <li><span class="highlight">Germination</span> - Seeds sprout and grow leaves.</li>
        <li><span class="highlight">Vegetative Growth</span> - Plant develops roots, leaves, and a crown.</li>
        <li><span class="highlight">Flowering</span> - Flower buds form and bloom.</li>
        <li><span class="highlight">Pollination</span> - Flowers are pollinated, leading to fruit formation.</li>
        <li><span class="highlight">Fruit Development</span> - Fruit grows and ripens from green to red.</li>
        <li><span class="highlight">Harvest</span> - Ripe strawberries are picked.</li>
        <li><span class="highlight">Post-Harvest</span> - Plants may produce runners or go dormant.</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.strawberry-cycle {
  background: linear-gradient(135deg, #8AB58A 0%, #A8D4A8 100%);
  min-height: 100vh;
  padding: 24px;
  padding-top: 80px;
}

.strawberry-cycle h1 {
  color: white;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Position back button */
.back-button {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 100;
}

.cycle-card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.cycle-card h2 {
  color: #333;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
}

.cycle-card img {
  width: 100%;
  max-width: 400px;
  height: auto;
  margin: 20px auto;
  display: block;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.cycle-steps {
  list-style: none;
  padding: 0;
  margin-top: 24px;
}

.cycle-steps li {
  margin-bottom: 16px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border-left: 4px solid #4CAF50;
  transition: all 0.3s ease;
}

.cycle-steps li:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.2);
}

.cycle-steps .highlight {
  color: #4CAF50;
  font-weight: 700;
}
</style>
