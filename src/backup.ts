import type { Data } from './model';

// Reject malformed or unfamiliar files before touching the database.
export function parseBackup(text: string): Data {
  const fail = (): never => { throw new Error('This file is not a valid GetFit version 1 backup.'); };
  let envelope: any;
  try { envelope = JSON.parse(text); } catch { return fail(); }
  const data = envelope?.data;
  const object = (v: any) => v !== null && typeof v === 'object' && !Array.isArray(v);
  const str = (v: any) => typeof v === 'string' && v.trim().length > 0;
  const date = (v: any) => typeof v === 'string' && Number.isFinite(Date.parse(v));
  const unique = (items: any[]) => items.every(object) && new Set(items.map(x => x.id)).size === items.length;
  if (!object(data) || data.version !== 1 || !Array.isArray(data.exercises) || !Array.isArray(data.routines) || !Array.isArray(data.workouts) || (data.accent !== undefined && data.accent !== 'green' && data.accent !== 'blue')) return fail();
  if (!data.exercises.every((e: any) => object(e) && str(e.id) && str(e.name) && typeof e.muscle === 'string' && typeof e.equipment === 'string') || !unique(data.exercises)) return fail();
  const exerciseIds = new Set(data.exercises.map((e: any) => e.id));
  if (!data.routines.every((r: any) => object(r) && str(r.id) && str(r.name) && Array.isArray(r.exerciseIds) && r.exerciseIds.every((id: any) => exerciseIds.has(id)) && new Set(r.exerciseIds).size === r.exerciseIds.length && (r.guidance === undefined || (object(r.guidance) && Object.entries(r.guidance).every(([key, value]) => r.exerciseIds.includes(key) && typeof value === 'string')))) || !unique(data.routines)) return fail();
  if (!data.workouts.every((w: any) => object(w) && str(w.id) && str(w.name) && date(w.startedAt) && (w.finishedAt === undefined || (date(w.finishedAt) && Date.parse(w.finishedAt) >= Date.parse(w.startedAt))) && (w.routineId === undefined || (str(w.routineId) && data.routines.some((r: any) => r.id === w.routineId))) && Array.isArray(w.exercises) && unique(w.exercises) && w.exercises.every((e: any) => object(e) && str(e.id) && exerciseIds.has(e.exerciseId) && (e.guidance === undefined || typeof e.guidance === 'string') && Array.isArray(e.sets) && unique(e.sets) && e.sets.every((s: any) => object(s) && str(s.id) && typeof s.weight === 'number' && Number.isFinite(s.weight) && s.weight >= 0 && Number.isInteger(s.reps) && s.reps > 0 && (s.rpe === undefined || (typeof s.rpe === 'number' && Number.isFinite(s.rpe) && s.rpe >= 1 && s.rpe <= 10))))) || !unique(data.workouts) || data.workouts.filter((w: any) => !w.finishedAt).length > 1) return fail();
  return data as Data;
}
