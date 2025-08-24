import { reactive } from 'vue'

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

// Reactive notification store
export const notificationStore = reactive({
  notifications: []
})

// Notification service
export class NotificationService {
  static show(message, type = NOTIFICATION_TYPES.INFO, duration = 5000) {
    const notification = {
      id: Date.now() + Math.random(),
      message,
      type,
      duration,
      timestamp: new Date()
    }

    notificationStore.notifications.push(notification)

    // Auto remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification.id)
      }, duration)
    }

    return notification.id
  }

  static success(message, duration = 4000) {
    return this.show(message, NOTIFICATION_TYPES.SUCCESS, duration)
  }

  static error(message, duration = 6000) {
    return this.show(message, NOTIFICATION_TYPES.ERROR, duration)
  }

  static warning(message, duration = 5000) {
    return this.show(message, NOTIFICATION_TYPES.WARNING, duration)
  }

  static info(message, duration = 4000) {
    return this.show(message, NOTIFICATION_TYPES.INFO, duration)
  }

  static remove(id) {
    const index = notificationStore.notifications.findIndex(n => n.id === id)
    if (index > -1) {
      notificationStore.notifications.splice(index, 1)
    }
  }

  static clear() {
    notificationStore.notifications.splice(0)
  }

  // Plant-specific notifications
  static plantWatering(plantName) {
    return this.warning(`🚿 ${plantName} needs watering! Soil moisture is low.`, 8000)
  }

  static plantReady(plantName) {
    return this.success(`🍓 ${plantName} strawberries are ready to harvest!`, 10000)
  }

  static scanComplete(plantName, count) {
    return this.info(`📸 Scan complete for ${plantName}: ${count} strawberries detected`, 5000)
  }

  static harvestSuccess(plantName, count) {
    return this.success(`✅ Successfully harvested ${count} strawberries from ${plantName}!`, 6000)
  }

  static plantAdded(plantName) {
    return this.success(`🌱 ${plantName} has been added to your garden!`, 4000)
  }

  static moistureUpdated(plantName, moisture) {
    const icon = moisture >= 70 ? '💧' : moisture >= 50 ? '⚠️' : '🚨'
    const status = moisture >= 70 ? 'optimal' : moisture >= 50 ? 'moderate' : 'low'
    return this.info(`${icon} ${plantName} moisture updated: ${moisture}% (${status})`, 4000)
  }
}

// Global notification function for easy access
export const notify = NotificationService
