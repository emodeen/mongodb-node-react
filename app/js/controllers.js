'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('HipaaReqCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
      $scope.requirements = [{name:'Eric',id:1},
			     {name:'Nate',id:2},
			     {name:'Sally',id:3}];

      $scope.addRow = function() {
        var req  = {
          name: $scope.name,
          id: $scope.id
        };

        $scope.requirements.push(req);
      };

      $scope.removeRow = function(){
        $scope.requirements.splice(0, 1);
      };

      $scope.connectToDB = function() {

        var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/test');

	var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function (callback) {

        });
      };
      
  }]);


phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
