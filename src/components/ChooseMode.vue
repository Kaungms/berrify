<template>
  <div class="choose-mode">
    <h1>Welcome to Berrify</h1>
    <p>Choose how you want to analyze your strawberries</p>

    <div class="option-card">
      <div class="option"
      :class="{ selected: selectedOption === 'hardware' }"
        @click="selectOption('hardware')">
        <i class="fas fa-microchip"></i>
        <strong>Hardware </strong>
        <span>Use Specialized hardware device</span>
      </div>

      <div class="option"
      :class="{ selected: selectedOption === 'phone' }"
        @click="selectOption('phone')">
        <i class="fas fa-camera"></i> 
        <strong>Phone </strong>
        <span>Use your phone camera</span>
      </div>

      <div class="option"
      :class="{ selected: selectedOption === 'both' }"
        @click="selectOption('both')">
        <i class="fas fa-bolt"></i>
        <strong>Both</strong>
        <span>Combine hardware and phone</span>
      </div>
    </div>

    <button class="btn-main" @click="goToNext">Continue</button>
  </div>
</template>

<script>
export default {
  name: "ChooseMode",
  data() {
    return {
      selectedOption: null
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
    },
    goToNext() {
      if (this.selectedOption) {
        console.log("Selected option:", this.selectedOption);
        this.$router.push("/home"); // Update as needed
      } else {
        alert("Please select an option first.");
      }
    }
  }
};
</script>


