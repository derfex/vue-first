import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'

export const useCounterStore = defineStore('counter', (): CounterStore => {
  const count = ref(0)
  const doubleCount = computed((): number => count.value * 2)
  function decrement(): void {
    --count.value
  }
  function increment(): void {
    ++count.value
  }

  const records = ref<CounterRecord[]>([])
  const recordsSum = computed((): number => {
    return records.value.reduce(
      (previousValue: number, record: CounterRecord): number => previousValue + record.value,
      0,
    )
  })
  function addRecord(record: CounterRecord): void {
    records.value.push(record)
  }

  return { addRecord, count, decrement, doubleCount, increment, records, recordsSum }
})

interface CounterStore {
  readonly addRecord: (record: CounterRecord) => void
  readonly count: Ref<number>
  readonly decrement: () => void
  readonly doubleCount: ComputedRef<number>
  readonly increment: () => void
  readonly records: Ref<CounterRecord[]>
  readonly recordsSum: ComputedRef<number>
}

interface CounterRecord {
  readonly kind: CounterRecordKind
  readonly value: number
}

enum CounterRecordKind {
  Custom = 'CUSTOM',
  Medium = 'MEDIUM',
  System = 'SYSTEM',
}
