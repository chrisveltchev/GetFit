export type Exercise = { id: string; name: string; muscle: string; equipment: string };
export type Routine = { id: string; name: string; exerciseIds: string[]; guidance?: Record<string, string> };
export type SetRecord = { id: string; weight: number; reps: number; rpe?: number };
export type WorkoutExercise = { id: string; exerciseId: string; sets: SetRecord[]; guidance?: string };
export type Workout = { id: string; name: string; startedAt: string; finishedAt?: string; routineId?: string; exercises: WorkoutExercise[] };
export type Accent = 'green' | 'blue';
export type Data = { version: 1; accent?: Accent; exercises: Exercise[]; routines: Routine[]; workouts: Workout[] };
export const initialData: Data = { version: 1, exercises: [], routines: [], workouts: [] };
export const id = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
export function previousSets(data: Data, exerciseId: string, currentId: string): SetRecord[] {
  const current = data.workouts.find(w => w.id === currentId);
  const previous = data.workouts.filter(w => w.id !== currentId && (!current?.routineId || w.routineId === current.routineId) && (!current || w.startedAt < current.startedAt) && w.finishedAt && w.exercises.some(e => e.exerciseId === exerciseId && e.sets.length))
    .sort ( (a, b) => b.startedAt.localeCompare(a.startedAt))[0];
  return previous?.exercises.find(e => e.exerciseId === exerciseId)?.sets ?? [];
}
export function validSet(weight: string, reps: string, rpe: string): boolean {
  const w = Number(weight), r = Number(reps), p = Number(rpe);
  return weight.trim() !== '' && reps.trim() !== '' && Number.isFinite(w) && w >= 0 && Number.isInteger(r) && r > 0 && (rpe.trim() === '' || (Number.isFinite(p) && p >= 1 && p <= 10));
}
