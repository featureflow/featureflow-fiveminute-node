# Configuration Guide

This guide will help you configure the FeatureFlow examples for your environment.

## Quick Setup

1. **Get your API Key**
   - Sign up at [FeatureFlow](https://app.featureflow.io)
   - Create a new project
   - Go to your project settings
   - Copy your Server Environment API Key

2. **Update the examples**
   - Replace `{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}` in all example files with your actual API key
   - Or set the `FEATUREFLOW_API_KEY` environment variable

## Environment Variables

You can use environment variables to configure the examples:

```bash
# Set your API key
export FEATUREFLOW_API_KEY=your_server_environment_api_key_here

# Set environment for staging/development testing
export FEATUREFLOW_ENVIRONMENT=staging

# Run the examples
node helloworld.js
```

## Available Scripts

The project includes npm scripts for easy testing:

```bash
# Basic examples
npm run start:basic
npm run start:user
npm run start:registration
npm run start:advanced

# Singleton polling example
npm run start:singleton

# Staging environment testing
npm run start:singleton:staging
npm run start:singleton:development

# Run all basic examples
npm run start:all
```

## Configuration Options

### Basic Configuration

```javascript
var featureflow = new Featureflow.Client({
    apiKey: 'your-api-key'
});
```

### Advanced Configuration

```javascript
var featureflow = new Featureflow.Client({
    apiKey: 'your-api-key',
    timeout: 5000,                    // Client timeout in milliseconds
    debug: true,                      // Enable debug logging
    apiBaseUrl: 'https://api.featureflow.io'  // Custom API base URL
});
```

### Environment-Specific Configuration

For testing against different environments (staging, development), you can configure different API base URLs:

```javascript
// Environment-specific API URLs
const apiBaseUrls = {
    production: 'https://api.featureflow.io',
    staging: 'https://staging-api.featureflow.io',
    development: 'https://dev-api.featureflow.io'
};

// Use environment variable to determine which URL to use
const environment = process.env.FEATUREFLOW_ENVIRONMENT || 'production';
const config = {
    apiKey: 'your-api-key',
    debug: true
};

if (environment !== 'production' && apiBaseUrls[environment]) {
    config.apiBaseUrl = apiBaseUrls[environment];
}

var featureflow = new Featureflow.Client(config);
```

### Testing Against Staging

To test against staging URLs, you can:

1. **Use environment variables:**
   ```bash
   FEATUREFLOW_ENVIRONMENT=staging node your-script.js
   ```

2. **Use npm scripts (if configured):**
   ```bash
   npm run start:singleton:staging
   ```

3. **Set environment in your code:**
   ```javascript
   process.env.FEATUREFLOW_ENVIRONMENT = 'staging';
   ```

### Pre-registering Features

```javascript
var featureflow = new Featureflow.Client({
    apiKey: 'your-api-key',  // Your actual FeatureFlow API key
    withFeatures: [
        new Featureflow.Feature('my-feature', 'on').build(),
        new Featureflow.Feature('another-feature', 'off').build()
    ]
});
```

This will automatically create these features in your FeatureFlow dashboard if they don't already exist.

### Singleton Client with Polling

For production applications that need to stay running and receive real-time feature updates:

```javascript
const featureFlow = FeatureFlowSingleton.getInstance();
await featureFlow.initialize('your-api-key');

// The client will poll for updates every 10 seconds (configurable)
// Features can be updated in the FeatureFlow dashboard and will be reflected immediately
```

## Feature Setup

To test the examples, create these features in your FeatureFlow dashboard:

1. **example-feature** - Basic on/off feature
2. **new-dashboard** - Feature for testing user targeting
3. **premium-features** - Feature for subscription-based targeting
4. **beta-features** - Feature for beta user targeting
5. **dark-mode** - Feature with custom variants (light/dark/system)
6. **advanced-analytics** - Feature for analytics tracking

## User Targeting Rules

Set up targeting rules in your FeatureFlow dashboard:

- **Premium users**: Target users with `subscription = "premium"`
- **Beta users**: Target users with `betaTester = true`
- **Location-based**: Target users in specific countries
- **Age-based**: Target users within certain age ranges

## Troubleshooting

### Common Issues

1. **"Client not ready" error**
   - Check your API key is correct
   - Verify internet connection
   - Ensure FeatureFlow service is accessible

2. **Features not evaluating as expected**
   - Check feature configuration in dashboard
   - Verify user attributes match targeting rules
   - Ensure features are published and active

3. **API key issues**
   - Use Server Environment API key (not Client key)
   - Verify key has correct permissions
   - Check key is for the right environment

### Debug Mode

Enable debug logging to see detailed information:

```javascript
var featureflow = new Featureflow.Client({
    apiKey: 'your-api-key',
    debug: true
});
```

This will show:

- Client initialization status
- Feature evaluation details
- API request/response information
- Error details

## Next Steps

Once you have the basic examples working:

1. Create your own features in the FeatureFlow dashboard
2. Set up targeting rules for your use cases
3. Integrate FeatureFlow into your application
4. Use the advanced example as a reference for production patterns

For more information, visit the [FeatureFlow Documentation](https://docs.featureflow.io).
