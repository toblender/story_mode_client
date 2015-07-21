'use strict';

angular.module('gameServices',['ngResource']).
    factory('Game', function($resource){
        return $resource('/api/:actor/:action/:gameName/:scene/:frame',
            {
                api:'@api',
                actor:'@actor',
                action:'@action',
                gameName:'@gameName',
                scene:'@scene',
                frame:'@frame'
            },
            {
                'gameRead':{method:'GET'},
                'frameCreate':{method:'POST'},
                'frameUpdate':{method:'POST'},
                'frameDrop':{method:'POST'},
                'sceneCreate':{method:'POST'},
                'sceneUpdate':{method:'POST'}
            });
    });
