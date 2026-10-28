import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validSet, previousSets } from '../src/model.ts';

test('set validation accepts bodyweight and rejects invalid reps or RPE', () => {
  assert.equal(validSet('0', '10', ''), true);
  assert.equal(validSet('45.5', '8', '8.5'), true);
  for (const args of [['', '2', ''], ['-1', '2', ''], ['1', '2.5', ''], ['1', '0', ''], ['1', '2', '11'], ['1', '2', 'abc']]) assert.equal(validSet(...args), false);
});
test('previous performance uses the latest finished workout with recorded sets', () => {
  const set = (id, weight) => ({ id, weight, reps: 5 });
  const session = (id, startedAt, finishedAt, sets) => ({ id, name: id, startedAt, finishedAt, exercises: [{ id: 'e', exerciseId: 'squat', sets }] });
  const data = { version: 1, exercises: [], routines: [], workouts: [session('old', '2026-01-01', '2026-01-01', [set('a', 100)]), session('new', '2026-02-01', '2026-02-01', [set('b', 120)]), session('empty', '2026-03-01', '2026-03-01', []), session('current', '2026-04-01', undefined, [set('c', 200)])] };
  assert.deepEqual(previousSets(data, 'squat', 'current'), [set('b', 120)]);
  assert.deepEqual(previousSets(data, 'other', 'current'), []);
});
test('previous performance for a routine stays within the same progression track', () => {
  const exercise = weight => [{ id: 'we', exerciseId: 'pulldown', sets: [{ id: 's', weight, reps: 8 }] }];
  const workout = (id, routineId, day, weight) => ({ id, routineId, name: id, startedAt: `2026-01-0${day}T12:00:00Z`, finishedAt: `2026-01-0${day}T13:00:00Z`, exercises: exercise(weight) });
  const data = { version: 1, exercises: [], routines: [], workouts: [workout('tuesday', 'tue', 1, 100), workout('friday', 'fri', 2, 150), workout('current', 'tue', 3, 110)] };
  assert.equal(previousSets(data, 'pulldown', 'current')[0].weight, 100);
});
