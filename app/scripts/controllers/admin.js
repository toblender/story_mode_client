'use strict';
/*global $:false */

angular.module('ProgrammerRPGApp')
  .controller('AdminController', function ($scope, Game) {
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
    $scope.frames=[[]];

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

        angular.forEach($scope.frames, function(frame){
            angular.forEach(frame,function(currentObj){
                if(currentObj.type !== 'sound'){
                    var currentActor = {
                        style:currentObj.style,
                        id:currentObj.id,
                        contents:currentObj.contents
                    };
                    $scope.actors.push(currentActor);
                }
            });
        });
    }
    $scope.getProperties = function(currentActor){
        //When I click the actor
        //Grab me all the parts
        //Fill it according styles
        var baseStyle = event.currentTarget.attributes.style;
        $scope.actor=currentActor;

        //Actor scope for new top/left not updated  force an update
        $scope.actor.top=$('#'+currentActor.id).css('top');
        $scope.actor.left=$('#'+currentActor.id).css('left');

        //Ultra lazy parse, only if I click on it to edit do the work
        $scope.actor.height=$('#'+currentActor.id).css('height');
        $scope.actor.width=$('#'+currentActor.id).css('width');
        $scope.actor.background=$('#'+currentActor.id).css('background-color');
        $scope.actor.image=$('#'+currentActor.id).css('background-image');
        $scope.actor.zindex=$('#'+currentActor.id).css('z-index');

        //$scope.$apply(); Drag event already fires apply..
    };
    $scope.updateActor = function(){
        //Change style of actor
        angular.element('#'+$scope.actor.id).attr('style',angular.element('#new-actor-value').val());
    };

    $scope.dropActor = function(){
        //Account for the fact if there isn't at least one angular element nothing will generate
        //This is the noob way of removing, do it the Angular way
        //check each actor, and only keep the new actors
        var oldActors = $scope.actors;
        $scope.actors = [];
        //Loop through the old one dahhhh
        angular.forEach(oldActors, function(actor){
            if($scope.actor.id !== actor.id){
                $scope.actors.push(actor);
            }
        });
    };

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

    $scope.createScene = function(){
        $scope.scenes.push([]);
    };

  });
