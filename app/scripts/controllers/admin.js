'use strict';

angular.module('ProgrammerRPGApp')
  .controller('AdminController', function ($scope) {

    //If there is no table then go for
    $scope.scenes=[{}];
    $scope.frames=[[]];

    $scope.actors=[];
    $scope.actor={};

    $scope.getActors = function(){
        angular.forEach($scope.frames, function(frame){
            angular.forEach(frame,function(currentObj){
                if(currentObj.type != 'sound'){
                    var currentActor = {
                        style:currentObj.style,
                        id:currentObj.id,
                        contents:currentObj.contents
                    }
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
    }

    $scope.removeActor = function(){
        //Account for the fact if there isn't at least one angular element nothing will generate
        //This is the noob way of removing, do it the Angular way
        //check each actor, and only keep the new actors
        var oldActors = $scope.actors;
        $scope.actors = [];
        //Loop through the old one dahhhh
        angular.forEach(oldActors, function(actor){
            if($scope.actor.id != actor.id){
                $scope.actors.push(actor);
            }
        });
    }

    $scope.getActors();
  });
