/**
 * FeatureFlow Node.js SDK - Feature Registration (Offline Development)
 * 
 * This example demonstrates how to register features locally for offline development:
 * 1. Register features with specific values locally
 * 2. Work without API calls (perfect for development)
 * 3. Test different feature configurations
 * 
 * This is useful for:
 * - Local development without internet connection
 * - Testing specific feature configurations
 * - CI/CD pipelines where you want predictable behavior
 * - Development environments where you don't want to hit the API
 */

const Featureflow = require('featureflow-node-sdk');

// Initialize the FeatureFlow client with locally registered features
// This allows you to work offline and test specific feature configurations
const featureflow = new Featureflow.Client({
    apiKey: '{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}', // Can be any string for offline mode
    withFeatures: [
        // Register features with specific values
        new Featureflow.Feature('feature-one', 'on').build(),        // Always ON
        new Featureflow.Feature('feature-two').build(),              // Default OFF
        new Featureflow.Feature('feature-three', 'custom').build(),  // Custom variant
        new Featureflow.Feature('example-feature', 'on').build(),    // The feature we're testing
    ]
});

// Create a user with attributes
const user = new Featureflow.UserBuilder("jimmy@example.com")
    .withAttribute("firstName", "Jimmy")
    .withAttribute("lastName", "Hendrix")
    .withAttributes("hobbies", ["swimming", "skiing", "rowing"])
    .withAttribute("age", 32)
    .withAttribute("signupDate", new Date(2017, 10, 28))
    .withAttribute("subscription", "premium")
    .withAttribute("location", "California")
    .build();

console.log('👤 Created user:', {
    id: user.getId(),
    attributes: user.getAttributes()
});

console.log('🚀 Initializing FeatureFlow client with local features...');

// The client is ready immediately when using local features
featureflow.ready((error) => {
    if (error) {
        console.error('❌ Failed to initialize FeatureFlow client:', error.message);
        return;
    }
    
    console.log('✅ FeatureFlow client initialized successfully!');
    console.log('📝 Using locally registered features (no API calls needed)');
    
    // Show all registered features
    const allFeatures = featureflow.evaluateAll(user);
    console.log('📋 All registered features:', allFeatures);
    
    // Test each registered feature
    const features = ['feature-one', 'feature-two', 'feature-three', 'example-feature'];
    
    for (const featureKey of features) {
        const result = featureflow.evaluate(featureKey, user);
        console.log(`🔍 Feature "${featureKey}":`, {
            isOn: result.isOn(),
            value: result.value()
        });
    }
    
    // Test the main feature we're interested in
    const featureResult = featureflow.evaluate("example-feature", user);
    
    console.log('\n🎯 Testing example-feature:');
    if (featureResult.isOn()) {
        console.log('🎉 Showing feature to user!');
        console.log('   The feature is enabled with value:', featureResult.value());
    } else {
        console.log('❌ Not showing feature to user');
        console.log('   The feature is disabled');
    }
    
    // Close the client
    featureflow.close();
    console.log('🔒 FeatureFlow client closed');
});

console.log('⏳ Processing locally registered features...');
console.log('💡 Next: Check out advanced-example.js for more advanced features!');
