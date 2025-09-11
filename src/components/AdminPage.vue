<template>
  <div class="dashboard-container">
    <div class="dashboard-wrapper">
      <!-- Header -->
      <div class="header">
        <h1 class="main-title">Admin User Dashboard</h1>
        <h2 class="subtitle">
          Manage users and monitor strawberry photo uploads
        </h2>
      </div>

      <!-- Navigation Tabs -->
      <div class="tab-container">
        <div class="tab-wrapper">
          <button
            :class="['tab-button', activeTab === 'users' ? 'tab-active' : '']"
            @click="activeTab = 'users'"
          >
            User Management
          </button>
          <button
            :class="['tab-button', activeTab === 'photos' ? 'tab-active' : '']"
            @click="activeTab = 'photos'"
          >
            Photo Monitor
          </button>
          <button
            :class="[
              'tab-button',
              activeTab === 'rankings' ? 'tab-active' : '',
            ]"
            @click="activeTab = 'rankings'"
          >
            Rankings
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="content-area">
        <!-- User Management Tab -->
        <div v-if="activeTab === 'users'" class="tab-content">
          <!-- Table Header -->
          <div class="table-header">
            <div class="header-cell">User</div>
            <div class="header-cell">Device</div>
            <div class="header-cell">Preference</div>
            <div class="header-cell">Status</div>
            <div class="header-cell">Join Date</div>
            <div class="header-cell">Last Active</div>
            <div class="header-cell">Actions</div>
          </div>

          <!-- User Rows -->
          <div v-for="user in users" :key="user.id" class="user-row">
            <!-- User Info -->
            <div class="user-info">
              <div class="user-name">{{ user.name }}</div>
              <div class="user-email">{{ user.email }}</div>
            </div>

            <!-- Device -->
            <div class="device-cell">
              <component :is="getDeviceIcon(user.device)" class="device-icon" />
              <span class="device-text">{{ user.device }}</span>
            </div>

            <!-- Preference -->
            <div class="preference-cell">
              <span
                :class="[
                  'preference-badge',
                  user.preference === 'Quality'
                    ? 'preference-quality'
                    : 'preference-quantity',
                ]"
              >
                {{ user.preference }}
              </span>
            </div>

            <!-- Status -->
            <div class="status-cell">
              <span
                :class="[
                  'status-badge',
                  user.status === 'Active'
                    ? 'status-active'
                    : 'status-inactive',
                ]"
              >
                {{ user.status }}
              </span>
            </div>

            <!-- Join Date -->
            <div class="date-cell">{{ user.joinDate }}</div>

            <!-- Last Active -->
            <div class="date-cell">{{ user.lastActive }}</div>

            <!-- Actions -->
            <div class="actions-cell">
              <button class="action-button">
                <svg
                  class="action-icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Photo Monitor Tab -->
        <div v-else-if="activeTab === 'photos'" class="tab-content">
          <div class="placeholder-content">
            <div class="placeholder-icon">📸</div>
            <h3 class="placeholder-title">Photo Monitor</h3>
            <p class="placeholder-text">
              Monitor strawberry photo uploads and quality metrics
            </p>
          </div>
        </div>

        <!-- Rankings Tab -->
        <div v-else-if="activeTab === 'rankings'" class="tab-content">
          <div class="placeholder-content">
            <div class="placeholder-icon">🏆</div>
            <h3 class="placeholder-title">Rankings</h3>
            <p class="placeholder-text">
              View user rankings and performance statistics
            </p>
          </div>
        </div>
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
      users: [
        {
          id: 1,
          name: "Pailinnn",
          email: "pailindeelertpattana@gmail.com",
          device: "Raspberry Pi",
          preference: "Quality",
          status: "Active",
          joinDate: "2024-01-2",
          lastActive: "2024-01-20",
        },
        {
          id: 2,
          name: "Erikkk",
          email: "erikkms@gmail.com",
          device: "Phone",
          preference: "Quantity",
          status: "Active",
          joinDate: "2024-01-3",
          lastActive: "2024-01-19",
        },
        {
          id: 3,
          name: "Zimmyyy",
          email: "zimmyzmmt@gmail.com",
          device: "Raspberry Pi",
          preference: "Quality",
          status: "Active",
          joinDate: "2024-01-4",
          lastActive: "2024-01-20",
        },
        {
          id: 4,
          name: "Blossom",
          email: "blossomppg@gmail.com",
          device: "Raspberry Pi",
          preference: "Quantity",
          status: "Inactive",
          joinDate: "2024-01-8",
          lastActive: "2024-01-10",
        },
        {
          id: 5,
          name: "Mirinnn",
          email: "mirinnaka@gmail.com",
          device: "Phone",
          preference: "Quality",
          status: "Active",
          joinDate: "2024-01-12",
          lastActive: "2024-01-19",
        },
        {
          id: 6,
          name: "Buttercup",
          email: "buttercuppppg@gmail.com",
          device: "Phone",
          preference: "Quantity",
          status: "Active",
          joinDate: "2024-01-15",
          lastActive: "2024-01-20",
        },
        {
          id: 7,
          name: "Bubble",
          email: "bubbleppg@gmail.com",
          device: "Raspberry Pi",
          preference: "Quality",
          status: "Inactive",
          joinDate: "2024-01-14",
          lastActive: "2024-01-16",
        },
      ],
    };
  },
  methods: {
    getDeviceIcon(device) {
      return device === "Raspberry Pi" ? "RaspberryPiIcon" : "PhoneIcon";
    },
  },
  components: {
    RaspberryPiIcon: {
      template: `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="3" />
          <circle cx="6" cy="6" r="1" />
          <circle cx="18" cy="6" r="1" />
          <circle cx="6" cy="18" r="1" />
          <circle cx="18" cy="18" r="1" />
          <path d="M3 12h3m12 0h3M12 3v3m0 12v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `,
    },
    PhoneIcon: {
      template: `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `,
    },
  },
};
</script>
