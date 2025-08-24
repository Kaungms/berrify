<template>
  <teleport to="body">
    <div class="notification-container">
      <transition-group name="notification" tag="div">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="['notification', `notification--${notification.type}`]"
          @click="removeNotification(notification.id)"
        >
          <div class="notification__icon">
            <i :class="getIcon(notification.type)"></i>
          </div>
          <div class="notification__content">
            <div class="notification__message">{{ notification.message }}</div>
            <div class="notification__time">{{ formatTime(notification.timestamp) }}</div>
          </div>
          <button class="notification__close" @click.stop="removeNotification(notification.id)">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script>
import { computed } from 'vue'
import { notificationStore, NotificationService, NOTIFICATION_TYPES } from '../services/NotificationService'

export default {
  name: 'NotificationContainer',
  setup() {
    const notifications = computed(() => notificationStore.notifications)

    const getIcon = (type) => {
      const icons = {
        [NOTIFICATION_TYPES.SUCCESS]: 'fas fa-check-circle',
        [NOTIFICATION_TYPES.ERROR]: 'fas fa-exclamation-circle',
        [NOTIFICATION_TYPES.WARNING]: 'fas fa-exclamation-triangle',
        [NOTIFICATION_TYPES.INFO]: 'fas fa-info-circle'
      }
      return icons[type] || icons[NOTIFICATION_TYPES.INFO]
    }

    const formatTime = (timestamp) => {
      return timestamp.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const removeNotification = (id) => {
      NotificationService.remove(id)
    }

    return {
      notifications,
      getIcon,
      formatTime,
      removeNotification
    }
  }
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  pointer-events: none;
}

.notification {
  display: flex;
  align-items: flex-start;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  margin-bottom: 12px;
  padding: 16px;
  min-width: 300px;
  max-width: 400px;
  border-left: 4px solid;
  pointer-events: auto;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.notification:hover {
  transform: translateX(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
}

.notification--success {
  border-left-color: #4CAF50;
  background: linear-gradient(135deg, #f8fff8 0%, #f0f8f0 100%);
}

.notification--error {
  border-left-color: #f44336;
  background: linear-gradient(135deg, #fff8f8 0%, #fdf0f0 100%);
}

.notification--warning {
  border-left-color: #ff9800;
  background: linear-gradient(135deg, #fffdf8 0%, #fdf8f0 100%);
}

.notification--info {
  border-left-color: #2196F3;
  background: linear-gradient(135deg, #f8fcff 0%, #f0f7ff 100%);
}

.notification__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 18px;
}

.notification--success .notification__icon {
  color: #4CAF50;
}

.notification--error .notification__icon {
  color: #f44336;
}

.notification--warning .notification__icon {
  color: #ff9800;
}

.notification--info .notification__icon {
  color: #2196F3;
}

.notification__content {
  flex: 1;
  min-width: 0;
}

.notification__message {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  line-height: 1.4;
  word-wrap: break-word;
}

.notification__time {
  font-size: 12px;
  color: #666;
  opacity: 0.8;
}

.notification__close {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: #999;
  font-size: 12px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification__close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #666;
}

/* Animation classes */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}

.notification-move {
  transition: transform 0.3s ease;
}

/* Progress bar animation */
.notification::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: currentColor;
  opacity: 0.3;
  animation: progress 5s linear forwards;
}

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

/* Responsive design */
@media (max-width: 480px) {
  .notification-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .notification {
    min-width: auto;
    max-width: none;
  }
}
</style>
