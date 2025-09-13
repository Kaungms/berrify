<template>
  <div class="admin-dashboard">
    <!-- Header -->
    <div class="dashboard-header">
      <h1>Admin User Dashboard</h1>
      <p>Manage users and monitor plant cultivation activities</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="tab-navigation">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- User Management Tab -->
    <div v-if="activeTab === 'users'" class="tab-content">
      <!-- User List -->
      <div v-if="!selectedUser" class="user-list-view">
        <div class="table-header">
          <h2>User Management</h2>
          <div class="header-actions">
            <input
              v-model="searchQuery"
              placeholder="Search users..."
              class="search-input"
            />
            <select v-model="userSortBy" class="filter-select">
              <option value="name">Sort by Name</option>
              <option value="harvest">Sort by Total Harvest</option>
              <option value="joinDate">Sort by Join Date</option>
              <option value="lastActive">Sort by Last Active</option>
            </select>
            <button class="add-btn" @click="showAddUserModal = true">
              Add User
            </button>
          </div>
        </div>

        <!-- Users Table -->
        <div class="data-table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Device</th>
                <th>Plant Count</th>
                <th>Total Harvest (g)</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in sortedUsers" :key="user.id">
                <td class="user-cell">
                  <div class="user-info">
                    <div class="user-name">{{ user.name }}</div>
                    <div class="user-email">{{ user.email }}</div>
                  </div>
                </td>
                <td>
                  <div class="device-info">
                    <span class="device-icon">
                      {{ user.device === "Raspberry Pi" ? "🥧" : "📱" }}
                    </span>
                    {{ user.device }}
                  </div>
                </td>
                <td>
                  <span class="plant-count">{{ user.plantCount }}</span>
                </td>
                <td>
                  <span class="harvest-total">{{ user.totalHarvest }}g</span>
                </td>
                <td>
                  <span :class="['status-badge', user.status.toLowerCase()]">
                    {{ user.status }}
                  </span>
                </td>
                <td>{{ formatDate(user.joinDate) }}</td>
                <td>
                  <div class="action-buttons">
                    <button class="action-btn edit" @click="editUser(user)">
                      ✏️
                    </button>
                    <button
                      class="action-btn delete"
                      @click="deleteUser(user.id)"
                    >
                      🗑️
                    </button>
                    <button
                      class="action-btn view"
                      @click="viewUserDetails(user)"
                    >
                      👁️ Details
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- User Details -->
      <div v-else class="user-details-view">
        <div class="user-details-header">
          <button class="back-btn" @click="selectedUser = null">
            ← Back to User List
          </button>
          <h2>{{ selectedUser.name }} - Detailed Profile</h2>
        </div>

        <div class="user-details-grid">
          <!-- Info Card -->
          <div class="detail-card user-info-card">
            <h3>👤 User Information</h3>
            <div class="info-row">
              <strong>Name:</strong> {{ selectedUser.name }}
            </div>
            <div class="info-row">
              <strong>Email:</strong> {{ selectedUser.email }}
            </div>
            <div class="info-row">
              <strong>Device:</strong> {{ selectedUser.device }}
            </div>
            <div class="info-row">
              <strong>Status:</strong>
              <span
                :class="['status-badge', selectedUser.status.toLowerCase()]"
              >
                {{ selectedUser.status }}
              </span>
            </div>
            <div class="info-row">
              <strong>Join Date:</strong>
              {{ formatDate(selectedUser.joinDate) }}
            </div>
            <div class="info-row">
              <strong>Last Active:</strong>
              {{ formatDate(selectedUser.lastActive) }}
            </div>
          </div>

          <!-- Harvest Summary -->
          <div class="detail-card harvest-summary-card">
            <h3>🌾 Harvest Summary</h3>
            <div class="harvest-stats">
              <div class="stat-item">
                <div class="stat-value">{{ selectedUser.totalHarvest }}g</div>
                <div class="stat-label">Total Yield</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">
                  {{ getUserHarvestCount(selectedUser) }}
                </div>
                <div class="stat-label">Total Harvests</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">
                  {{ getUserAverageYield(selectedUser) }}g
                </div>
                <div class="stat-label">Average Yield</div>
              </div>
            </div>
          </div>

          <!-- Plants -->
          <div class="detail-card plants-card">
            <h3>🌱 Current Plants ({{ selectedUser.plantCount }})</h3>
            <div class="plants-list">
              <div
                v-for="plant in getUserPlants(selectedUser)"
                :key="plant.id"
                class="plant-item"
              >
                <div class="plant-info">
                  <strong>{{ plant.name }}</strong>
                  <span class="plant-type">{{ plant.type }}</span>
                </div>
                <div class="plant-status">
                  <span
                    :class="[
                      'plant-health',
                      plant.health.toLowerCase().replace(' ', '-'),
                    ]"
                  >
                    {{ plant.health }}
                  </span>
                </div>
                <div class="plant-metrics">
                  <small>{{ plant.daysGrowing }} days growing</small>
                </div>
              </div>
              <div
                v-if="getUserPlants(selectedUser).length === 0"
                class="no-plants"
              >
                No active plants
              </div>
            </div>
          </div>

          <!-- Harvest History -->
          <div class="detail-card harvest-history-card">
            <h3>📊 Harvest History</h3>
            <div class="harvest-list">
              <div
                v-for="harvest in getUserHarvests(selectedUser)"
                :key="harvest.id"
                class="harvest-item"
              >
                <div class="harvest-date">{{ formatDate(harvest.date) }}</div>
                <div class="harvest-details">
                  <strong>{{ harvest.plantName }}</strong>
                  <span class="harvest-yield">{{ harvest.yield }}g</span>
                </div>
                <div class="harvest-quality">
                  <span
                    :class="['quality-badge', harvest.quality.toLowerCase()]"
                  >
                    {{ harvest.quality }}
                  </span>
                </div>
              </div>
              <div
                v-if="getUserHarvests(selectedUser).length === 0"
                class="no-harvests"
              >
                No harvest records found
              </div>
            </div>
          </div>

          <!-- Performance -->
          <div class="detail-card performance-card">
            <h3>📈 Performance Metrics</h3>
            <div class="performance-metrics">
              <div class="metric-row">
                <span>Success Rate:</span>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: getUserSuccessRate(selectedUser) + '%' }"
                  ></div>
                </div>
                <span>{{ getUserSuccessRate(selectedUser) }}%</span>
              </div>
              <div class="metric-row">
                <span>Activity Level:</span>
                <div class="progress-bar">
                  <div
                    class="progress-fill activity"
                    :style="{ width: getUserActivityLevel(selectedUser) + '%' }"
                  ></div>
                </div>
                <span>{{ getUserActivityLevel(selectedUser) }}%</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="detail-card actions-card">
            <h3>⚡ Quick Actions</h3>
            <div class="action-buttons-grid">
              <button
                class="action-btn-large edit"
                @click="editUser(selectedUser)"
              >
                ✏️ Edit User
              </button>
              <button
                class="action-btn-large message"
                @click="sendMessage(selectedUser)"
              >
                💬 Send Message
              </button>
              <button
                class="action-btn-large suspend"
                @click="suspendUser(selectedUser)"
              >
                ⏸️ Suspend User
              </button>
              <button
                class="action-btn-large delete"
                @click="deleteUser(selectedUser.id)"
              >
                🗑️ Delete User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Harvest Records Tab -->
    <div v-if="activeTab === 'harvests'" class="tab-content">
      <div class="table-header">
        <h2>Harvest Records</h2>
        <div class="header-actions">
          <input type="date" v-model="harvestDateFilter" class="date-input" />
          <button class="add-btn" @click="showAddHarvestModal = true">
            Record Harvest
          </button>
        </div>
      </div>
      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th>Harvest Date</th>
              <th>Plant</th>
              <th>Owner</th>
              <th>Yield (g)</th>
              <th>Quality</th>
              <th>Growth Duration</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="harvest in filteredHarvests" :key="harvest.id">
              <td>{{ formatDate(harvest.date) }}</td>
              <td>{{ harvest.plantName }}</td>
              <td>{{ harvest.owner }}</td>
              <td>
                <strong>{{ harvest.yield }}g</strong>
              </td>
              <td>
                <span :class="['quality-badge', harvest.quality.toLowerCase()]">
                  {{ harvest.quality }}
                </span>
              </td>
              <td>{{ harvest.growthDuration }} days</td>
              <td>{{ harvest.notes || "-" }}</td>
              <td>
                <div class="action-buttons">
                  <button
                    class="action-btn view"
                    @click="viewHarvestDetails(harvest)"
                  >
                    📊
                  </button>
                  <button class="action-btn edit" @click="editHarvest(harvest)">
                    ✏️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add User Modal -->
    <div
      v-if="showAddUserModal"
      class="modal-overlay"
      @click="showAddUserModal = false"
    >
      <div class="modal-content" @click.stop>
        <h3>Add New User</h3>
        <form @submit.prevent="addUser">
          <div class="form-group">
            <label>Name:</label>
            <input v-model="newUser.name" required />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input v-model="newUser.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Device:</label>
            <select v-model="newUser.device" required>
              <option value="Raspberry Pi">Raspberry Pi</option>
              <option value="Phone">Phone</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" @click="showAddUserModal = false">
              Cancel
            </button>
            <button type="submit">Add User</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "./AdminPage.css";

export default {
  name: "AdminDashboard",
  data() {
    return {
      activeTab: "users",
      selectedUser: null,
      searchQuery: "",
      userSortBy: "harvest",
      harvestDateFilter: "",
      showAddUserModal: false,
      showAddHarvestModal: false,
      tabs: [
        { id: "users", label: "User Management" },
        { id: "harvests", label: "Harvest Records" },
      ],
      users: [
        {
          id: 1,
          name: "Pailinnn",
          email: "pailindeelertpattana@gmail.com",
          device: "Raspberry Pi",
          plantCount: 3,
          totalHarvest: 445,
          status: "Active",
          joinDate: "2024-01-02",
          lastActive: "2024-01-20",
        },
        {
          id: 2,
          name: "Erikkk",
          email: "erikkms@gmail.com",
          device: "Phone",
          plantCount: 2,
          totalHarvest: 295,
          status: "Active",
          joinDate: "2024-01-03",
          lastActive: "2024-01-19",
        },
        {
          id: 3,
          name: "Zimmyyy",
          email: "zimmyzmmt@gmail.com",
          device: "Raspberry Pi",
          plantCount: 1,
          totalHarvest: 380,
          status: "Active",
          joinDate: "2024-01-04",
          lastActive: "2024-01-20",
        },
        {
          id: 4,
          name: "Blossom",
          email: "blossomppg@gmail.com",
          device: "Raspberry Pi",
          plantCount: 0,
          totalHarvest: 120,
          status: "Inactive",
          joinDate: "2024-01-08",
          lastActive: "2024-01-10",
        },
      ],
      plants: [
        {
          id: 1,
          name: "Strawberry Plant #1",
          owner: "Pailinnn",
          type: "Strawberry",
          potId: "POT-A1",
          daysGrowing: 45,
          health: "Healthy",
          moisture: 75,
          light: 85,
        },
        {
          id: 2,
          name: "Strawberry Plant #2",
          owner: "Erikkk",
          type: "Strawberry",
          potId: "POT-B2",
          daysGrowing: 32,
          health: "Needs Attention",
          moisture: 45,
          light: 60,
        },
        {
          id: 3,
          name: "Strawberry Plant #3",
          owner: "Zimmyyy",
          type: "Strawberry",
          potId: "POT-C3",
          daysGrowing: 28,
          health: "Critical",
          moisture: 25,
          light: 40,
        },
      ],
      harvests: [
        {
          id: 1,
          date: "2024-01-18",
          plantName: "Strawberry Plant #1",
          owner: "Pailinnn",
          yield: 150,
          quality: "Excellent",
          growthDuration: 65,
          notes: "Perfect ripeness, great size",
        },
        {
          id: 2,
          date: "2024-01-16",
          plantName: "Strawberry Plant #2",
          owner: "Erikkk",
          yield: 95,
          quality: "Good",
          growthDuration: 58,
          notes: "Slightly small but tasty",
        },
        {
          id: 3,
          date: "2024-01-14",
          plantName: "Strawberry Plant #3",
          owner: "Zimmyyy",
          yield: 200,
          quality: "Excellent",
          growthDuration: 72,
          notes: "Outstanding yield and quality",
        },
        {
          id: 4,
          date: "2024-01-12",
          plantName: "Strawberry Plant #4",
          owner: "Pailinnn",
          yield: 180,
          quality: "Good",
          growthDuration: 60,
          notes: "Good harvest overall",
        },
      ],
      newUser: {
        name: "",
        email: "",
        device: "Raspberry Pi",
      },
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    sortedUsers() {
      const users = [...this.filteredUsers];
      switch (this.userSortBy) {
        case "harvest":
          return users.sort((a, b) => b.totalHarvest - a.totalHarvest);
        case "name":
          return users.sort((a, b) => a.name.localeCompare(b.name));
        case "joinDate":
          return users.sort(
            (a, b) => new Date(a.joinDate) - new Date(b.joinDate)
          );
        case "lastActive":
          return users.sort(
            (a, b) => new Date(b.lastActive) - new Date(a.lastActive)
          );
        default:
          return users;
      }
    },
    filteredHarvests() {
      if (!this.harvestDateFilter) return this.harvests;
      return this.harvests.filter(
        (harvest) => harvest.date === this.harvestDateFilter
      );
    },
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    getUserPlants(user) {
      return this.plants.filter((plant) => plant.owner === user.name);
    },
    getUserHarvests(user) {
      return this.harvests.filter((harvest) => harvest.owner === user.name);
    },
    getUserHarvestCount(user) {
      return this.getUserHarvests(user).length;
    },
    getUserAverageYield(user) {
      const harvests = this.getUserHarvests(user);
      if (harvests.length === 0) return 0;
      const total = harvests.reduce((sum, h) => sum + h.yield, 0);
      return Math.round(total / harvests.length);
    },
    getUserSuccessRate(user) {
      const harvests = this.getUserHarvests(user);
      if (harvests.length === 0) return 0;
      const successful = harvests.filter(
        (h) => h.quality === "Excellent" || h.quality === "Good"
      ).length;
      return Math.round((successful / harvests.length) * 100);
    },
    getUserActivityLevel(user) {
      const daysSinceJoin = Math.floor(
        (new Date() - new Date(user.joinDate)) / (1000 * 60 * 60 * 24)
      );
      const harvests = this.getUserHarvests(user).length;
      if (daysSinceJoin === 0) return 0;
      const rate = (harvests / daysSinceJoin) * 30; // harvests per month
      return Math.min(Math.round(rate * 20), 100); // scale to 100%
    },
    editUser(user) {
      console.log("Edit user:", user);
    },
    deleteUser(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        this.users = this.users.filter((user) => user.id !== userId);
        if (this.selectedUser && this.selectedUser.id === userId) {
          this.selectedUser = null;
        }
      }
    },
    viewUserDetails(user) {
      this.selectedUser = user;
    },
    sendMessage(user) {
      console.log("Send message to:", user.name);
    },
    suspendUser(user) {
      console.log("Suspend user:", user.name);
    },
    viewHarvestDetails(harvest) {
      console.log("View harvest details:", harvest);
    },
    editHarvest(harvest) {
      console.log("Edit harvest:", harvest);
    },
    addUser() {
      const newUser = {
        id: this.users.length + 1,
        ...this.newUser,
        plantCount: 0,
        totalHarvest: 0,
        status: "Active",
        joinDate: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString().split("T")[0],
      };
      this.users.push(newUser);
      this.newUser = { name: "", email: "", device: "Raspberry Pi" };
      this.showAddUserModal = false;
    },
  },
};
</script>
