'use strict';

let co = require( 'co' );

exports = module.exports = ( mongoose, userSchema ) => {
    let User = mongoose.model( 'User', userSchema, 'User' );

    User.hasSocialNetwork = ( networkId, network ) => {
        return co( function* () {
            return yield User.aggregate( {
                $match: {
                    network: {
                        $elemMatch: {
                            type: network,
                            'match.id': networkId
                        }
                    }
                }
            } ).exec();
        } );
    };

    User.addSocialNetwork = ( userId, networkType, accountInfo, ACCESS_TOKEN ) => {
        return co( function* () {
            return yield User.findByIdAndUpdate( userId, {
                $push: {
                    network: {
                        type: networkType,
                        match: {
                            id: accountInfo.id,
                            token: ACCESS_TOKEN,
                            name: accountInfo.displayName,
                            email: accountInfo.email,
                            avatar: accountInfo.picture,
                            url: accountInfo.url
                        }
                    }
                }
            }, {
                new: true,
                safe: true,
                upsert: true
            } );
        } );
    };

    User.patchSocialNetwork = ( accountInfo, networkType, ACCESS_TOKEN, user ) => {
        return co( function* () {
            let hasNetwork = user.network.find( net => {
                return net.match.id === accountInfo.id;
            } );

            if ( user && !hasNetwork ) {
                return yield User.addSocialNetwork( user._id, networkType, accountInfo, ACCESS_TOKEN );
            } else {
                return yield User.patchSocialNetworkToken( accountInfo.id, ACCESS_TOKEN );
            }
        } );
    };

    User.patchSocialNetworkToken = ( networkId, networkToken ) => {
        return co( function* () {
            return yield User.findOneAndUpdate( {
                'network.match.id': networkId,
            }, {
                $set: {
                    'network.$.match.token': networkToken
                }
            }, {
                new: true
            } );
        } );
    };

    // User.createFromSocialNetwork = ( accountInfo, networkType, ACCESS_TOKEN ) => {
    //     return co( function* () {
    //         let role = yield Role.findOne( {
    //                 type: 'User'
    //             } ),
    //             user = new User( {
    //                 name: accountInfo.first_name,
    //                 lastName: accountInfo.last_name,
    //                 email: accountInfo.email,
    //                 avatar: accountInfo.picture,
    //                 roleId: role._id,
    //                 network: [ {
    //                     type: networkType,
    //                     match: {
    //                         id: accountInfo.id,
    //                         token: ACCESS_TOKEN,
    //                         name: accountInfo.displayName,
    //                         email: accountInfo.email,
    //                         avatar: accountInfo.picture,
    //                         url: accountInfo.url
    //                     }
    //                 } ],
    //                 active: true
    //             } );
    //
    //         return yield user.save();
    //     } );
    // };

    return User;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose',
    'schemas/userSchema'
];
