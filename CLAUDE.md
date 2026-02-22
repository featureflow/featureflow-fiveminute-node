# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **tutorial/example repository** for the [FeatureFlow Node.js SDK](https://docs.featureflow.io/docs/nodejs-sdk). It contains a single example: a Node server with a singleton FeatureFlow client and a REST endpoint to evaluate features.

## Running the Example

```bash
npm install
npm start
```

Then open or request **GET http://localhost:3000/eval** (e.g. from Postman) to see evaluated features as JSON.

There are no tests (`npm test` exits with error by design).

## API Key Setup

Set your FeatureFlow **Server Environment API Key** from [app.featureflow.io](https://app.featureflow.io): either replace `{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}` in `server.js` or set the `FEATUREFLOW_API_KEY` environment variable.

## What the Example Does

- **Singleton client** — One `Featureflow.Client` (minimal config: `apiKey` only), created once via `getClient()`.
- **User** — A sample user built with `UserBuilder` (e.g. `user@example.com` with attributes like `subscription`, `country`).
- **Evaluation** — `evaluateAll(user)` and `evaluate('example-feature', user)`.
- **REST** — Unprotected **GET /eval** returns JSON: `user`, `allFeatures`, and `example-feature` (isOn, value). Use Postman or curl to hit it.

## SDK Patterns (from server.js)

```javascript
const Featureflow = require('featureflow-node-sdk');

// Singleton: one client per process
const client = new Featureflow.Client({ apiKey: 'your-key' });
client.ready((error) => { /* start server when ready */ });

// User + evaluation
const user = new Featureflow.UserBuilder("user@example.com")
    .withAttribute("subscription", "premium")
    .build();
client.evaluateAll(user);
client.evaluate('example-feature', user).isOn();
client.evaluate('example-feature', user).value();

// Cleanup
client.close();
```
