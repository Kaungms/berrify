<template>
  <div class="home">
    <div class="menu-bar" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </div>

    <h1>Welcome to Berrify</h1>
    <p>Choose how you want to analyze your strawberries</p>

    <div class="sidebar" :class="{ open: sidebarOpen }">
      <ul>
        <li @click="$router.push('/')">Home</li>
        <li @click="$router.push('/tips')">Tips</li>
        <li @click="$router.push('/mydairy')">My Dairy</li>
        <li>Notifications</li>
        <li>Profile</li>
        <li>Settings</li>
      </ul>
    </div>

    <div v-if="sidebarOpen" class="overlay" @click="toggleSidebar"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      sidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }
};
</script>

<style scoped>
.home {
  position: relative;
  padding: 20px;
  min-height: 100vh;
  background: #8AB58A;
  color: black;
}

.menu-bar {
  position: absolute;
  top: 10px;
  right: 0;
  font-size: 28px;
  cursor: pointer;
  color: black;
}


.sidebar {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
  padding: 20px;
  transition: left 0.3s ease;
  z-index: 1000;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.sidebar.open {
  left: 0;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin-top: 40px;
}

.sidebar li {
  margin-bottom: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.sidebar li:hover {
  color: #4caf50;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 500;
}
</style>
