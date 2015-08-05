'use strict';
/*global $:false */

angular.module('ProgrammerRPGApp')
  .controller('FrameController', function ($scope, Game, $rootScope) {
    console.log('FrameController');
    //FRAME specific function
    $scope.properties={};
    $scope.$on('UPDATE_FRAME_PROPERTIES',function(event,properties){
        $scope.properties=properties;
        console.log('boundframe');
    });
  });
