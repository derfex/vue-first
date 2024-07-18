<script lang="ts" setup>
import { computed, ref } from 'vue'
import { CounterRecordKind } from '../../entities/counter-records/counter-records.type'
import { useCounterStore } from '../../stores/counter'

// # data
const store = useCounterStore()

const customNumber = ref(0)

// # computed
const total = computed((): number => store.recordsSum + store.count)

// # methods
// region ## The first sum
function appendCustom(): void {
  store.addRecord({
    kind: CounterRecordKind.Custom,
    value: customNumber.value,
  })
}
function appendMedium(): void {
  store.addRecord({
    kind: CounterRecordKind.Medium,
    value: getRandomInteger(-50, 50),
  })
}
function appendSystem(): void {
  store.addRecord({
    kind: CounterRecordKind.System,
    value: getRandomInteger(-50, 50),
  })
}
// endregion ## The first sum

// region ## Additional count
function decrement(): void {
  store.decrement()
}
function increment(): void {
  store.increment()
}
// endregion ## Additional count

// # private
function getRandomInteger(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max + 1 - min))
}
</script>

<template>
  <div>
    <h1>Click counter</h1>
    <section>
      <div class="summation">
        <h2>Records</h2>
        <ol class="records">
          <li v-for="(record, index) in store.records" :key="index">
            {{ record.kind }} — {{ record.value }}
          </li>
        </ol>
      </div>
      <p>
        <label>
          <input type="number" v-model.number="customNumber" />
          <button @click="appendCustom">Append custom</button>
        </label>
        <button @click="appendSystem">Append system</button>
        <button @click="appendMedium">Append medium</button>
      </p>
    </section>
    <section>
      <h2>Count</h2>
      <p>{{ store.count }}</p>
      <p>
        <button @click="decrement">–</button>
        <button @click="increment">+</button>
      </p>
    </section>
    <section>
      <h2>Total</h2>
      <p>{{ total }}</p>
    </section>
  </div>
</template>

<style lang="sass" scoped>
$color-border: #eee

.records
  overflow-y: auto
  border: 1px solid $color-border
  height: 100px
  font-family: monospace
</style>
