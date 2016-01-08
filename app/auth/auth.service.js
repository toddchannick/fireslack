angular.module('angularfireSlackApp')
  .factory('Auth', function($firebaseAuth, FirebaseUrl){
    var ref = new Firebase(FirebaseUrl);  // reference to our firebase - using the constant we defined
    var auth = $firebaseAuth(ref);
    
    return auth;
  });