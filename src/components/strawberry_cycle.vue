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
