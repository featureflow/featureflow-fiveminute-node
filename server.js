/**
 * FeatureFlow Node.js SDK - Singleton example with REST /eval
 *
 * One singleton client, a sample user, and GET /eval returning evaluated features.
 * Set your API key below or via FEATUREFLOW_API_KEY, then run: node server.js
 * Ping http://localhost:3000/eval (e.g. from Postman) to see evaluated features.
 */

const http = require('node:http');
const Featureflow = require('featureflow-node-sdk');

const API_KEY = process.env.FEATUREFLOW_API_KEY || '{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}';
const PORT = process.env.PORT || 3000;

// Singleton client
let client = null;
let ready = false;

function getClient() {
  if (client) return client;
  client = new Featureflow.Client({ apiKey: API_KEY });
  return client;
}

// Sample user for evaluation
const user = new Featureflow.UserBuilder('user@example.com')
  .withAttribute('subscription', 'premium')
  .withAttribute('country', 'US')
  .build();

function evaluateFeatures() {
  const c = getClient();
  const all = c.evaluateAll(user);
  const exampleFeature = c.evaluate('example-feature', user);
  return {
    user: { id: user.getId(), attributes: user.getAttributes() },
    allFeatures: all,
    'example-feature': {
      isOn: exampleFeature.isOn(),
      value: exampleFeature.value()
    }
  };
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/eval') {
    if (!ready) {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'FeatureFlow client not ready yet' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(evaluateFeatures(), null, 2));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found. Try GET /eval');
});

getClient().ready((err) => {
  if (err) {
    console.error('FeatureFlow init failed:', err.message);
    process.exit(1);
  }
  ready = true;
  server.listen(PORT, () => {
    console.log('FeatureFlow singleton ready.');
    console.log(`GET http://localhost:${PORT}/eval`);
  });
});

process.on('SIGINT', () => {
  if (client) client.close();
  process.exit(0);
});
