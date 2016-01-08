angular.module('angularfireSlackApp')
  .factory('Users', function ($firebaseArray, $firebaseObject, FirebaseUrl) {

    //The purpose of this factory is to provide us with the ability to get either a specific user's data, or to get a list of all of our users.

    //below is referencing the users node -- firebase uses a JSON tree structure
    var usersRef = new Firebase(FirebaseUrl + 'users');

    var connectedRef = new Firebase(FirebaseUrl + '.info/connected');

    //$firebaseArray will return a pseudo-array -- will act like an array in JS but the array methods will only affect local data and not on the Firebase
    var users = $firebaseArray(usersRef);

    var Users = {
      getProfile: function (uid) {
        return $firebaseObject(usersRef.child(uid));
      },
      getDisplayName: function (uid) {
        return users.$getRecord(uid).displayName;
      },
      getGravatar: function (uid) {
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
      },
      setOnline: function (uid) {
        var connected = $firebaseObject(connectedRef);
        var online = $firebaseArray(usersRef.child(uid + '/online'));

        connected.$watch(function () {
          if (connected.$value === true) {
            online.$add(true).then(function (connectedRef) {
              connectedRef.onDisconnect().remove();
            });
          }
        });
      },
      all: users
    };

    return Users;
  })