# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **tutorial/example repository** for the [FeatureFlow Node.js SDK](https://docs.featureflow.io/docs/nodejs-sdk). It contains progressive examples demonstrating SDK usage patterns, not a library or application.

## Running Examples

```bash
npm install

# Individual examples
npm run start:basic          # helloworld.js
npm run start:user           # helloworldWithUser.js
npm run start:registration   # helloworldWithUserAndFeatureRegistration.js
npm run start:advanced       # advanced-example.js
npm run start:singleton      # singleton-polling-example.js (runs for 2 min)

# Environment-specific
npm run start:singleton:staging
npm run start:singleton:development

# Run all basic examples sequentially
npm run start:all
```

There are no tests (`npm test` exits with error by design).

## API Key Setup

All examples require a FeatureFlow **Server Environment API Key** from [app.featureflow.io](https://app.featureflow.io). Look for the `{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}` placeholder in each file, or set `FEATUREFLOW_ENVIRONMENT` and use the environment variable pattern shown in `singleton-polling-example.js`.

## Example Progression

The examples build on each other:

1. **`helloworld.js`** — Minimal client init + `evaluate()` + `isOn()`
2. **`helloworldWithUser.js`** — `UserBuilder` with attributes for targeting
3. **`helloworldWithUserAndFeatureRegistration.js`** — `withFeatures` config to pre-register features in the dashboard
4. **`advanced-example.js`** — Multiple features, custom variants, error handling, event tracking
5. **`singleton-polling-example.js`** — Singleton pattern with `pollingInterval`, environment switching, graceful shutdown via `SIGINT`

## SDK Patterns

```javascript
const Featureflow = require('featureflow-node-sdk');

// Client init
const featureflow = new Featureflow.Client({
    apiKey: 'your-key',
    pollingInterval: 10000,  // ms, default is higher for production
    debug: true,
    apiBaseUrl: 'https://api.featureflow.io'  // override for staging/dev
});

// Async ready
featureflow.ready((error) => { /* ... */ });

// Evaluation
featureflow.evaluate('feature-key').isOn();
featureflow.evaluate('feature-key', user).value(); // returns variant string
featureflow.evaluateAll(); // returns all features as object

// User targeting
const user = new Featureflow.UserBuilder("user@example.com")
    .withAttribute("subscription", "premium")
    .withAttributes("tags", ["beta"])
    .build();

// Pre-register features (auto-creates in dashboard if absent)
withFeatures: [new Featureflow.Feature('key', 'off').build()]

// Cleanup
featureflow.close();
```

## Environment URLs

- Production: `https://api.featureflow.io`
- Staging: `https://api.featureflow-staging.com`
- Development: `http://localhost:8082`

Controlled via `FEATUREFLOW_ENVIRONMENT=staging|development|production`.
