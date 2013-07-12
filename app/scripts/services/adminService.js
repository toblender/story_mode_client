'use strict';

angular.module('gameServices',['ngResource']).
    factory('Game', function($resource){
        return $resource('game/read/:gameName');
    });
