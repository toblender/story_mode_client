'use strict';
/*global $:false */

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
                        actorObj = setActorProp(200,300,defaultColor);
                        actorObj.contents='Character';
                        scope.actors.push(actorObj);
                    }else if(actor.id === 'text-box'){
                        actorObj = setActorProp(100,300,defaultColor);
                        actorObj.contents='Text Box';
                        scope.actors.push(actorObj);
                    }else if(actor.id === 'timer'){
                        actorObj = setActorProp(50,300,defaultColor);
                        actorObj.contents='Timer';
                        scope.actors.push(actorObj);
                    }
                    scope.$apply();
                }
              });
            }
        };
    });
