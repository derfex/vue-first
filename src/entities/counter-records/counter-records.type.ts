export interface CounterRecord {
  readonly kind: CounterRecordKind
  readonly value: number
}

export enum CounterRecordKind {
  Custom = 'CUSTOM',
  Medium = 'MEDIUM',
  System = 'SYSTEM',
}
