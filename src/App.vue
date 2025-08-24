<template>
  <router-view></router-view>
  <NotificationContainer />
</template>

<script>
import NotificationContainer from './components/NotificationContainer.vue'

export default {
  name: "App",
  components: {
    NotificationContainer
  }
};
</script>
