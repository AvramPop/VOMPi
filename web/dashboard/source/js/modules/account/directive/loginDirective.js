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
            controllerAs: 'loginVM',
            bindToController: true
        };

        return directive;

        function linkFunc( scope, elem, attr ) {
            var inputEmail = elem.find( '.login-email' ),
                avatar = elem.find( '.user-avatar .valign img' ),
                changeAvatar = function ( src ) {
                    if ( !_.isEmpty( src ) && src !== scope.loginVM.user.avatar ) {
                        avatar.addClass( 'hidden' );
                        $timeout( function () {
                            scope.loginVM.user.avatar = src;
                        }, 100 );
                        $timeout( function () {
                            avatar.removeClass( 'hidden' );
                        }, 100 );
                    } else {
                        scope.loginVM.user.avatar = ENV.DEFAULT.defaultAvatar;
                    }
                },
                setDefault = function () {
                    changeAvatar( ENV.DEFAULT.defaultAvatar );
                    $timeout( function () {
                        scope.loginVM.user.name = scope.loginVM.default.name;
                    }, 0 );
                };

            inputEmail.blur( function () {
                var email = inputEmail[ 0 ].value;
                if ( !_.isEmpty( email ) && validate.isEmail( email ) ) {
                    scope.loginVM.setInfo( email ).then( function ( data ) {
                        if ( data.user ) {
                            scope.loginVM.user.email = email;
                            $timeout( function () {
                                scope.loginVM.user.name = data.user.name + ' ' + data.user.lastName;
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
