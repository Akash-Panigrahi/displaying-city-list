
(function () {
  'use strict';

  angular.
    module('ngHtml').
    controller('DisplayingCityList', ['$http', '$scope', DisplayingCityList]);

  function DisplayingCityList($http, $scope) {

    $scope.cityData = [];
    $scope.stateData = [];

    $http.get('state-city.json')
      .then(function(response) {
        $scope.stateCitiesData = response.data;

        $scope.stateData = [];
  
        angular.forEach($scope.stateCitiesData, function(city, state) {
            
          $scope.stateData.push(state);
          
        });
    });

    $scope.selectState = function(index) {

      var count = 0;
      $scope.cityData = [];

      angular.forEach($scope.stateCitiesData, function(city, state) {

        if(count == index) {
          $scope.selectedState = state.toString();
          angular.forEach(city, function(value, key) {
            $scope.cityData.push(value);
          });
        }

        count++;
      });

      // $scope.toggleStatePresent = function() {
      //   $scope.statePresent = !$scope.statePresent;
      // }

      $scope.showStates = function() {
        var isOpen = $('.selected-city div').hasClass('open');
        console.log(isOpen);
        if(isOpen == false) {
          console.log(isOpen);
          $('.selected-city div').addClass('open');
        }
        else {
          console.log(isOpen);
          $('.selected-city div').removeClass('open');
        }
      }

    }

  }
})();