'use strict';
/*global $:false */

angular.module('ProgrammerRPGApp')
  .controller('AdminController', function ($scope, Game) {
        //Shards
        $scope.framesNavHTML = '/builder/frame/views/frames_nav.html';
        $scope.framePropertiesHTML = '/builder/frame/views/frame_properties.html';
        $scope.frameHTML = '/builder/frame/views/frame.html'; 
        $scope.properties={};

      Game.gameRead({
        actor:'game',
        action:'read',
        gameName:'newgame'
      },
      //TODO they will be doing this better in the future, stick with ugly for now
      function success (data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('Game found');
        console.log(data);
        getScenes(data);
      },
      function error(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('Game not found');
      });

    //If there is no table then go for
    $scope.longName = 'Long Name';
    $scope.shortName= 'shortName';

    $scope.scenes=[{}];
    $scope.currentScene=0;

    $scope.actors=[];
    $scope.actor={};

    //Pull the data
        //Then run
            //$scope.getActors();

    function getScenes (gameInfo){
        $scope.longName = gameInfo.longName;
        $scope.shortName = gameInfo.shortName;
        $scope.scenes = gameInfo.scenes;
        $scope.currentScene=0;//We are on the first scene
        getActors(0);//First scene of the game
    }

    function getActors (currentScene){
        $scope.frames = $scope.scenes[currentScene].frames;
        $scope.$broadcast('UPDATE_FRAMES',$scope.frames);
        $scope.actors = $scope.frames[0];
        $scope.$broadcast('UPDATE_ACTORS',$scope.actors);
    }
    //SCENE specific function
    $scope.createScene = function(){
        $scope.scenes.push([]);
        Game.sceneCreate({
            actor:'scene',
            action:'create',
            gameName:$scope.shortName
        },
        function success (data, status, headers, config) {
            console.log("scene created.");
        },
        function error (data, status, headers, config) {
            console.log("scene create fail.");
        });

    };

    $scope.updateScene = function(currentScene){
        //Update database with the active scene
        Game.sceneUpdate({
            actor:'scene',
            action:'update',
            gameName:$scope.shortName,
            scene:currentScene,
            sceneInfo:{
                frames:$scope.frames
                //This can be where you add the scene related stuff?
            }
        },
        function success (data, status, headers, config) {
            console.log(currentScene + " scene updated.");
        },
        function error (data, status, headers, config) {
            console.log(currentScene + " scene update fail.");
        });
    }

    $scope.setActiveScene = function(activeScene){
        $scope.updateScene($scope.currentScene);
        //Set the active scene
        //Draw the frames
        $scope.frames = $scope.scenes[activeScene].frames;
        $scope.currentScene = activeScene;
        $scope.loadFrame(0);
    }


  });
