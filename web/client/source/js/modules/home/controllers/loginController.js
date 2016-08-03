( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'loginCtrl', loginCtrl );

    loginCtrl.$inject = [ '$scope'];

    /* @ngInject */
    function loginCtrl( $scope ) {
         $scope.submit = function(){
                var uname = $scope.username;
                var password = $scope.password;
            };
        }

})();
