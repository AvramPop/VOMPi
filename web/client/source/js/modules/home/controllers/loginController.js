( function () {
    'use strict';

    angular
        .module( 'app.login' )
        .controller( 'loginCtrl', loginCtrl );

    loginCtrl.$inject = [ '$scope'];

    /* @ngInject */
    function homeCtrl( $scope ) {
         $scope.submit = function(){
                var uname = $scope.username;
                var password = $scope.password;
            }
        }
    
})();