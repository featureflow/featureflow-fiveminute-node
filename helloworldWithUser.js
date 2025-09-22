/**
 * FeatureFlow Node.js SDK - User-Based Feature Evaluation
 * 
 * This example demonstrates how to evaluate features for specific users with attributes:
 * 1. Create a user with various attributes
 * 2. Evaluate features based on user context
 * 3. Use user targeting rules in FeatureFlow dashboard
 * 
 * This is useful for:
 * - A/B testing features for specific user segments
 * - Rolling out features to beta users
 * - Targeting features based on user properties
 */

const Featureflow = require('featureflow-node-sdk');

// Initialize the FeatureFlow client
const featureflow = new Featureflow.Client({
    apiKey: '{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}'
});

// Create a user with various attributes
// These attributes can be used in your FeatureFlow targeting rules
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

console.log('🚀 Initializing FeatureFlow client...');

// Wait for the client to be ready
featureflow.ready((error) => {
    if (error) {
        console.error('❌ Failed to initialize FeatureFlow client:', error.message);
        console.log('💡 Make sure your API key is correct and you have an internet connection');
        return;
    }
    
    console.log('✅ FeatureFlow client initialized successfully!');
    
    // Evaluate features for this specific user
    const featureResult = featureflow.evaluate("example-feature", user);
    
    console.log('📊 Feature evaluation for user:', {
        userId: user.getId(),
        feature: 'example-feature',
        isOn: featureResult.isOn(),
        value: featureResult.value()
    });
    
    if (featureResult.isOn()) {
        console.log('🎉 Showing feature to user!');
        console.log('   This user meets the targeting criteria for this feature');
    } else {
        console.log('❌ Not showing feature to user');
        console.log('   This user does not meet the targeting criteria for this feature');
    }
    
    // You can evaluate multiple features for the same user
    const allFeatures = featureflow.evaluateAll(user);
    console.log('📋 All features for this user:', allFeatures);
    
    // Close the client
    featureflow.close();
    console.log('🔒 FeatureFlow client closed');
});

console.log('⏳ Waiting for FeatureFlow client to initialize...');
console.log('💡 Next: Check out helloworldWithUserAndFeatureRegistration.js for offline development!');
