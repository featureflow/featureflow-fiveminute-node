/**
 * FeatureFlow Node.js SDK - Singleton Client with Polling Updates
 * 
 * This example demonstrates:
 * 1. Creating a singleton FeatureFlow client
 * 2. Polling for feature updates from FeatureFlow dashboard
 * 3. Real-time feature value changes without restarting the application
 * 4. Graceful shutdown handling
 * 
 * This is useful for:
 * - Production applications that need to stay running
 * - Real-time feature flag updates
 * - Demonstrating FeatureFlow's polling capabilities
 * - Long-running services that need feature updates
 */

const Featureflow = require('featureflow-node-sdk');

// Singleton FeatureFlow client instance
class FeatureFlowSingleton {
    constructor() {
        this.client = null;
        this.isInitialized = false;
        this.pollingInterval = null;
    }
    
    static getInstance() {
        if (!FeatureFlowSingleton.instance) {
            FeatureFlowSingleton.instance = new FeatureFlowSingleton();
        }
        return FeatureFlowSingleton.instance;
    }
    
    async initialize(apiKey) {
        if (this.isInitialized) {
            console.log('✅ FeatureFlow client already initialized');
            return this.client;
        }
        
        console.log('🚀 Initializing FeatureFlow singleton client...');
        
        this.client = new Featureflow.Client({
            apiKey: apiKey,
            // Enable polling for updates (default is every 30 seconds)
            pollingInterval: 10000, // Poll every 10 seconds for demo
            debug: true // Enable debug logging to see polling activity
        });
        
        return new Promise((resolve, reject) => {
            this.client.ready((error) => {
                if (error) {
                    console.error('❌ Failed to initialize FeatureFlow client:', error.message);
                    reject(error);
                    return;
                }
                
                this.isInitialized = true;
                console.log('✅ FeatureFlow singleton client initialized successfully!');
                console.log('🔄 Polling for feature updates every 10 seconds...');
                
                // Set up polling monitoring
                this.setupPollingMonitor();
                
                resolve(this.client);
            });
        });
    }
    
    setupPollingMonitor() {
        // Monitor for feature updates
        this.pollingInterval = setInterval(() => {
            const timestamp = new Date().toLocaleTimeString();
            console.log(`\n🔄 [${timestamp}] Polling for feature updates...`);
            
            // Get all current features
            const allFeatures = this.client.evaluateAll();
            console.log('📊 Current features:', Object.keys(allFeatures).length > 0 ? allFeatures : 'No features available');
            
            // Check specific features we're monitoring
            this.checkMonitoredFeatures();
        }, 10000); // Check every 10 seconds
    }
    
    checkMonitoredFeatures() {
        const featuresToMonitor = [
            'example-feature',
            'new-dashboard',
            'premium-features',
            'beta-features',
            'dark-mode'
        ];
        
        console.log('🔍 Checking monitored features:');
        for (const featureKey of featuresToMonitor) {
            const result = this.client.evaluate(featureKey);
            console.log(`   ${featureKey}: ${result.isOn() ? 'ON' : 'OFF'} (${result.value()})`);
        }
    }
    
    evaluateFeature(featureKey, user = null) {
        if (!this.isInitialized) {
            throw new Error('FeatureFlow client not initialized. Call initialize() first.');
        }
        
        return this.client.evaluate(featureKey, user);
    }
    
    evaluateAllFeatures(user = null) {
        if (!this.isInitialized) {
            throw new Error('FeatureFlow client not initialized. Call initialize() first.');
        }
        
        return this.client.evaluateAll(user);
    }
    
    close() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
        
        if (this.client) {
            this.client.close();
            console.log('🔒 FeatureFlow client closed');
        }
        
        this.isInitialized = false;
    }
}

// Create singleton instance
const featureFlow = FeatureFlowSingleton.getInstance();

// Demo function to simulate application logic
function simulateApplicationLogic() {
    console.log('\n🎯 Simulating application logic...');
    
    // Create a test user
    const user = new Featureflow.UserBuilder("demo@example.com")
        .withAttribute("firstName", "Demo")
        .withAttribute("subscription", "premium")
        .withAttribute("location", "US")
        .build();
    
    // Simulate different application scenarios
    const scenarios = [
        { name: "User Login", feature: "new-dashboard" },
        { name: "Premium Check", feature: "premium-features" },
        { name: "Beta Access", feature: "beta-features" },
        { name: "Theme Selection", feature: "dark-mode" }
    ];
    
    scenarios.forEach((scenario, index) => {
        setTimeout(() => {
            const result = featureFlow.evaluateFeature(scenario.feature, user);
            console.log(`📱 ${scenario.name}: ${result.isOn() ? '✅ Enabled' : '❌ Disabled'} (${result.value()})`);
        }, index * 2000); // Stagger the scenarios
    });
}

// Main execution
async function main() {
    try {
        // Initialize the singleton client
        await featureFlow.initialize('{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}');
        
        // Show initial features
        console.log('\n📋 Initial features:');
        const initialFeatures = featureFlow.evaluateAllFeatures();
        console.log(initialFeatures);
        
        // Simulate application logic
        simulateApplicationLogic();
        
        // Keep the application running for 1 minute
        console.log('\n⏰ Application will run for 1 minute to demonstrate polling...');
        console.log('💡 Try updating features in your FeatureFlow dashboard to see real-time changes!');
        console.log('🛑 Press Ctrl+C to stop early\n');
        
        // Set up graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n\n🛑 Shutting down gracefully...');
            featureFlow.close();
            process.exit(0);
        });
        
        // Run for 1 minute (60 seconds)
        setTimeout(() => {
            console.log('\n⏰ 1 minute elapsed. Shutting down...');
            featureFlow.close();
            process.exit(0);
        }, 60000);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error.message);
    featureFlow.close();
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    featureFlow.close();
    process.exit(1);
});

// Start the application
console.log('🚀 FeatureFlow Singleton Polling Example Starting...');
console.log('📝 This example demonstrates real-time feature updates via polling');
console.log('🔧 Make sure to replace the API key placeholder with your actual key\n');

main();
