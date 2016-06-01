'use strict';

let CryptoJS = require( 'crypto-js' ),
    _request = require( 'request-promise' ),
    _ = require( 'lodash' );

exports = module.exports = ( Settings ) => {
    let secret = Settings.SESSION.secret,
        utils = {
            encrypt: encrypt,
            decrypt: decrypt,
            getData: getData,
            postData: postData,
            postFormData: postFormData,
            dateToString: dateToString,
            isValidURL: isValidURL,
            getDateArrayString: getDateArrayString
        };

    return utils;

    function encrypt( data, isObject ) {
        if ( isObject && _.isObject( data ) ) data = JSON.stringify( data );
        let encryptedData = CryptoJS.AES.encrypt( data, secret );
        return encryptedData.toString();
    }

    function decrypt( data, isObject ) {
        let bytes = CryptoJS.AES.decrypt( data, secret ),
            decryptedData = bytes.toString( CryptoJS.enc.Utf8 );
        if ( isObject ) decryptedData = JSON.parse( decryptedData );
        return decryptedData;
    }

    function getData( url, params, headers, noParse ) {
        return new Promise( ( resolve, reject ) => {
            _request.get( {
                uri: url,
                headers: _.extend( headers, {
                    'Content-Type': 'application/json'
                } ),
                qs: params,
                json: true
            } ).then( function ( res ) {
                return noParse === true ? resolve( res ) : resolve( JSON.parse( res ) );
            } )[ 'catch' ]( reject );
        } );
    }

    function postData( url, params ) {
        return new Promise( ( resolve, reject ) => {
            _request.post( {
                uri: url,
                body: params,
                json: true
            } ).then( function ( res ) {
                return resolve( JSON.parse( res ) );
            } )[ 'catch' ]( reject );
        } );
    }

    function postFormData( url, params, headers ) {
        return new Promise( ( resolve, reject ) => {
            _request.post( {
                uri: url,
                headers: _.extend( headers, {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                } ),
                form: params
            } ).then( function ( res ) {
                return resolve( JSON.parse( res ) );
            } )[ 'catch' ]( reject );
        } );
    }

    function getDateArrayString( start, end ) {
        let date1 = end,
            date2 = start,
            day,
            between = [ utils.dateToString( date1 ) ];
        while ( date2 < date1 ) {
            day = date1.getDate();
            date1 = new Date( date1.setDate( --day ) );
            between.push( utils.dateToString( date1 ) );
        }
        return between;
    }

    function dateToString( date ) {
        var yyyy = date.getFullYear(),
            mm = date.getMonth() < 9 ? '0' + ( date.getMonth() + 1 ) :
            ( date.getMonth() + 1 ), // getMonth() is zero-based
            dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return ''.concat( dd ).concat( '/' ).concat( mm ).concat( '/' ).concat( yyyy );
    }

    function isValidURL( x ) {
        var pattern = new RegExp( '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i' ); // fragment locator

        return !!pattern.test( x ); // jshint ignore:line
    }
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/settings'
];
