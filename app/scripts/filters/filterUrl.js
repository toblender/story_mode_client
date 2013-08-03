'use strict';

angular.module('URLFilter',[]).filter('URLFilter',function(){
    return function(input){
        return input.substring(0,2) === 'url' ? 'uhoh':input;
    };
});
