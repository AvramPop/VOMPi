'use strict';

exports = module.exports = ( Utils ) => {

    let baseUrl = 'http://taginfo.openstreetmap.org/api/4/key/values',
        methods = {
        verifyCategory: verifyCategoryFunc
    };

    return methods;

    function verifyCategoryFunc( key ) {
        let params =  {
            key: key,
            filter: 'all',
            lang: 'en',
            sortname: 'count',
            sortorder: 'desc',
            page: 1,
            rp: 999,
            qtype: 'value',
            format: 'json_pretty'
            };

        return Utils.getData( baseUrl, params, {} );
    }
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/utils'
];