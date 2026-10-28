# GetFit

GetFit is an iPhone-first fitness app for bringing workouts, nutrition, activity, and body trends into one clear view. It is designed for quick logging during real workouts and useful progress reviews over time.

## What the app does today

- Create exercises and reusable workout routines.
- Log sets, reps, and weight, then resume an interrupted workout or edit a finished session.
- See previous performance when logging the same exercise and use an optional manual rest timer.
- Review completed workouts and total sets on the Today screen.
- Keep workout records on the device and export or restore a JSON backup.
- Choose a green or light blue accent in Profile.

Food logging, Apple Health import, and the Coach are represented in the app but are not functional yet. They are intended to connect nutrition and activity with the training record as the product develops.

## Run locally

This is an Expo and React Native project. Use a Node.js version supported by Expo SDK 58, then run:

```bash
npm install
npx expo start
```

Open the app in an iOS simulator or on an iPhone. Native integrations such as HealthKit will require a development build.

To run the current checks:

```bash
npx tsc --noEmit
npx eslint App.tsx src tests
node --test tests/*.test.mjs
```

Workout data is stored locally. Exports are manual; save backup files somewhere you trust before removing the app or changing devices.
