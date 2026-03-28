import { openDB, type IDBPDatabase } from 'idb'
import type { ReviveDB } from './schema'
import { DB_NAME, DB_VERSION } from '../utils/constants'

let dbInstance: IDBPDatabase<ReviveDB> | null = null

export async function getDB(): Promise<IDBPDatabase<ReviveDB>> {
  if (dbInstance) return dbInstance

  dbInstance = await openDB<ReviveDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('days')) {
        db.createObjectStore('days')
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings')
      }
    },
  })

  return dbInstance
}
