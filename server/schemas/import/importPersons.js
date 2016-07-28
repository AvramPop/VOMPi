'use strict';

let co = require( 'co' ),
    IoC = require( 'electrolyte' );

IoC.use( IoC.dir( require( 'path' ).normalize( __dirname + '/../../..' ) + '/server' ) );

( co.wrap( function* () {
    let echo = IoC.create( 'libs/echo' ),
        conn = IoC.create( 'libs/database' ),
        Client = IoC.create( 'model/personModel' ),
        data = [ {
            "firstName": "John",
            "lastName": "Doe",
            "password": "mata",
            "email": "sefuiop@gmail.com",
            "uniqueIdentifier": "1291322225815",
            "gender": "male",
            "dateOfBirth": "1999-12-22T18:25:43.511Z",
            "livingArea": "5798899ac15c8420193adc4a",
            "telephone": "0757337065"
        }, {
            "firstName": "John",
            "lastName": "Doe",
            "email": "sefuinamataop@gmail.com",
            "uniqueIdentifier": "1291322225815",
            "gender": "male",
            "password": "mata2",
            "dateOfBirth": new Date(),
            "livingArea": "5798899ac15c8420193adc4a",
            "telephone": "0757337065"
        } ],
        clients = yield Client.find().exec();
    if ( !clients.length ) {
        Client.create( data, ( err, res ) => {
            if ( err ) {
                console.log(
                    echo.error( 'Import Clients Error! :-( Whoops, something goes wrong: ' + JSON.stringify( err ) )
                );
                conn.disconnect();
            } else {
                console.log(
                    echo.success( 'Import Clients Success! :-) ' )
                );
                conn.disconnect();
            }
        } );
    } else {
        conn.disconnect();
    }
} ) )();
