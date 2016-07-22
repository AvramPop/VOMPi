( function () {
    'use strict';

    angular
        .module( 'app.account' )
        .directive( 'loginForm', loginForm );

    /* @ngInject */
    loginForm.$inject = [ 'ENV', '$timeout', 'validate', '_' ];

    function loginForm( ENV, $timeout, validate, _ ) {
        var directive = {
            restrict: 'AC',
            link: linkFunc,
            controller: 'loginCtrl',
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc( scope, elem, attr ) {
            var inputEmail = elem.find( '.login-email' ),
                avatar = elem.find( '.user-avatar .valign img' ),
                changeAvatar = function ( src ) {
                    if ( !_.isEmpty( src ) && src !== scope.vm.user.avatar ) {
                        avatar.addClass( 'hidden' );
                        $timeout( function () {
                            scope.vm.user.avatar = src;
                        }, 100 );
                        $timeout( function () {
                            avatar.removeClass( 'hidden' );
                        }, 100 );
                    } else {
                        scope.vm.user.avatar = ENV.DEFAULT.avatar;
                    }
                },
                setDefault = function () {
                    changeAvatar( ENV.DEFAULT.avatar );
                    $timeout( function () {
                        scope.vm.user.name = scope.vm.default.name;
                    }, 0 );
                };

            inputEmail.blur( function () {
                var email = inputEmail[ 0 ].value;
                if ( !_.isEmpty( email ) && validate.isEmail( email ) ) {
                    scope.vm.setInfo( email ).then( function ( data ) {
                        if ( data.user ) {
                            scope.vm.user.email = email;
                            $timeout( function () {
                                scope.vm.user.name = data.user.name + ' ' + data.user.lastName;
                            }, 150 );
                            changeAvatar( data.user.avatar );
                        } else {
                            setDefault();
                        }
                    } );
                } else {
                    setDefault();
                }
            } );
        }
    }
} )();
