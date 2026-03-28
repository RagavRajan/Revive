import type { DBSchema } from 'idb'
import type { DayRecord, AppSettings } from '../types'

export interface ReviveDB extends DBSchema {
  days: {
    key: string
    value: DayRecord
  }
  settings: {
    key: string
    value: AppSettings
  }
}
