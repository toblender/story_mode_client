'use strict';
/*global $:false */

angular.module('ProgrammerRPGApp')
  .controller('StageController', function ($scope, Game, $rootScope) {
    $scope.actors=[];
    $scope.currentActor={};

    $scope.$on('UPDATE_ACTOR_PROPERTIES',function(event,index){
        $scope.getProperties(index);
    });
    $scope.getProperties = function(currentActor){
        $scope.actor = $scope.actors[currentActor];
        /*
        //When I click the actor
        //Grab me all the parts
        //Fill it according styles
        var baseStyle = event.currentTarget.attributes.style;
        $scope.actor=currentActor;
        currentActor.index = index;

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
        */
    };
    $scope.updateActor = function(){
        //Change style of actor
        angular.element('#'+$scope.actor.id).attr('style',angular.element('#new-actor-value').val());
        $scope.actors[$scope.actor.index]=$scope.actor;
        saveChanges();
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
        saveChanges();
    };

    $scope.$on('UPDATE_ACTORS',function(event,actors){
        //Filter by type
        if(actors){
            var filteredActors = [];
            for(var i=0,j=actors.length;i<j;i++){
                if(actors[i].type == 'properties'){
                    $rootScope.$broadcast('UPDATE_FRAME_PROPERTIES',actors[i]);
                }else{
                    filteredActors.push(actors[i]);
                }
            }
            $scope.actors = filteredActors;
            console.log('actor updated');
        }
    });

    var saveChanges = function(){
        $rootScope.$broadcast('UPDATE_FRAME', $scope.actors);
    }

  });
