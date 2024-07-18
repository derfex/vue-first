<script lang="ts" setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main class="app-main__root">
    <TheWelcome />
  </main>
</template>

<style scoped>
.app-main__root {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
