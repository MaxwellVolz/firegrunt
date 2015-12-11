var app = angular.module('simpleChat', ['firebase']);
var ref = new Firebase("https://mvolzfirsttest.firebaseio.com/");


app.controller('MessagesCtrl', 
            function($scope, $firebase) {
			
			var obj = $firebase(ref).$asObject();
			obj.$bindTo($scope, "data");

			
});


app.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});



	
	
