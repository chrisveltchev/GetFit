import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { replaceWithUndo, revertRestore } from '../src/restore.ts';

function database() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('CREATE TABLE app_state (id INTEGER PRIMARY KEY NOT NULL, data TEXT NOT NULL)');
  return {
    getFirstSync: query => sqlite.prepare(query).get() ?? null,
    runSync: (query, ...params) => sqlite.prepare(query).run(...params),
    withTransactionSync: task => { sqlite.exec('BEGIN'); try { task(); sqlite.exec('COMMIT'); } catch (e) { sqlite.exec('ROLLBACK'); throw e; } },
  };
}
const before = { version: 1, exercises: [], routines: [], workouts: [] };
const after = { ...before, accent: 'blue' };
test('restore replaces data and undo restores the previous snapshot', () => {
  const db = database();
  db.runSync('INSERT INTO app_state (id, data) VALUES (1, ?)', JSON.stringify(before));
  replaceWithUndo(db, after, before);
  assert.deepEqual(JSON.parse(db.getFirstSync('SELECT data FROM app_state WHERE id = 1').data), after);
  assert.deepEqual(revertRestore(db), before);
  assert.deepEqual(JSON.parse(db.getFirstSync('SELECT data FROM app_state WHERE id = 1').data), before);
  assert.equal(db.getFirstSync('SELECT data FROM app_state WHERE id = 2'), null);
});
test('failed replacement rolls back both the current data and undo point', () => {
  const db = database();
  db.runSync('INSERT INTO app_state (id, data) VALUES (1, ?)', JSON.stringify(before));
  const run = db.runSync;
  db.runSync = (query, ...params) => { if (query.includes('VALUES (1,')) throw new Error('disk failure'); return run(query, ...params); };
  assert.throws(() => replaceWithUndo(db, after, before));
  assert.deepEqual(JSON.parse(db.getFirstSync('SELECT data FROM app_state WHERE id = 1').data), before);
  assert.equal(db.getFirstSync('SELECT data FROM app_state WHERE id = 2'), null);
});
