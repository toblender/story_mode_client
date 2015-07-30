'use strict';
/*global $:false */

angular.module('ProgrammerRPGApp')
  .controller('FrameController', function ($scope, Game, $rootScope) {
    console.log('FrameController');
    //FRAME specific function
    $scope.frame={properties:{background:'wtf'}};
    $scope.$on('UPDATE_FRAME_PROPERTIES',function(event,properties){
        $scope.frame.properties=properties;
        console.log('boundframe');
    });
  });
