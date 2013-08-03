'use strict';

angular.module('cssBackgroundURL',[]).filter('filterURL',function(){
    return function(input){
        input = input ? input: '';
        return input.substring(0,3) === 'url' ? input:'url('+input+')';
    };
});
