( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'addNewPersonController', addNewPersonController );

    addNewPersonController.$inject = [ '$scope', '$location', '$state', '$http' ];

    /* @ngInject */
    function addNewPersonController( $scope, $location, $state, $http ) {

        angular.element( '.datepicker' ).pickadate( {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        } );

        $scope.submit = function () {
            $http.post( '/api/v1/person/create', $scope.add, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxSWQiOiIxMjkxMzIyMjI1MjM4MTUiLCJmaXJzdE5hbWUiOiJKb2huNzciLCJsYXN0TmFtZSI6IkRvZTIyIiwiaWF0IjoxNDcyMzMwNTA4LCJleHAiOjE0NzQ5MjI1MDh9.fPXhr6eOXL4MsJ4YKRevHL-1b4COB8ZKjHH3yT9aFNg'

                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request', respSucc );
                $http.post( '/api/v1/livingArea/create', $scope.add, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxSWQiOiIxMjkxMzIyMjI1MjM4MTUiLCJmaXJzdE5hbWUiOiJKb2huNzciLCJsYXN0TmFtZSI6IkRvZTIyIiwiaWF0IjoxNDcyMzMwNTA4LCJleHAiOjE0NzQ5MjI1MDh9.fPXhr6eOXL4MsJ4YKRevHL-1b4COB8ZKjHH3yT9aFNg'

                    }
                } ).then( function ( respSucc ) {
                    console.log( 'merge pana la request', respSucc );
                    //person.livingArea = livingArea._id; cumva facut sa mearga
                    return respSucc;
                }, function ( respErr ) {
                    console.log( 'merge pana la request', respErr );

                    return respErr;
                } );
                $location.path( '/#/list' );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );

                return respErr;
            } );
        };
    }
} )();
