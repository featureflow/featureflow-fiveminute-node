/**
 * FeatureFlow Node.js SDK - Feature Registration
 * 
 * This example demonstrates how to register features with the FeatureFlow SDK:
 * 1. Register features with specific values in your code
 * 2. Features will be automatically created in FeatureFlow if they don't exist
 * 3. Test different feature configurations during development
 * 
 * This is useful for:
 * - Pre-registering features in your application code
 * - Ensuring features exist before they're used
 * - Testing specific feature configurations during development
 * - CI/CD pipelines where you want to ensure features are available
 * 
 * Note: This still requires an internet connection to FeatureFlow.
 * Offline functionality will be available in an upcoming version.
 */

const Featureflow = require('featureflow-node-sdk');

// Initialize the FeatureFlow client with pre-registered features
// These features will be automatically created in FeatureFlow if they don't exist
const featureflow = new Featureflow.Client({
    apiKey: '{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}', // Your actual FeatureFlow API key
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

console.log('🚀 Initializing FeatureFlow client with pre-registered features...');

// The client will register features with FeatureFlow and then be ready
featureflow.ready((error) => {
    if (error) {
        console.error('❌ Failed to initialize FeatureFlow client:', error.message);
        return;
    }
    
    console.log('✅ FeatureFlow client initialized successfully!');
    console.log('📝 Features have been registered with FeatureFlow');
    
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

console.log('⏳ Registering features with FeatureFlow...');
console.log('💡 Next: Check out advanced-example.js for more advanced features!');
