'use strict';

angular.module('ProgrammerRPGApp')
  .controller('AdminController', function ($scope) {

    //If there is no table then go for
    $scope.scenes=[
        {src:'test',alt:'test',number:1},
        {src:'test',alt:'test',number:2}
    ];
    $scope.actors=[];
  });
