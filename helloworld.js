var Featureflow = require('featureflow-node-sdk');

Featureflow.init({
  apiKey: "{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}",
}, function(error, featureflow){
  if (error){
    return console.warn(error);
  }

  if (featureflow.evaluate('example-feature').isOn()){
    console.log('The variant is on!');
  }
  else{
    console.log('The variant is not on!');
  }

  featureflow.close();
  //Now have a look at helloworldWithContext.js for a more advanced scenario
})