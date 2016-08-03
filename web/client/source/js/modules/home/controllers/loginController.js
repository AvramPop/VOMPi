( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'loginController', loginCtrl );

    loginCtrl.$inject = [ '$scope', 'authService', '$state', '$http'];

    /* @ngInject */
    function loginCtrl( $scope, authService, $state,$http ) {

         $scope.submit = function(){
             var baseURL = 'http://localhost:8000/api/v1',
                resp = '';
             console.log('vreau sa ma loghez!!!!!');
             function successCallback(response) {
                     console.log(response);
                     $state.go('web.login',{}, {reload: true});
                     resp = response;
                     return response;

                     // this callback will be called asynchronously
                     // when the response is available
                 }
                 function errorCallback(response) {
                       resp=response;
                        $state.go('web.login', {}, {reload: true});
                       return response;
                     // called asynchronously if an error occurs
                     // or server returns response with an error status.
                 }
                 $http.post(baseURL+'/admin/login', $scope.credentials).then(successCallback, errorCallback);
             authService.login($scope.credentials);
            };
        }

})();
