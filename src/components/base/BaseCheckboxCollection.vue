<!-- BaseCheckboxCollection -->
<!--
## EN
In the current implementation, this works without events,
due to changing the properties of the object from the parent component.
This helps to reduce code and optimize execution speed due to the rejection of object cloning.
However, changing properties is a side effect that is not explicitly tracked by the parent component.

## RU
В текущей реализации это работает без событий, благодаря изменению свойств объекта из родительского компонента.
Это способствует сокращению кода и оптимизации скорости выполнения из-за отказа от клонирования объекта.
Однако, изменение свойств — сторонний эффект, явно не отслеживаемый родительским компонентом.
-->
<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  readonly flags: Record<string, boolean>
}>()
</script>

<template>
  <ul class="app-BaseCheckboxCollection__root">
    <li v-for="(value, flag) in flags" :key="flag">
      <label class="app-BaseCheckboxCollection__label">
        <input type="checkbox" v-model="flags[flag]" />
        {{ flag }}
      </label>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.app-BaseCheckboxCollection__root {
  list-style: none;
}

.app-BaseCheckboxCollection__label {
  cursor: pointer;
}
</style>
