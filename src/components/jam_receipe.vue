<template>
  <div class="strawberry-jam">
    <div class="back-button" @click="$router.push('/tips')">
      <i class="fas fa-arrow-left"></i>
    </div>

    <h1>Strawberry Jam Recipe</h1>

    <div class="jam-card">
      <img src="/jam-image.png" alt="Jam Jar" />

      <div class="recipe-text">
        <h2>Ingredients:</h2>
        <ul>
          <li>4 cups organic strawberries (hulled and halved)</li>
          <li>1½ cups organic cane sugar (adjust to taste)</li>
          <li>2 tbsp organic lemon juice (freshly squeezed)</li>
        </ul>

        <h2>Instructions:</h2>
        <ol>
          <li>Mash Strawberries: Lightly mash in a saucepan.</li>
          <li>Cook: Add sugar and lemon juice. Stir over medium heat until sugar dissolves.</li>
          <li>Boil: Bring to a boil. Reduce and stir until thickened (20–30 minutes).</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StrawberryJam"
};
</script>

<style scoped>
.jam-page {
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

.jam-card {
  background: white;
  padding: 20px;
  border-radius: 24px;
  margin-top: 80px;
  text-align: center;
}

.jam-card img {
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
}

.recipe-text {
  text-align: left;
}

.recipe-text h2 {
  margin-top: 20px;
  color: #c0392b;
}

.recipe-text ul, .recipe-text ol {
  padding-left: 20px;
}
</style>