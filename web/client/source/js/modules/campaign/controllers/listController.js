(function()  {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'listController', listController);

    campaignCtrl.$inject = [ '$scope', '$http' ];

 
    function campaignCtrl( $scope, $http ) {


        $scope.submit = function () {
            $http.get( '/api/v1/campaign/listparams').then( function ( respSucc ) {
                console.log( 'merge pana la request', respSucc );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );
                return respErr;
            } );
            $
        };
    }

});