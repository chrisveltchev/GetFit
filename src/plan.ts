// User-provided Gym.md: prescriptions, not completed workout records.
export const gymPlan = [
  { name: 'Monday · Lower strength + power', exercises: [
    ['Box Jump / side-to-side jumps', 'Box / bodyweight', '3 × 3 · Rest 60–90 sec · Note: 42 inches'],
    ['Back Squat', 'Barbell', '4 × 3–5 · Rest 2.5–3 min · Note: 90 (load basis unspecified)'],
    ['Romanian Deadlift', 'Barbell', '3 × 6–8 · Rest 2–2.5 min · Note: 60 (load basis unspecified)'],
    ['Bulgarian Split Squat', 'Dumbbell', '3 × 6–8 / leg · Rest 90–120 sec · Note: 45 (load basis unspecified)'],
    ['Single Leg Leaning Curl', 'Machine', '2 × 10–15 · Rest 60–75 sec · Note: 40'],
    ['Standing Calf Raise', 'Machine', '3 × 8–15 · Rest 60–75 sec · Note: 10'],
    ['Ab Wheel Rollout', 'Ab wheel', '3 × 8–12 · Rest 45–60 sec'],
  ] },
  { name: 'Tuesday · Upper hypertrophy', exercises: [
    ['Incline Bench Press', 'Dumbbell', '3 × 8–12 · Rest 90–120 sec · Note: 55 (load basis unspecified)'],
    ['Neutral-Grip Lat Pulldown (smaller one)', 'Cable', '3 × 8–12 · Rest 90–120 sec · Note: 130'],
    ['Chest-Supported Row', 'Machine', '3 × 8–12 · Rest 90–120 sec · Note: 50 each side'],
    ['Converging Chest Press', 'Machine', '2 × 10–15 · Rest 75–90 sec · Note: 50 each side'],
    ['Single-Arm Lateral Raise', 'Cable', '3 × 12–20 / arm · Rest 45–60 sec · Note: 10 lb'],
    ['Incline Curl', 'Dumbbell', '2 × 10–15 · Rest 60 sec · Note: 25 (load basis unspecified)'],
    ['Rope Triceps Pushdown', 'Cable', '2 × 10–15 · Rest 60 sec · Note: 40'],
  ] },
  { name: 'Thursday · Lower hypertrophy', exercises: [
    ['Hack Squat', 'Machine', '3 × 8–12 · Rest 2 min · Note: 90 each side'],
    ['Hip Thrust', 'Barbell', '3 × 8–12 · Rest 90–120 sec · Note: 70 each side'],
    ['Reverse Lunge', 'Dumbbell', '3 × 8–12 / leg · Rest 90–120 sec · Note: 40 each hand'],
    ['Laying Leg Curl', 'Machine', '3 × 10–15 · Rest 60–75 sec · Note: 135'],
    ['Leg Extension', 'Machine', '3 × 10–15 · Rest 60–75 sec · Note: 80'],
    ['Seated Calf Raise', 'Dumbbell', '2 × 10–15 · Rest 60–75 sec · Note: 50 lb dumbbells'],
    ['Pallof Press', 'Cable', '2 × 10–15 / side · Rest 45–60 sec · Note: 25 lb'],
  ] },
  { name: 'Friday · Upper strength + power', exercises: [
    ['Bench Press', 'Barbell', '4 × 3–5 · Rest 2.5–3 min · Note: 60 (load basis unspecified)'],
    ['Neutral-Grip Lat Pulldown', 'Cable', '4 × 4–6 · Rest 2–2.5 min · Note: 145'],
    ['Seated Shoulder Press', 'Dumbbell', '3 × 6–8 · Rest 90–120 sec · Note: 45 (load basis unspecified)'],
    ['Chest-Supported T-Bar Row', 'Plate-loaded machine', '3 × 6–8 · Rest 90–120 sec · Note: 100'],
    ['Single-Arm Lateral Push aways', 'Cable', '2 × 12–15 / arm · Rest 45–60 sec · Note: 20'],
    ['EZ-Bar Curl', 'EZ bar', '2 × 8–12 · Rest 60 sec · Note: 45'],
    ['Rope Triceps Pushdown', 'Cable', '2 × 8–12 · Rest 60 sec · Note: 50'],
  ] },
] as const;
