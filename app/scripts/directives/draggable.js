'use strict';

angular.module('ProgrammerRPGApp')
    .directive('draggable',function(){
        return{
            //Link does the registering of DOM listener
            link: function(scope,element,attrs){
                //Detect the type of draggable
                element = $(element);
                if(element.hasClass('pr-draggable')){
                    element.draggable({
                        revert:true,
                        helper:'clone',
                        containment:'.stage-container'
                    });
                }else if(element.hasClass('actor')){
                    element.draggable({
                        containment:'.background'
                    });

                }
            }
        }
    });
