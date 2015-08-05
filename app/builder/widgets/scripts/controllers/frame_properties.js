'use strict';
/*global $:false */

angular.module('ProgrammerRPGApp')
  .controller('FramePropertiesController', function ($scope, Game, $rootScope) {
    console.log('FramePropertiesController');
    //FRAME specific function
    $scope.properties={background:'wtf'};
    $scope.$on('UPDATE_FRAME_PROPERTIES',function(event,properties){
        $scope.properties=properties;
        console.log('boundframe');
    });
  });
