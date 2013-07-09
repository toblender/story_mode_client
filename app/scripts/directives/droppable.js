'use strict';

angular.module('ProgrammerRPGApp')
    .directive('droppable',function(){
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
                    var offsetLeft = 227;
                    var offsetTop = 97;
                    var actorObj = {};
                    var R = Math.floor((Math.random()*239)+16);
                    var G = Math.floor((Math.random()*239)+16);
                    var B = Math.floor((Math.random()*239)+16);
                    var defaultColor = '#'+(R).toString(16)+
                                            (G).toString(16)+
                                            (B).toString(16);

                    function setActorProp(defaultHeight,defaultWidth,defaultColor){
                        var actorObj = {
                            style:'height:'+defaultHeight+'px;'+
                                  'width:'+defaultWidth+'px;'+
                                  'background:'+defaultColor+';',
                        }
                        return actorObj;
                    }
                    if (actor.id == 'character'){
                        //Place this character on the state.
                        console.log(actorObj);
                        actorObj = setActorProp(200,300,defaultColor);
                        actorObj.style+='left:'+(event.clientX-offsetLeft)+'px;';
                        actorObj.style+='top:'+(event.clientY-offsetTop)+'px;';
                        actorObj.contents='Character';
                        console.log(actorObj);
                        scope.actors.push(actorObj);
                        scope.$apply();
                    }
                }
              });
            } 
        }
    });
