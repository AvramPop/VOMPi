'use strict';

let fs = require( 'fs' ),
    ejs = require( 'ejs' );

exports = module.exports = ( echo, settings ) => {
    let host = 'http://' + ( process.env.DOMAIN || settings.HOST + ':' + settings.PORT ),
        sendgrid = require( 'sendgrid' )( settings.SENGRID.user, settings.SENGRID.pass ),

        /**
         *  Common Base Method
         *  to send emails
         */
        sendEmail = ( To, ToName, Subject, data, templateName ) => {
            let templateBasePath = require( 'path' ).normalize( __dirname + '/../..' ) + '/server/templates/',
                templatePath = templateBasePath + templateName + '.ejs';

            let str = fs.readFileSync( templatePath ),
                html = ejs.render( str.toString(), data ),
                email = new sendgrid.Email( {
                    to: To,
                    from: settings.SYSTEM.noReplyEmail,
                    fromname: settings.SYSTEM.name,
                    subject: Subject,
                    html: html
                } );

            if ( ToName ) {
                email.toname = ToName;
            }

            // Send the emal
            sendgrid.send( email, function ( err, json ) {
                if ( err ) {
                    return console.log( echo.error( JSON.stringify( err ) ) );
                }
                console.log( echo.success( JSON.stringify( json ) ) );
            } );
        },

        /**
         *  All supported methods
         *  to send emails
         */
        methods = {
            sendAdminForgottenPasswordEmail: ( name, email, activationCode ) => {
                let subject = 'Reset VOMPi admin password',
                    // See the related template in order to set
                    // the correct variables that need to be replaced
                    data = {
                        name: name,
                        link: encodeURI(
                            host + '/web/#/signin?code=' + activationCode
                        )
                    };
                console.log(
                    echo.info( 'Sending email to: ' + name + ' <' + email + '>' )
                );

                sendEmail( email, name, subject, data, 'admin-forgotpass' );

                return true;
            },

            sendAdminRegistrationEmail /*signUp*/: ( name, email ) => {
                let subject = 'VOMPi admin account created!',
                    // See the related template in order to set
                    // the correct variables that need to be replaced
                    data = {
                        name: name
                    };
                console.log(
                    echo.info( 'Sending email to: ' + name + ' <' + email + '>' )
                );

                sendEmail( email, name, subject, data, 'admin-registered' );

                return true;
            },

            sendAdminDeletedAccountEmail: ( name, email ) => {
                let subject = 'VOMPi admin account deleted',
                    // See the related template in order to set
                    // the correct variables that need to be replaced
                    data = {
                        name: name
                    };
                console.log(
                    echo.info( 'Sending email to: ' + name + ' <' + email + '>' )
                );

                sendEmail( email, name, subject, data, 'admin-deletedaccount' );

                return true;
            },

            sendPersonRegistrationEmail: ( name, email ) => {
                let subject = 'VOMPi account created',
                    // See the related template in order to set
                    // the correct variables that need to be replaced
                    data = {
                        name: name
                    };
                console.log(
                    echo.info( 'Sending email to: ' + name + ' <' + email + '>' )
                );

                sendEmail( email, name, subject, data, 'person-registered' );

                return true;
            },

            sendPersonForgottenPasswordEmail: ( name, email, activationCode ) => {
                let subject = 'Reset VOMPi password',
                    // See the related template in order to set
                    // the correct variables that need to be replaced
                    data = {
                        name: name,
                        link: encodeURI(
                            host + '/web/#/signin?code=' + activationCode
                        )
                    };
                console.log(
                    echo.info( 'Sending email to: ' + name + ' <' + email + '>' )
                );

                sendEmail( email, name, subject, data, 'person-forgotpass' );

                return true;
            },

            sendPersonSignUpLinkEmail: ( name, email, activationCode ) => {
                let subject = 'Create VOMPi account',
                    // See the related template in order to set
                    // the correct variables that need to be replaced
                    data = {
                        name: name,
                        link: encodeURI(
                            host + '/web/#/signin?code=' + activationCode
                        )
                    };
                console.log(
                    echo.info( 'Sending email to: ' + name + ' <' + email + '>' )
                );

                sendEmail( email, name, subject, data, 'person-signup' );

                return true;
            },


            sendPersonDeletedAccountEmail: ( name, email ) => {
                let subject = 'VOMPi account deleted',
                    // See the related template in order to set
                    // the correct variables that need to be replaced
                    data = {
                        name: name
                    };
                console.log(
                    echo.info( 'Sending email to: ' + name + ' <' + email + '>' )
                );

                sendEmail( email, name, subject, data, 'person-deletedaccount' );

                return true;
            },

            sendAdminSuccessfullyChangedPasswordEmail: ( name, email ) => {
                let subject = 'VOMPi admin password changed',
                    // See the related template in order to set
                    // the correct variables that need to be replaced
                    data = {
                        name: name
                    };
                console.log(
                    echo.info( 'Sending email to: ' + name + ' <' + email + '>' )
                );

                sendEmail( email, name, subject, data, 'admin-changedpass' );

                return true;
            },

            sendPersonSuccessfullyChangedPasswordEmail: ( name, email ) => {
                let subject = 'VOMPi password changed',
                    // See the related template in order to set
                    // the correct variables that need to be replaced
                    data = {
                        name: name
                    };
                console.log(
                    echo.info( 'Sending email to: ' + name + ' <' + email + '>' )
                );

                sendEmail( email, name, subject, data, 'person-changedpass' );

                return true;
            },

            sendTokenToVoter: ( name, email, token, campaign ) => {
                let subject = 'VOMPi campaign token',
                    // See the related template in order to set
                    // the correct variables that need to be replaced
                    data = {
                        name: name,
                        token: token,
                        campaign: campaign
                    };
                console.log(
                    echo.info( 'Sending email to: ' + name + ' <' + email + '>' )
                );

                sendEmail( email, name, subject, data, 'person-tokenforvote' );

                return true;
            }
        };

    return methods;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/echo',
    'libs/settings'
];
