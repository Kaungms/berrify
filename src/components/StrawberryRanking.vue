<template>
  <div class="strawberry-ranking">
    <!-- Header with back button -->
    <div class="header">
      <div class="back-button" @click="$router.go(-1)">
        <i class="fas fa-arrow-left"></i>
      </div>
      <h1>Strawberry Ranking</h1>
    </div>

    <!-- Ranking Info -->
    <div class="ranking-info">
      <p>We detected <strong>{{ detectedCount }} strawberries</strong> in your latest scan</p>
      <p>Here are the top <strong>{{ selectedCount }}</strong> highest quality strawberries to keep for growing:</p>
    </div>

    <!-- Ranking List -->
    <div class="ranking-list">
      <div 
        v-for="(strawberry, index) in rankedStrawberries" 
        :key="index"
        class="ranking-item"
        :class="{ 'best-quality': index === 0 }"
      >
        <div class="rank-number">{{ index + 1 }}</div>
        <div class="strawberry-info">
          <img :src="strawberry.image" :alt="`Strawberry ${index + 1}`" />
          <div class="info-text">
            <h3>Strawberry {{ index + 1 }}</h3>
            <div class="quality-score">
              <span class="score">{{ strawberry.score }}%</span>
              <span class="quality-label">Quality Score</span>
            </div>
            <div class="attributes">
              <span class="attribute">{{ strawberry.ripeness }}</span>
              <span class="attribute">{{ strawberry.size }}</span>
            </div>
          </div>
        </div>
        <div class="quality-indicator" :style="{ background: strawberry.color }">
          <i class="fas fa-crown" v-if="index === 0"></i>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button class="btn-secondary" @click="$router.push('/home')">
        Back to Home
      </button>
      <button class="btn-primary" @click="saveToMyDiary">
        Save to My Diary
      </button>
    </div>
  </div>
</template>

<script>
import "./StrawberryRanking.css";

export default {
  name: "StrawberryRanking",
  data() {
    return {
      detectedCount: 4,
      selectedCount: 1,
      rankedStrawberries: []
    };
  },
  mounted() {
    this.loadDetectionData();
    this.generateRanking();
  },
  methods: {
    loadDetectionData() {
      // Get data from route query parameters
      this.detectedCount = parseInt(this.$route.query.detected) || parseInt(localStorage.getItem('detectedStrawberries')) || 8;
      this.selectedCount = parseInt(this.$route.query.selected) || parseInt(localStorage.getItem('strawberriesToKeep')) || 3;
      
      console.log(`Detected: ${this.detectedCount}, Selected: ${this.selectedCount}`);
    },
    generateRanking() {
      // Generate ranking data based on selected count
      const mockStrawberries = [
        { score: 95, ripeness: "Perfect Ripe", size: "Large", color: "#4CAF50", image: "/strawberries.png" },
        { score: 92, ripeness: "Excellent", size: "Large", color: "#4CAF50", image: "/strawberries.png" },
        { score: 87, ripeness: "Nearly Ripe", size: "Medium", color: "#8BC34A", image: "/strawberries.png" },
        { score: 84, ripeness: "Very Good", size: "Medium", color: "#8BC34A", image: "/strawberries.png" },
        { score: 82, ripeness: "Good", size: "Medium", color: "#CDDC39", image: "/strawberries.png" },
        { score: 78, ripeness: "Good", size: "Medium", color: "#CDDC39", image: "/strawberries.png" },
        { score: 75, ripeness: "Fair", size: "Small", color: "#FFC107", image: "/strawberries.png" },
        { score: 72, ripeness: "Fair", size: "Small", color: "#FFC107", image: "/strawberries.png" },
        { score: 68, ripeness: "Needs Time", size: "Small", color: "#FF9800", image: "/strawberries.png" },
        { score: 65, ripeness: "Needs Time", size: "Small", color: "#FF9800", image: "/strawberries.png" }
      ];

      // Select top strawberries based on selectedCount
      this.rankedStrawberries = mockStrawberries.slice(0, this.selectedCount);
    },
    saveToMyDiary() {
      // Add logic to save to diary
      alert(`Saved top ${this.selectedCount} strawberries to My Diary!`);
      this.$router.push('/mydairy');
    }
  }
};
</script>
