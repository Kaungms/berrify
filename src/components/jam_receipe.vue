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
import "./jam_receipe.css";

export default {
  name: "StrawberryJam"
};
</script>