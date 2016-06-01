'use strict';

let valid = require( 'bonafide' );

exports = module.exports = () => {
    return ( validations, handler ) => {
        return function* () {
            let count = validations.length,
                body = this.request.body;

            while ( count-- ) {
                let rule = validations[ count ],
                    validators = rule.validators,
                    validatorCount = validators.length,
                    value;

                switch ( rule.type ) {
                    case 'path':
                        value = arguments[ rule.index ];
                        break;
                    case 'body':
                        var o = body,
                            parts = rule.param.split( '.' ),
                            current;

                        do {
                            current = parts.shift();
                            o = o[ current ];
                            if ( !o ) {
                                value = undefined;
                            }
                        } while ( parts.length && current && o );

                        if ( !parts.length ) {
                            value = o;
                        }
                        break;
                    default:
                        var location = this.request[ rule.type ];
                        value = location && location[ rule.param ];
                        break;
                }

                let i = 0,
                    c = valid( value );

                while ( i < validatorCount ) {
                    let validator = validators[ i ],
                        res = c[ validator.name ].apply( c, validator.params );
                    if ( res.error ) {
                        //this.fail(422, rule.param + ' ' + res.error);
                        throw ( {
                            code: 400,
                            message: rule.param + ' ' + res.error
                        } );
                    }

                    i++;
                }
            }

            yield * handler.apply( this, arguments );
        };
    };
};

exports[ '@singleton' ] = true;
