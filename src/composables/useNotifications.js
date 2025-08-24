import { notify } from '../services/NotificationService'

// Composable for easy notification access in any component
export function useNotifications() {
  // Basic notification methods
  const showSuccess = (message, duration) => notify.success(message, duration)
  const showError = (message, duration) => notify.error(message, duration)
  const showWarning = (message, duration) => notify.warning(message, duration)
  const showInfo = (message, duration) => notify.info(message, duration)
  
  // Plant-specific notifications
  const notifyPlantAdded = (plantName) => notify.plantAdded(plantName)
  const notifyPlantRemoved = (plantName) => notify.info(`${plantName} has been removed from your garden.`)
  const notifyMoistureUpdate = (plantName, moisture) => notify.moistureUpdated(plantName, moisture)
  const notifyWateringNeeded = (plantName) => notify.plantWatering(plantName)
  const notifyHarvestReady = (plantName) => notify.plantReady(plantName)
  const notifyScanComplete = (plantName, count) => notify.scanComplete(plantName, count)
  const notifyHarvestSuccess = (plantName, count) => notify.harvestSuccess(plantName, count)
  
  // User action notifications
  const notifyLoginSuccess = (username) => notify.success(`Welcome back, ${username}! 🌱`)
  const notifyLoginError = () => notify.error('Invalid credentials. Please try again.')
  const notifyLogout = () => notify.info('You have been logged out successfully.')
  const notifySettingsSaved = () => notify.success('Settings saved successfully! ✅')
  const notifyProfileUpdated = () => notify.success('Profile updated successfully! 👤')
  
  // System notifications
  const notifyConnectionError = () => notify.error('Connection error. Please check your internet.')
  const notifyDataSaved = () => notify.info('Data saved automatically 💾')
  const notifyUpdateAvailable = () => notify.info('A new update is available! 🔄')
  
  return {
    // Basic notifications
    showSuccess,
    showError,
    showWarning,
    showInfo,
    
    // Plant notifications
    notifyPlantAdded,
    notifyPlantRemoved,
    notifyMoistureUpdate,
    notifyWateringNeeded,
    notifyHarvestReady,
    notifyScanComplete,
    notifyHarvestSuccess,
    
    // User notifications
    notifyLoginSuccess,
    notifyLoginError,
    notifyLogout,
    notifySettingsSaved,
    notifyProfileUpdated,
    
    // System notifications
    notifyConnectionError,
    notifyDataSaved,
    notifyUpdateAvailable,
    
    // Direct access to notification service
    notify
  }
}
