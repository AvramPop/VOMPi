( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'aloginController', aloginController );

    aloginController.$inject = [ '$scope', '$location', '$state', '$http', '$sce' ];

    /* @ngInject */
    function aloginController( $scope, $location, $state, $http, $sce ) {

        function htmlString( str ) {
            return '<h1>' + str + '</h1>';
        }
        $scope.submit = function () {
            $http.post( '/api/v1/admin/login', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request', respSucc );
                $state.go( 'layout.listcampaigns' );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );
                $scope.htmlString = htmlString( 'Bad credentials!' );
                $scope.myContent = $sce.trustAsHtml( htmlString( 'Bad credentials' ) );
                return respErr;
            } );
        };
    }

} )();
