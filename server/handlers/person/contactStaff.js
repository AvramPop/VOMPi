'use strict';

exports = module.exports = ( sendMail ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body;
        sendMail.sendContactEmail( b.name, b.email, b.text );
        this.success( {
            person: 'jhgh'
        } );
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/email'
];
