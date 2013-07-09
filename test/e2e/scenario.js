'use strict';

describe('ProgrammerRPG',function(){
    describe('Admin',function(){
        beforeEach(function() {
            browser().navigateTo('/#/admin');
        });

        it('should see the right URL',function(){
            expect(element('#scene-nav').text()).toBe('Scene Navigation');
        });
    });

});
