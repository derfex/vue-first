<script lang="ts" setup>
import { ref } from 'vue'
import BaseCheckboxCollection from '../components/base/BaseCheckboxCollection.vue'
import GamePlayersBrowser from '../entities/game-players/GamePlayersBrowser.vue'

const need = ref({
  HelloWorld: false,
  GamePlayersBrowser: true,
  ClickCounter: true,
})
</script>

<template>
  <div class="app-works__root">
    <div>
      <h1>List of works</h1>
      <div class="app-works__checkboxes-container">
        <BaseCheckboxCollection :flags="need" />
      </div>
    </div>
    <section class="app-works__section">
      <div class="app-works__scrollable-area">
        <div v-if="need.GamePlayersBrowser" class="app-container">
          <div class="app-wrapper">
            <GamePlayersBrowser />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.app-works__root {
  display: grid;
  gap: 40px;
  grid-template-rows: auto 1fr;
}

.app-works__checkboxes-container {
  width: 250px;
}

.app-works__section {
  position: relative;
  border: 1px solid var(--color-border);
  min-height: 200px;
}

.app-works__scrollable-area {
  --scrollable-area-margin: 20px;

  position: absolute;
  top: var(--scrollable-area-margin);
  right: var(--scrollable-area-margin);
  bottom: var(--scrollable-area-margin);
  left: var(--scrollable-area-margin);
  overflow: auto;
}

@media (min-width: 1024px) {
  .app-works__root {
    padding-bottom: 2rem;
  }
}
</style>
