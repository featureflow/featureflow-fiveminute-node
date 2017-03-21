/*
 This is an example of evaluating a feature by passing in some context information
 Continue down the comments below for an explanation.
 */

var Featureflow = require('featureflow-node-sdk');



Featureflow.init({
  apiKey: "{{YOUR_SERVER_ENVIRONMENT_API_KEY_HERE}}",
}, function(error, featureflow){
  if (error){
    return console.warn(error);
  }

  /*
   This is a context, in a web facing application you will generally create this when your users' request (eg login, rest call etc.) comes in.
   If you do not have a logged in user or any context that's ok, we will assume the user is 'anonymous'

   Some quick concepts: A 'context' is evaluated against a features 'rules' to determine which 'variant' of the feature to use for the given context.
   In the 'HelloWorld' the variants are simple 'On' and 'Off' - in more complex scenarios they can be anything - eg: 'red','blue','1.1','1.2'
   This allows a huge amount of control, for example:
   'Set the 'Google Login Button' feature to show the '1.2-NewVersion' variant if the 'context' contains a 'user_role' of 'pvt_tester'
   'Set the 'Stock Chart' feature to show the 'Enhanced Stock Chart' variant if the 'context' contains a 'tier' of 'gold'
   Noting that these same rules can be applied using both the backend APIs and the Frontend Javascript API you can toggle conveniently at the front-end while backing up securely with server rules.
   As these  context values are evaluated they appear in featureflow so that you can select them in 'rules' to target your features.
   */

  var context = {
    key: "flo@example.com",
    values: {
      age: 32,
      signup_date: new Date(2017, 0, 1, 12, 0, 0, 0),
      user_role: 'admin',
      tier: 'gold'
    }
  };

  /*
   'client.evaluate' is en example of evaluating a specific feature variant.
   The first parameter is the variant key
   The second parameter is the context created above
   The failover variant, if not provided will be 'off'.
   */

  if (featureflow.evaluate('example-feature', context).isOn()){
    console.log('The variant is on!');
  }
  else{
    console.log('The variant is not on!');
  }

  /**
   * TRY IT! Try editing the 'example-feature' in the environment that matches the key you have set above.
   * Edit the feature and add a new variant called 'New Version 1.2'
   * Now edit the control for the environment you are connected to above - Add a new Rule which says when 'tier' is equal to 'gold' then 'New Version 1.2'
   * You should immediately see an update event which will evaluate to the new version (because your user is in the 'gold' tier in your context above.
   * Of course for more information and a visual guide please consult the docs http://docs.featureflow.io
   */

  featureflow.close();
})