
(function () {
  'use strict';

  var key_codes = {
    topArrow: 38,
    bottomArrow: 40
  }


  angular.
    module('ngHtml').
    controller('DisplayingCityList', ['$http', '$scope', DisplayingCityList]);

  function DisplayingCityList($http, $scope) {

    $scope.cityData = [];
    $scope.stateData = [];
    $scope.isStatePresent = false;
    // $scope.isFocused = false;

    $http.get('state-city.json')
      .then(function (response) {
        $scope.stateCitiesData = response.data;

        $scope.stateData = [];

        angular.forEach($scope.stateCitiesData, function (city, state) {

          $scope.stateData.push(state);

        });
      });

    $scope.selectState = function (stateName) {

      $scope.cityData = [];

      angular.forEach($scope.stateCitiesData, function (city, state) {

        if (state == stateName) {
          $scope.selectedState = state.toString();
          angular.forEach(city, function (value, key) {
            $scope.cityData.push(value);
          });
          $scope.isStatePresent = false;
        }
      });
    }

    $scope.toggleStatePresent = function () {
      $scope.isStatePresent = !$scope.isStatePresent;
    }

    $scope.showStates = function () {
      if ($scope.isStatePresent == false && $scope.isFocused == true) {
        $scope.isStatePresent = true;
      }
      else if ($scope.isStatePresent == true && $scope.isFocused == true) {
        $scope.isStatePresent = true;
      }

    }

    $scope.leaveDropdown = function () {
      console.log("hey");
      if ($scope.isStatePresent == true && $scope.isFocused == false) {
        $scope.isStatePresent = false;
      }
    }

    $scope.onKeyDown = function($event) {
      $scope.isStatePresent = true;

      angular.forEach(stateData, function(value, key) {
        
      });
    }

  }

})();