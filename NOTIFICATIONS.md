# Berrify Notification System

## Overview

The notification system provides a clean and user-friendly way to show notifications to users throughout the app. It supports different types of notifications with automatic dismiss timers and manual close options.

## Features

- ✅ **4 Notification Types**: Success, Error, Warning, Info
- ✅ **Plant-Specific Notifications**: Pre-built messages for plant operations
- ✅ **Auto-Dismiss**: Configurable timers for automatic removal
- ✅ **Manual Close**: Click to dismiss notifications
- ✅ **Responsive Design**: Works on mobile and desktop
- ✅ **Smooth Animations**: Slide in/out transitions
- ✅ **Progress Bar**: Visual timer indicator

## How to Use

### Method 1: Direct Import (Recommended)

```javascript
import { notify } from '../services/NotificationService'

// In your component methods
methods: {
  someMethod() {
    notify.success('Operation completed successfully!')
    notify.error('Something went wrong!')
    notify.warning('Please check your input')
    notify.info('New update available')
  }
}
```

### Method 2: Using the Composable

```javascript
import { useNotifications } from "../composables/useNotifications";

export default {
  setup() {
    const { showSuccess, showError, notifyPlantAdded } = useNotifications();

    const doSomething = () => {
      showSuccess("Task completed!");
      notifyPlantAdded("My New Plant");
    };

    return { doSomething };
  },
};
```

## Notification Types

### Basic Notifications

```javascript
notify.success("Success message", 4000); // Green, 4 seconds
notify.error("Error message", 6000); // Red, 6 seconds
notify.warning("Warning message", 5000); // Orange, 5 seconds
notify.info("Info message", 4000); // Blue, 4 seconds
```

### Plant-Specific Notifications

```javascript
notify.plantAdded("Strawberry Plant 02");
notify.plantWatering("Strawberry Plant 01");
notify.plantReady("Strawberry Plant 01");
notify.scanComplete("Strawberry Plant 01", 7);
notify.harvestSuccess("Strawberry Plant 01", 5);
notify.moistureUpdated("Strawberry Plant 01", 75);
```

## Configuration

### Custom Duration

```javascript
notify.success("Message", 8000); // 8 seconds
notify.info("Message", 0); // No auto-dismiss
```

### Manual Control

```javascript
const notificationId = notify.success("Message");
// Later...
NotificationService.remove(notificationId);

// Clear all notifications
NotificationService.clear();
```

## Integration Examples

### In MyDairy.vue (Already Implemented)

- ✅ Plant added notifications
- ✅ Plant removed notifications
- ✅ Moisture update notifications
- ✅ Watering alerts

### In LoginPage.vue (Example)

```javascript
methods: {
  async login() {
    try {
      await this.authenticate()
      notify.success('Welcome back! 🌱')
      this.$router.push('/home')
    } catch (error) {
      notify.error('Invalid credentials. Please try again.')
    }
  }
}
```

### In Settings.vue (Example)

```javascript
methods: {
  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings))
    notify.success('Settings saved successfully! ✅')
  }
}
```

## Testing the System

Visit the My Diary page to see test buttons that demonstrate all notification types:

1. Success notification
2. Error notification
3. Warning notification
4. Info notification
5. Plant-specific alerts

## Styling

The notifications are styled to match the app's design system:

- **Position**: Top-right corner (responsive)
- **Colors**: Match notification types
- **Animation**: Smooth slide-in from right
- **Progress**: Visual countdown bar
- **Mobile**: Full-width on small screens

## Best Practices

1. **Use appropriate types**: Success for confirmations, Error for failures
2. **Keep messages concise**: One-line messages work best
3. **Include context**: Mention plant names or specific actions
4. **Don't overuse**: Avoid too many notifications at once
5. **Test durations**: Adjust timing based on message importance

## Advanced Usage

### Custom Notifications

```javascript
NotificationService.show(
  "Custom message",
  "success", // type
  7000 // duration
);
```

### Batch Notifications

```javascript
// Stagger multiple notifications
notify.info("Starting process...");
setTimeout(() => notify.success("Step 1 complete"), 1000);
setTimeout(() => notify.success("Step 2 complete"), 2000);
setTimeout(() => notify.success("All done! 🎉"), 3000);
```

The notification system is now ready to use throughout your Berrify app! 🍓
