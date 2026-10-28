# GetFit

A personal, iPhone-first fitness app. The first slice is a local workout log; food and Apple Health are planned, not connected.

## Current product brief

- Priority: gym logging, then food, then Apple Health history.
- Navigation: Today, Train, Food, Coach, Profile. Coach and Food currently explain that they are future work.
- Visual direction: a light, calm dashboard with dark workout surfaces, lime accents, system typography, and translucent navigation. Dashboard counts are derived from saved workouts; no sample metrics are shown.
- Use personal routines and custom exercises; preserve detailed sets independently of any future Health workout summaries.
- Local-first for one person. The app stores a versioned JSON record in SQLite; every committed action is saved before the screen updates. Export JSON from Profile to a location you trust. Profile supports validated JSON restore with a confirmation and one local undo point. Exports are manual and are not automatic backups. Uninstalling the app may remove local data.
- Weights are currently recorded in pounds; do not enter kilograms as though they were pounds. Unit preferences and conversion are not implemented.
- No account, cloud sync, nutrition, AI, or HealthKit integration is implemented yet.

## Running

Install dependencies with `npm install`, then run `npx expo start` and open on iOS. This project uses Expo SDK 58; use a supported Node version (22.13+, 24.3+, or 26+; Node 25 is not supported). A development build and appropriate signing will be needed for future HealthKit integration. For a device build, set an available iOS bundle identifier in app.json and configure your Apple signing team. See https://docs.expo.dev/develop/development-builds/introduction/.

Checks: `npx tsc --noEmit`, `node --test tests/model.test.mjs`, and `npx expo export --platform ios`.

## Decision log and open work

- Confirmed: five areas; prioritize training; local-first is acceptable; developer membership is available; diet is mainly home-cooked and takeout; use pounds, weight and reps, a manual rest timer, and backup restore. The supplied Gym note defines four lifting routines with separate progression tracks.
- Proposed: routines and immediate set saves first, food records second, read-only Health import third. Keep AI estimates editable and nutrition snapshots immutable.
- Before relying on this with irreplaceable data: test the complete Files export and restore flow, SQLite persistence, and interruption recovery on a real iPhone; add routine editing, set deletion, unit preferences, and more workout history editing. Restore validation and transaction rollback are covered by automated tests.
- Verify actual FitDays samples and HealthKit permissions on the device. No HealthKit field or sync claim is assumed.

Gym note import is optional in Train. It adds four routines and their exercise prescriptions without creating workout history. Ambiguous loads stay labeled as reference notes. The manual timer does not notify while the app is closed.
