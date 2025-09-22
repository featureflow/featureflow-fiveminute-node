/**
 * FeatureFlow Node.js SDK - Advanced Example
 * 
 * This example demonstrates advanced features of the FeatureFlow SDK:
 * 1. Multiple feature evaluations with different strategies
 * 2. Custom feature variants and A/B testing
 * 3. Error handling and fallback strategies
 * 4. Event tracking and analytics
 * 5. Different user segments and targeting
 * 
 * This example shows real-world usage patterns for production applications.
 */

const Featureflow = require('featureflow-node-sdk');

// Initialize the FeatureFlow client
const featureflow = new Featureflow.Client({
    apiKey: '{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}'
});

console.log('🚀 Advanced FeatureFlow Example Starting...\n');

// Create different user segments for testing
const users = [
    // Premium user
    new Featureflow.UserBuilder("premium@example.com")
        .withAttribute("firstName", "Alice")
        .withAttribute("subscription", "premium")
        .withAttribute("signupDate", new Date(2023, 0, 15))
        .withAttribute("location", "US")
        .withAttribute("age", 28)
        .withAttributes("interests", ["technology", "gaming"])
        .build(),
    
    // Free user
    new Featureflow.UserBuilder("free@example.com")
        .withAttribute("firstName", "Bob")
        .withAttribute("subscription", "free")
        .withAttribute("signupDate", new Date(2023, 5, 20))
        .withAttribute("location", "CA")
        .withAttribute("age", 35)
        .withAttributes("interests", ["sports", "music"])
        .build(),
    
    // Beta user
    new Featureflow.UserBuilder("beta@example.com")
        .withAttribute("firstName", "Charlie")
        .withAttribute("subscription", "beta")
        .withAttribute("signupDate", new Date(2022, 11, 1))
        .withAttribute("location", "UK")
        .withAttribute("age", 42)
        .withAttributes("interests", ["technology", "design"])
        .withAttribute("betaTester", true)
        .build()
];

// Wait for the client to be ready
featureflow.ready((error) => {
    if (error) {
        console.error('❌ Failed to initialize FeatureFlow client:', error.message);
        console.log('💡 Make sure your API key is correct and you have an internet connection');
        return;
    }
    
    console.log('✅ FeatureFlow client initialized successfully!\n');
    
    // Test different features for each user
    users.forEach((user, index) => {
        const userAttributes = user.getAttributes();
        console.log(`👤 Testing user ${index + 1}:`, {
            id: user.getId(),
            subscription: userAttributes.subscription ? userAttributes.subscription[0] : 'unknown',
            location: userAttributes.location ? userAttributes.location[0] : 'unknown',
            betaTester: userAttributes.betaTester ? userAttributes.betaTester[0] : false
        });
        
        // Test multiple features
        const features = [
            'new-dashboard',
            'premium-features',
            'beta-features',
            'dark-mode',
            'advanced-analytics'
        ];
        
        for (const featureKey of features) {
            try {
                const result = featureflow.evaluate(featureKey, user);
                
                console.log(`  🔍 ${featureKey}:`, {
                    isOn: result.isOn(),
                    value: result.value()
                });
                
                // Demonstrate different feature behaviors
                switch(featureKey) {
                    case 'new-dashboard':
                        if (result.isOn()) {
                            console.log('    📊 Rendering new dashboard for user');
                        } else {
                            console.log('    📊 Rendering legacy dashboard for user');
                        }
                        break;
                        
                    case 'premium-features':
                        if (result.isOn()) {
                            console.log('    💎 Enabling premium features for user');
                        } else {
                            console.log('    💎 Showing upgrade prompt for user');
                        }
                        break;
                        
                    case 'beta-features':
                        if (result.isOn()) {
                            console.log('    🧪 Showing beta features to user');
                        } else {
                            console.log('    🧪 Hiding beta features from user');
                        }
                        break;
                        
                    case 'dark-mode':
                        if (result.value() === 'dark') {
                            console.log('    🌙 Applying dark theme');
                        } else if (result.value() === 'light') {
                            console.log('    ☀️ Applying light theme');
                        } else {
                            console.log('    🎨 Using system theme preference');
                        }
                        break;
                        
                    case 'advanced-analytics':
                        if (result.isOn()) {
                            console.log('    📈 Enabling advanced analytics tracking');
                        } else {
                            console.log('    📈 Using basic analytics only');
                        }
                        break;
                }
                
            } catch (e) {
                console.log(`  ❌ Error evaluating ${featureKey}:`, e.message);
            }
        }
        
        console.log(''); // Empty line for readability
    });
    
    // Demonstrate bulk evaluation
    console.log('📊 Bulk Feature Evaluation:');
    const allFeatures = featureflow.evaluateAll(users[0]);
    console.log('All features for first user:', allFeatures);
    
    // Demonstrate feature evaluation without user context
    console.log('\n🌐 Global Feature Evaluation (no user context):');
    const globalResult = featureflow.evaluate('global-feature');
    console.log('Global feature result:', {
        isOn: globalResult.isOn(),
        value: globalResult.value()
    });
    
    // Demonstrate error handling
    console.log('\n🛡️ Error Handling Example:');
    try {
        const invalidFeature = featureflow.evaluate('non-existent-feature', users[0]);
        console.log('Non-existent feature handled gracefully:', {
            isOn: invalidFeature.isOn(),
            value: invalidFeature.value()
        });
    } catch (e) {
        console.log('Error caught:', e.message);
    }
    
    // Demonstrate feature evaluation with fallback
    console.log('\n🔄 Fallback Strategy Example:');
    function evaluateWithFallback(featureKey, user, fallbackValue) {
        try {
            const result = featureflow.evaluate(featureKey, user);
            return result.isOn() ? result.value() : fallbackValue;
        } catch (e) {
            console.log('Feature evaluation failed, using fallback:', e.message);
            return fallbackValue;
        }
    }
    
    const safeResult = evaluateWithFallback('risky-feature', users[0], 'safe-default');
    console.log('Safe evaluation result:', safeResult);
    
    // Close the client
    featureflow.close();
    console.log('\n🔒 FeatureFlow client closed');
    console.log('🎉 Advanced example completed successfully!');
});

console.log('⏳ Waiting for FeatureFlow client to initialize...');
console.log('💡 This example demonstrates advanced usage patterns for production applications!');
