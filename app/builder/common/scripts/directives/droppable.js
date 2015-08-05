'use strict';
/*global $:false */

angular.module('ProgrammerRPGApp')
    .directive('droppable',function($rootScope){
        return{
            //Link does the registering of DOM listener
            link: function(scope,element,attrs){
              //This makes an element Droppable
              $(element).droppable({
                drop:function(event,ui) {
                    //Leave a copy on the stage
                    //New piece can be moved within stage
                        //Save will write properties of stage objects
                    //Check if it is actually a piece we want

                    var actor = angular.element(ui.draggable)[0];

                    function setActorProp(defaultHeight,defaultWidth){
                        var offsetLeft = 227;
                        var offsetTop = 97;
                        var actorObj = {};
                        var R = Math.floor((Math.random()*239)+16);
                        var G = Math.floor((Math.random()*239)+16);
                        var B = Math.floor((Math.random()*239)+16);
                        var defaultColor = '#'+(R).toString(16)+
                                                (G).toString(16)+
                                                (B).toString(16);


                        var actorObj = {
                                height:defaultHeight+'px',
                                width:defaultWidth+'px',
                                zindex:scope.actors.length,
                                background:defaultColor
                            };
                        actorObj.style='height:'+actorObj.height+';'+
                                  'width:'+actorObj.width+';'+
                                  'z-index:'+actorObj.zindex+';'+
                                  'background:'+actorObj.background+';';
                        actorObj.left=(event.clientX-offsetLeft)+'px';
                        actorObj.style+='left:'+actorObj.left+';';
                        actorObj.top=(event.clientY-offsetTop)+'px';
                        actorObj.style+='top:'+actorObj.top+';';
                        actorObj.id = 'actor-'+scope.actors.length+'-'+Math.floor((Math.random()*10000000));
                        return actorObj;
                    }
                    if (actor.id === 'character'){
                        //Place this character on the state.
                        actorObj = setActorProp(200,300);
                        actorObj.contents='Character';
                        scope.actors.push(actorObj);
                    }else if(actor.id === 'text-box'){
                        actorObj = setActorProp(100,300);
                        actorObj.contents='Text Box <div data-ng-include="/builder/actors/views/textbox.html">Test box</div>';
                        scope.actors.push(actorObj);
                    }else if(actor.id === 'timer'){
                        actorObj = setActorProp(50,300);
                        actorObj.contents='Timer';
                        scope.actors.push(actorObj);
                    }else{
                        //We are updating the global scope to match stage
                        //Who am I, which div is it
                            //iterate through each guy and if he is the actor
                            //return
                        //Replace that div with the current div
                            //Call it directly
                        //Get the stuff worth saving
                        actor.index=actor.getAttribute('pr-index');
                        var actorObj = {
                            height:actor.clientHeight+'px',
                            width:actor.clientWidth+'px',
                            zindex:actor.style.zIndex ? actor.style.zIndex : actor.index,
                            background:actor.style.background,
                            style:actor.getAttribute('style'),
                            left:actor.style.left,
                            top:actor.style.top,
                            contents:actor.innerHTML,
                            id:actor.id
                        }
                        scope.actors[actor.index]=actorObj;
                        //Update the current actor properties
                        $rootScope.$broadcast('UPDATE_ACTOR_PROPERTIES',actor.index);
                        $rootScope.$broadcast('UPDATE_FRAME', scope.actors);
                        console.log(actor);
                    }
                    scope.$apply();
                }
              });
            }
        };
    });
