import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'

export const useCounterStore = defineStore('counter', (): CounterStore => {
  const count = ref(0)
  const doubleCount = computed((): number => count.value * 2)
  function increment(): void {
    count.value++
  }

  return { count, doubleCount, increment }
})

interface CounterStore {
  readonly count: Ref<number>
  readonly doubleCount: ComputedRef<number>
  readonly increment: () => void
}
