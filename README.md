# Testen — Example microservices and tests

This folder contains example microservices and tests used for learning and demonstrations.

## Overview

- `03_microservices/` — example microservices project (the main demo used by the exercises)
- `services/` — service implementations used by the exercises
- `test/` — automated tests used with Jest

## Prerequisites

- Node.js
- npm

## Run the demo

1. Change into the demo folder:

```bash
cd 03_microservices
```

2. Install dependencies:

```bash
npm install
```

3. Start the demo server:

```bash
npm run start
```

The demo uses `serve.js` and will print the URL/port in the terminal.

## Run the tests

From the `03_microservices` directory run:

```bash
npm install
npm test
```

This runs the Jest test suite. The repository includes `jest.config.cjs` and uses `babel-jest` for transpilation.

## Useful files

- `03_microservices/package.json` — scripts and dependencies (`start`, `test`)
- `03_microservices/serve.js` — demo server entrypoint
- `test/aggregation.test.js` (and other tests) — example tests using `supertest` and `msw`

## Notes

- The demo is intentionally minimal — edit `serve.js` or the services to experiment.
- If you need a different Node version, use your preferred version manager (nvm, fnm, etc.).
