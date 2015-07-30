'use strict';
/*global $:false */

angular.module('ProgrammerRPGApp')
  .controller('FrameNavController', function ($scope, Game, $rootScope) {
    console.log('FrameNavController');
    //FRAME specific function
    $scope.currentFrame=0;
    $scope.frames=[[]];
    var actors = [];
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
        actors = [];
        $rootScope.$broadcast('UPDATE_ACTORS',actors);
    }

    $scope.updateFrame= function(currentFrame){
        Game.frameUpdate({
            actor:'frame',
            action:'update',
            gameName:$scope.shortName,
            scene:$scope.currentScene,
            frame:currentFrame,
            frameInfo:$scope.frames[currentFrame]
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
        actors = $scope.frames[activeFrame];
        actors = actors == undefined ? [] : actors;
        $rootScope.$broadcast('UPDATE_ACTORS',actors);

        //Put properties
        loadPropertiesOfFrame($scope.frames[activeFrame]);
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

    //Move frame up / down
    $scope.frameUp = function(frameIndex){
        var newSpot = frameIndex + 1;
        if(newSpot > $scope.frames.length-1){
            newSpot = $scope.frames.length-1;
        }
        var frame = $scope.frames[frameIndex];
        $scope.frames.splice(frameIndex,1);
        $scope.frames.splice(newSpot,0,frame);
        $scope.setActiveFrame(newSpot);
    }

    $scope.frameDown = function(frameIndex){
        //Check boundary
        var newSpot = frameIndex - 1;
        if(newSpot < 0){
            newSpot = 0;
        }
        var frame = $scope.frames[frameIndex];
        $scope.frames.splice(frameIndex,1);
        $scope.frames.splice(newSpot,0,frame);
        $scope.setActiveFrame(newSpot);
    }
    $scope.$on('UPDATE_FRAMES',function(event,frames){
        $scope.frames = frames;
    });
    $scope.$on('UPDATE_FRAME',function(event,frame){
        $scope.frames[$scope.currentFrame] = frame;
        $scope.updateFrame($scope.currentFrame);
    });


    //frame property management
    //Take current frame and append the properties associated with it
    //Background, music, starting animation, ending animation
    //animation is based on entire frame
    //Actor can move too
    function addPropertiesToFrame(frame){
        frame.properties = $scope.properties;
        return frame;
    }
    function loadPropertiesOfFrame(frame){
        $scope.properties = frame.hasOwnProperty('properties') ? frame.properties:$scope.properties;
        $rootScope.$broadcast('UPDATE_FRAME_PROPERTIES',$scope.properties);
        console.log('scope');
    }
  });
