'use strict';
/*global $:false */

angular.module('ProgrammerRPGApp')
  .controller('FrameController', function ($scope, Game, $rootScope) {
    //FRAME specific function
    $scope.currentFrame=0;
    $scope.frames=[[]];
    $scope.createFrame = function(){
        //Create a new frame tab
        //Rely on scope for the fun
        //WHAHAHHAHAHAHHA angular will draw this for me!!!!!!!!!
        $scope.frames.push([]);

        //Save the scene
        Game.frameCreate({
                    actor:'frame',
                    action:'create',
                    gameName:$scope.shortName,
                    scene:$scope.currentScene,
                    frameInfo:[]},
            function success (data, status, headers, config) {
            },
            function error (data, status, headers, config) {
            });
    };


    //Reset frame
    var frameReset = function(){
        $scope.actors = [];
        $rootScope.$broadcast('UPDATE_ACTORS',$scope.actors);
    }

    $scope.updateFrame= function(currentFrame){
        Game.frameUpdate({
            actor:'frame',
            action:'update',
            gameName:$scope.shortName,
            scene:$scope.currentScene,
            frame:currentFrame,
            frameInfo:$scope.actors
            },
            function success (data, status, headers, config) {
                console.log(currentFrame + " frame saved.");
            },
            function error (data, status, headers, config) {
                console.log(currentFrame + " frame failed save.");
            });
    }

    $scope.setActiveFrame = function(activeFrame){
        //Make current button active
        $scope.updateFrame($scope.currentFrame);
        //TODO this should be driven by success
        $scope.loadFrame(activeFrame);
    }

    $scope.loadFrame = function(activeFrame){
        $scope.currentFrame=activeFrame;
        //Remove actors from scene
        frameReset();
        //Put in the actors
        $scope.actors = $scope.frames[activeFrame];
        $scope.actors = $scope.actors == undefined ? [] : $scope.actors;
        $rootScope.$broadcast('UPDATE_ACTORS',$scope.actors);

    }

    $scope.saveChanges = function(currentActor){
        console.log(currentActor);
    }

    $scope.dropFrame= function(frameIndex){
        //Drop it on the server side
        Game.frameDrop({
            actor:'frame',
            action:'drop',
            gameName:$scope.shortName,
            scene:$scope.currentScene,
            frame:frameIndex
        },
        function success (data, status, headers, config) {
            console.log(frameIndex + " frame droped.");
            //Drop it from active frames
                //Set active frame 0
            $scope.frames.splice(frameIndex,1);
            $scope.loadFrame(0);

        },
        function error (data, status, headers, config) {
            console.log(frameIndex + " frame failed drop frame.");
        });
    }

    $scope.$on('UPDATE_FRAMES',function(event,frames){
        $scope.frames = frames;
    });

  });
