# FeatureFlow Node.js 5-Minute Test

A comprehensive example to get you up and running with the FeatureFlow Node.js SDK in just 5 minutes.

## 🚀 Quick Start

### Prerequisites

- Node.js (v12 or higher)
- A FeatureFlow account ([Sign up here](https://app.featureflow.io))
- Your FeatureFlow Server Environment API Key

### Installation

**Step 1:** Clone this repository:

```bash
git clone https://github.com/featureflow/featureflow-fiveminute-node.git
cd featureflow-fiveminute-node
```

**Step 2:** Install dependencies:

```bash
npm install
# or
yarn install
```

**Step 3:** Get your API key from the [FeatureFlow Dashboard](https://app.featureflow.io) and update the examples with your key.

## 📚 Examples

This repository contains progressive examples that demonstrate different aspects of the FeatureFlow SDK:

### 1. Basic Example (`helloworld.js`)

The simplest way to get started with FeatureFlow.

```bash
node helloworld.js
```

**What it does:**

- Initializes the FeatureFlow client
- Evaluates a feature flag
- Shows basic on/off functionality

### 2. User-Based Evaluation (`helloworldWithUser.js`)

Demonstrates how to evaluate features for specific users with attributes.

```bash
node helloworldWithUser.js
```

**What it does:**

- Creates a user with attributes
- Evaluates features based on user context
- Shows how user targeting works

### 3. Feature Registration (`helloworldWithUserAndFeatureRegistration.js`)

Shows how to register features locally for offline development.

```bash
node helloworldWithUserAndFeatureRegistration.js
```

**What it does:**

- Registers features locally
- Works offline without API calls
- Perfect for development and testing

### 4. Advanced Example (`advanced-example.js`)

A comprehensive example showing advanced SDK features.

```bash
node advanced-example.js
```

**What it does:**

- Multiple feature evaluations
- Custom feature variants
- Error handling
- Event tracking

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
FEATUREFLOW_API_KEY=your_server_environment_api_key_here
```

### API Key Setup

1. Sign up at [FeatureFlow](https://app.featureflow.io)
2. Create a new project
3. Go to your project settings
4. Copy your Server Environment API Key
5. Replace `{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}` in the example files

## 📖 Key Concepts

### Feature Evaluation

```javascript
// Basic evaluation
if (featureflow.evaluate('my-feature').isOn()) {
    // Feature is enabled
}

// User-specific evaluation
if (featureflow.evaluate('my-feature', user).isOn()) {
    // Feature is enabled for this user
}
```

### User Attributes

```javascript
const user = new Featureflow.UserBuilder("user@example.com")
    .withAttribute("firstName", "John")
    .withAttribute("lastName", "Doe")
    .withAttribute("age", 25)
    .withAttributes("tags", ["premium", "beta"])
    .build();
```

### Feature Registration

```javascript
const featureflow = new Featureflow.Client({
    apiKey: 'your-api-key',
    withFeatures: [
        new Featureflow.Feature('feature-one', 'on').build(),
        new Featureflow.Feature('feature-two', 'off').build(),
        new Featureflow.Feature('feature-three', 'custom').build(),
    ]
});
```

## 🛠 Available Scripts

- `npm run start:basic` - Run the basic example
- `npm run start:user` - Run the user-based example
- `npm run start:registration` - Run the feature registration example
- `npm run start:advanced` - Run the advanced example
- `npm run start:all` - Run all examples

## 🔍 Understanding the Output

When you run the examples, you'll see output like:

```text
FeatureFlow Client initialized successfully
All features: { 'example-feature': { isOn: true, value: 'on' } }
The example-feature variant is on!
```

This tells you:

- Whether the client initialized successfully
- All evaluated features and their states
- The result of your specific feature check

## 🚨 Troubleshooting

### Common Issues

1. **"Client not ready" error**
   - Ensure your API key is correct
   - Check your internet connection
   - Verify the FeatureFlow service is accessible

2. **Features not evaluating as expected**
   - Check your feature configuration in the FeatureFlow dashboard
   - Verify user attributes match your targeting rules
   - Ensure features are published and active

3. **API key issues**
   - Make sure you're using the Server Environment API key
   - Verify the key has the correct permissions
   - Check that the key is for the right environment

### Getting Help

- 📚 [FeatureFlow Documentation](https://docs.featureflow.io)
- 💬 [Community Support](https://github.com/featureflow/featureflow-fiveminute-node/issues)
- 📧 [Email Support](mailto:support@featureflow.io)

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔗 Links

- [FeatureFlow Website](https://featureflow.io)
- [FeatureFlow Documentation](https://docs.featureflow.io)
- [Node.js SDK Documentation](https://docs.featureflow.io/docs/nodejs-sdk)
- [FeatureFlow Dashboard](https://app.featureflow.io)
