# FeatureFlow Node.js – Get started in 5 minutes

Run a Node server with a singleton FeatureFlow client and a **GET /eval** endpoint.

## Quick start

1. **Prerequisites:** Node.js 12+, a [FeatureFlow](https://app.featureflow.com) account, and your Server Environment API key.

2. **Clone and install:**

   ```bash
   git clone https://github.com/featureflow/featureflow-fiveminute-node.git
   cd featureflow-fiveminute-node
   npm install
   ```

3. **Set your API key:**  
   In `server.js` replace `{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}`, or set `FEATUREFLOW_API_KEY` when you run.

4. **Run and try:**

   ```bash
   npm start
   ```

   Then open **http://localhost:3000/eval** (browser or Postman). You get JSON with the evaluated user, all features, and `example-feature` (isOn, value).

That’s it. The server uses one shared client, a sample user, and evaluates all features plus `example-feature`; `/eval` is unprotected so you can ping it from Postman.

## Troubleshooting

- **Client not ready / init errors:** Check your API key and network. Use the Server Environment API key from [app.featureflow.io](https://app.featureflow.io).
- **Unexpected feature results:** Check rules and user attributes in the FeatureFlow dashboard.

[Documentation](https://docs.featureflow.io) · [Node.js SDK](https://docs.featureflow.io/docs/nodejs-sdk) · [Dashboard](https://app.featureflow.io)

## License

ISC – see [LICENSE](LICENSE).
