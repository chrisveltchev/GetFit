import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseBackup } from '../src/backup.ts';

const original = { version: 1, accent: 'blue', exercises: [{ id: 'e', name: 'Squat', muscle: 'Legs', equipment: 'Barbell' }], routines: [{ id: 'r', name: 'Leg day', exerciseIds: ['e'] }], workouts: [{ id: 'w', name: 'Leg day', startedAt: '2026-01-01T12:00:00.000Z', finishedAt: '2026-01-01T13:00:00.000Z', exercises: [{ id: 'we', exerciseId: 'e', sets: [{ id: 's', weight: 135, reps: 5 }] }] }] };
const wrap = data => JSON.stringify({ exportedAt: '2026-01-02T00:00:00.000Z', data });
test('a version 1 export round trips including its records and preference', () => {
  assert.deepEqual(parseBackup(wrap(original)), original);
  assert.deepEqual(parseBackup(wrap({ version: 1, exercises: [], routines: [], workouts: [] })), { version: 1, exercises: [], routines: [], workouts: [] });
});
test('invalid files and broken references cannot be restored', () => {
  const variants = [null, { ...original, version: 2 }, { ...original, exercises: [] }, { ...original, workouts: [{ ...original.workouts[0], exercises: [{ ...original.workouts[0].exercises[0], sets: [{ id: 's', weight: -1, reps: 1 }] }] }] }, { ...original, workouts: [original.workouts[0], original.workouts[0]] }];
  assert.throws(() => parseBackup('not json'));
  for (const variant of variants) assert.throws(() => parseBackup(wrap(variant)));
});
