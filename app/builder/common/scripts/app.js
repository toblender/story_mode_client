'use strict';

//http://angular-ui.github.io/bootstrap/#/getting_started
//Problem if there are major improvements in bootstrap they may not be merged.

angular.module('ProgrammerRPGApp', ['ui.bootstrap','cssBackgroundURL','gameServices'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'builder/common/views/main.html',
        controller: 'MainController'
      })
      .when('/admin', {
        templateUrl: 'builder/common/views/admin.html',
        controller: 'AdminController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
