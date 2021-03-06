var Featureflow = require('featureflow-node-sdk');


var featureflow = new Featureflow.Client({apiKey: '{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}'});

featureflow.ready(function(){
    console.log(featureflow.evaluateAll())
    if (featureflow.evaluate('example-feature').isOn()) {
        console.log('The example-feature variant is on!');
    }
    else {
        console.log('The example-feature variant is not on!');
    }
    //featureflow is now initialized in this block
});

//Now have a look at helloworldWithUser.js for a more advanced scenario
