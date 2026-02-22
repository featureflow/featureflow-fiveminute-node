/**
 * FeatureFlow Node.js SDK - Simple Singleton Client with Polling
 * 
 * This example demonstrates:
 * 1. Creating a singleton FeatureFlow client
 * 2. Polling for feature updates every 10 seconds
 * 3. Real-time feature value changes
 * 4. Environment-specific API endpoints (production, staging, development)
 * 
 * 🔑 SETUP: Set your API key in the main() function below
 * 🌍 STAGING: Set FEATUREFLOW_ENVIRONMENT=staging to test against staging URLs
 * 
 * Usage:
 *   node singleton-polling-example.js                    # Production
 *   FEATUREFLOW_ENVIRONMENT=staging node singleton-polling-example.js    # Staging
 *   FEATUREFLOW_ENVIRONMENT=development node singleton-polling-example.js # Development
 */

const Featureflow = require('featureflow-node-sdk');

// Simple singleton FeatureFlow client
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
    
    async initialize(apiKey, environment = 'production') {
        if (this.isInitialized) {
            return this.client;
        }
        
        console.log('🚀 Initializing FeatureFlow client...');
        
        // Configure API base URL based on environment
        const apiBaseUrls = {
            production: 'https://api.featureflow.io',
            staging: 'https://api.featureflow-staging.com',
            development: 'http://localhost:8082'
        };
        
        const config = {
            apiKey: apiKey,
            pollingInterval: 10000, // Poll every 10 seconds for this example, we recommend leaving the default for production to reduce traffic cost
            debug: true
        };
        
        // Add staging URL if not production
        if (environment !== 'production' && apiBaseUrls[environment]) {
            config.apiBaseUrl = apiBaseUrls[environment];
            console.log(`🌍 Using ${environment} environment: ${config.apiBaseUrl}`);
        } else {
            console.log('🌍 Using production environment');
        }
        
        this.client = new Featureflow.Client(config);
        
        return new Promise((resolve, reject) => {
            this.client.ready((error) => {
                if (error) {
                    console.error('❌ Failed to initialize:', error.message);
                    reject(error);
                    return;
                }
                
                this.isInitialized = true;
                console.log('✅ FeatureFlow client ready!');
                this.startPolling();
                resolve(this.client);
            });
        });
    }
    
    startPolling() {
        console.log('🔄 Starting polling every 10 seconds...\n');
        
        this.pollingInterval = setInterval(() => {
            const timestamp = new Date().toLocaleTimeString();
            console.log(`[${timestamp}] Checking features...`);
            
            // Show all features
            const allFeatures = this.client.evaluateAll();
            console.log('Features:', allFeatures);
            
            // Check specific features
            const featuresToCheck = ['is-os', 'example-feature', 'premium-features'];
            for (const featureKey of featuresToCheck) {
                const result = this.client.evaluate(featureKey);
                console.log(`  ${featureKey}: ${result.value()}`);
            }
            console.log(''); // Empty line
        }, 10000);
    }
    
    close() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }
        if (this.client) {
            this.client.close();
        }
        console.log('🔒 Client closed');
    }
}

// Get singleton instance
const featureFlow = FeatureFlowSingleton.getInstance();

// Main execution
async function main() {
    try {
        // 🔑 SET YOUR API KEY HERE 🔑
        const API_KEY = 'srv-env-685e066dea464f88be14effbf65cf69c';
        
        // 🌍 ENVIRONMENT CONFIGURATION 🌍
        // Set to 'staging' or 'development' to test against staging URLs
        // Available environments: 'production', 'staging', 'development'
        const ENVIRONMENT = process.env.FEATUREFLOW_ENVIRONMENT || 'production';
        
        console.log(`🎯 Environment: ${ENVIRONMENT}`);
        
        // Initialize the client with environment
        await featureFlow.initialize(API_KEY, ENVIRONMENT);
        
        console.log('⏰ Running for 2 minutes to demonstrate polling...');
        console.log('💡 Update features in your dashboard to see real-time changes!');
        console.log('🛑 Press Ctrl+C to stop early\n');
        
        // Graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🛑 Shutting down...');
            featureFlow.close();
            process.exit(0);
        });
        
        // Run for 2 minutes
        setTimeout(() => {
            console.log('\n⏰ 2 minutes elapsed. Shutting down...');
            featureFlow.close();
            process.exit(0);
        }, 120000);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Start the application
console.log('🚀 FeatureFlow Singleton Polling Example\n');

main();
