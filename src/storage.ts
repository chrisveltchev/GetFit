import * as SQLite from 'expo-sqlite';
import { Data, initialData } from './model';
import { replaceWithUndo, revertRestore } from './restore';

let database: SQLite.SQLiteDatabase | undefined;
function getDb() {
  if (!database) {
    const opened = SQLite.openDatabaseSync('getfit.db');
    opened.execSync('PRAGMA journal_mode = WAL; CREATE TABLE IF NOT EXISTS app_state (id INTEGER PRIMARY KEY NOT NULL, data TEXT NOT NULL);');
    database = opened;
  }
  return database;
}
export function loadData(): Data {
  const row = getDb().getFirstSync<{ data: string }>('SELECT data FROM app_state WHERE id = 1');
  if (!row) return initialData;
  const data = JSON.parse(row.data) as Data;
  if (data.version !== 1 || !Array.isArray(data.workouts) || !Array.isArray(data.exercises) || !Array.isArray(data.routines)) throw new Error('Unsupported or invalid saved data');
  return data;
}
export function saveData(data: Data): void {
  getDb().runSync('INSERT INTO app_state (id, data) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data', JSON.stringify(data));
}

// Keep the previous record in the same transaction as the replacement.
export function restoreData(next: Data): void { replaceWithUndo(getDb(), next, initialData); }
export function hasRestorePoint(): boolean { return !!getDb().getFirstSync('SELECT id FROM app_state WHERE id = 2'); }
export function undoRestore(): Data { return revertRestore(getDb()); }
