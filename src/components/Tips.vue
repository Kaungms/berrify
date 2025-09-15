<template>
  <div class="page-container">
    <!-- Back Button -->
    <div class="back-button" @click="$router.push('/home')">
      <i class="fas fa-arrow-left"></i>
    </div>

    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Tips</h1>
    </div>

    <!-- Page Content -->
    <div class="page-content">
      <!-- Strawberry Cycle Section -->
      <div class="cycle-card">
        <h2>Strawberry Cycle</h2>
        <img src="/strawberry_cycle.png" alt="Strawberry Cycle" />
        <ul class="cycle-steps" :class="{ collapsed: !expanded.cycle }">
          <li>
            <span class="highlight">Germination</span> - Seeds sprout and grow
            leaves.
          </li>
          <li>
            <span class="highlight">Vegetative Growth</span> - Plant develops
            roots, leaves, and a crown.
          </li>
          <li>
            <span class="highlight">Flowering</span> - Flower buds form and
            bloom.
          </li>
          <li>
            <span class="highlight">Pollination</span> - Flowers are pollinated,
            leading to fruit formation.
          </li>
          <li>
            <span class="highlight">Fruit Development</span> - Fruit grows and
            ripens from green to red.
          </li>
          <li>
            <span class="highlight">Harvest</span> - Ripe strawberries are
            picked.
          </li>
          <li>
            <span class="highlight">Post-Harvest</span> - Plants may produce
            runners or go dormant.
          </li>
        </ul>
        <button class="toggle-arrow" @click="expanded.cycle = !expanded.cycle">
          <span v-if="expanded.cycle">▲</span>
          <span v-else>▼</span>
        </button>
      </div>

      <!-- Strawberry Jam Recipe Section -->
      <div class="jam-card" style="margin-top: 32px">
        <h2>Strawberry Jam Recipe</h2>
        <img src="/jam-image.png" alt="Jam Jar" />
        <div class="recipe-text" :class="{ collapsed: !expanded.jam }">
          <h3>Ingredients:</h3>
          <ul>
            <li>4 cups organic strawberries (hulled and halved)</li>
            <li>1½ cups organic cane sugar (adjust to taste)</li>
            <li>2 tbsp organic lemon juice (freshly squeezed)</li>
          </ul>

          <h3>Instructions:</h3>
          <ol>
            <li>Mash Strawberries: Lightly mash in a saucepan.</li>
            <li>
              Cook: Add sugar and lemon juice. Stir over medium heat until sugar
              dissolves.
            </li>
            <li>
              Boil: Bring to a boil. Reduce and stir until thickened (20–30
              minutes).
            </li>
          </ol>
        </div>
        <button class="toggle-arrow" @click="expanded.jam = !expanded.jam">
          <span v-if="expanded.jam">▲</span>
          <span v-else>▼</span>
        </button>
      </div>

      <!-- Strawberry Harvest Tips Section -->
      <div class="jam-card" style="margin-top: 32px">
        <h2>Strawberry Harvest Tips</h2>
        <img src="/harvest.png" alt="Strawberries Ready to Pick" />
        <div class="recipe-text" :class="{ collapsed: !expanded.harvest }">
          <h3>When to Harvest:</h3>
          <ul>
            <li>
              Pick strawberries when fully red; avoid partially white or green
              berries.
            </li>
            <li>Berries should be firm but slightly soft to the touch.</li>
            <li>
              Harvest in the morning when it’s cool for best flavor and shelf
              life.
            </li>
            <li>Check plants every 1–3 days during peak season.</li>
          </ul>

          <h3>How to Pick:</h3>
          <ul>
            <li>
              Hold the strawberry by the stem, not the fruit, to avoid bruising.
            </li>
            <li>Leave 1–2 cm of green calyx attached for longer storage.</li>
            <li>
              Place berries gently in a shallow container to prevent squishing.
            </li>
          </ul>

          <h3>Care & Storage:</h3>
          <ul>
            <li>Do not wash immediately; wash only before eating or using.</li>
            <li>
              Remove any moldy or damaged berries to protect healthy ones.
            </li>
            <li>
              Store unwashed berries in a single layer in the fridge for 2–3
              days.
            </li>
            <li>For longer storage, freeze after gently washing and drying.</li>
          </ul>

          <h3>Tips for More Yield:</h3>
          <ul>
            <li>Pick frequently to encourage more fruit production.</li>
            <li>Leave healthy runners unless you want new plants.</li>
            <li>Use mulch under plants to keep berries clean and dry.</li>
            <li>
              Ensure 6–8 hours of sunlight and adequate water for larger,
              sweeter berries.
            </li>
          </ul>
        </div>
        <button
          class="toggle-arrow"
          @click="expanded.harvest = !expanded.harvest"
        >
          <span v-if="expanded.harvest">▲</span>
          <span v-else>▼</span>
        </button>
      </div>

      <!-- Strawberry Storage Tips Section -->
      <div class="jam-card" style="margin-top: 32px">
        <h2>Strawberry Storage Tips</h2>
        <img src="/storage.png" alt="Fresh Strawberries" />
        <div class="recipe-text" :class="{ collapsed: !expanded.storage }">
          <h3>Short-Term (2–7 Days):</h3>
          <ul>
            <li>Do not wash until ready to eat (moisture speeds mold).</li>
            <li>Remove bruised or moldy berries right away.</li>
            <li>Line container with paper towel to absorb moisture.</li>
            <li>Store in a shallow container, avoid stacking heavy layers.</li>
            <li>Keep refrigerated at 0–4 °C with light airflow.</li>
          </ul>

          <h3>Long-Term (Up to 1 Year):</h3>
          <ul>
            <li>Wash, dry completely, and remove stems.</li>
            <li>
              Freeze on a tray first, then store in sealed bags or containers.
            </li>
            <li>
              Optional: coat in sugar or puree before freezing for better
              texture.
            </li>
          </ul>

          <h3>Alternative Preservation:</h3>
          <ul>
            <li>Make jam, jelly, or syrup for shelf-stable storage.</li>
            <li>Dehydrate or freeze-dry for light, crispy snacks.</li>
            <li>
              Ferment into vinegar or wine for unique use and longer shelf life.
            </li>
          </ul>
        </div>

        <button
          class="toggle-arrow"
          @click="expanded.storage = !expanded.storage"
        >
          <span v-if="expanded.storage">▲</span>
          <span v-else>▼</span>
        </button>
      </div>

      <!-- Strawberry Plant Care Section -->
      <div class="jam-card" style="margin-top: 32px">
        <h2>How to take care of your strawberry?</h2>
        <img src="/caring.png" alt="Strawberry Plant" />
        <div class="recipe-text" :class="{ collapsed: !expanded.care }">
          <h3>☀️ Sunlight</h3>
          <ul>
            <li>
              Needs at least <span class="highlight">6–8 hours</span> of direct
              sunlight daily.
            </li>
            <li>Grow in a bright, open area for best yield.</li>
          </ul>

          <h3>💧 Watering</h3>
          <ul>
            <li>Keep soil evenly moist, not soggy.</li>
            <li>Water at the base, avoid wetting leaves to prevent fungus.</li>
          </ul>

          <h3>🌱 Soil & Fertilizer</h3>
          <ul>
            <li>Use well-draining soil rich in organic matter.</li>
            <li>Add compost or balanced fertilizer every 4–6 weeks.</li>
          </ul>

          <h3>✂️ Maintenance</h3>
          <ul>
            <li>Remove yellow leaves and weeds regularly.</li>
            <li>Pinch off first flowers so plants grow stronger.</li>
          </ul>

          <h3>🍓 Harvesting</h3>
          <ul>
            <li>Pick when berries are fully red for best flavor.</li>
            <li>Harvest every 2–3 days during peak season.</li>
          </ul>
        </div>
        <button class="toggle-arrow" @click="expanded.care = !expanded.care">
          <span v-if="expanded.care">▲</span>
          <span v-else>▼</span>
        </button>
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
          >
          <i class="fas fa-cog"></i>
        </div>
        <div class="nav-item" @click="$router.push('/profile')">
          <i class="fas fa-user"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./Tips.css";

export default {
  name: "Tips",
  data() {
    return {
      expanded: {
        cycle: false,
        jam: false,
        harvest: false,
        storage: false,
        care: false,
      },
    };
  },
};
</script>
