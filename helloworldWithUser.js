var Featureflow = require('featureflow-node-sdk');


var featureflow = new Featureflow.Client({apiKey: '{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}'});

var user = new Featureflow.UserBuilder("jimmy@example.com")
    .withAttribute("firstName", "Jimmy")
    .withAttribute("lastName", "Hendrix")
    .withAttributes("hobbies", ["swimming", "skiing", "rowing"])
    .withAttribute("age", 32)
    .withAttribute("signupDate", new Date(2017,10,28))
    .build();


featureflow.ready(function(error){
    if (error){
        return error;
    }
    if (featureflow.evaluate("example-feature", user).isOn()){
        console.log('Showing feature to user');
    }
    else{
        console.log('Not showing feature to user');
    }
    featureflow.close();
});
