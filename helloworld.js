/**
 * FeatureFlow Node.js SDK - Basic Example
 * 
 * This example demonstrates the most basic usage of the FeatureFlow SDK:
 * 1. Initialize the client with your API key
 * 2. Wait for the client to be ready
 * 3. Evaluate a feature flag
 * 4. Take action based on the result
 * 
 * Before running this example:
 * 1. Sign up at https://app.featureflow.io
 * 2. Create a project and get your Server Environment API Key
 * 3. Replace '{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}' with your actual API key
 * 4. Create a feature called 'example-feature' in your FeatureFlow dashboard
 */

const Featureflow = require('featureflow-node-sdk');

// Initialize the FeatureFlow client with your API key
// Get your API key from: https://app.featureflow.io
const featureflow = new Featureflow.Client({
    apiKey: '{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}'
});

console.log('🚀 Initializing FeatureFlow client...');

// Wait for the client to be ready before evaluating features
featureflow.ready((error) => {
    if (error) {
        console.error('❌ Failed to initialize FeatureFlow client:', error.message);
        console.log('💡 Make sure your API key is correct and you have an internet connection');
        return;
    }
    
    console.log('✅ FeatureFlow client initialized successfully!');
    
    // Evaluate all features (useful for debugging)
    console.log('📊 All features:', featureflow.evaluateAll());
    
    // Evaluate a specific feature
    const featureResult = featureflow.evaluate('example-feature');
    
    if (featureResult.isOn()) {
        console.log('🎉 The example-feature is ON!');
        console.log('   This means the feature is enabled for this evaluation');
    } else {
        console.log('❌ The example-feature is OFF!');
        console.log('   This means the feature is disabled for this evaluation');
    }
    
    // Show the feature value (useful for custom variants)
    console.log('📝 Feature value:', featureResult.value());
    
    // Close the client to free up resources
    featureflow.close();
    console.log('🔒 FeatureFlow client closed');
});

console.log('⏳ Waiting for FeatureFlow client to initialize...');
console.log('💡 Next: Check out helloworldWithUser.js for user-based feature evaluation!');
