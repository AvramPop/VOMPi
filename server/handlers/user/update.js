'use strict';
/**
 * @api {patch} /users/:userId  UPDATE User
 *
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiDescription
 * Update User
 *
 * @apiHeader {String} x-user-token authentication token
 *
 * @apiParam {String} [email]
 * @apiParam {String} [password]
 * @apiParam {String} [name]
 * @apiParam {String} [lastName]
 * @apiParam {String} [avatar]
 * @apiParam {ObjectId} [roleId] ex: 5731937c671ebc0f212273de
 *
 * @apiParamExample {json} Request-Example:
 *              {
 *              "name": "Pop",
 *              "lastName": "Corina"
 *            }
 * @apiPermission [ Administrator, Editor , User, Customer]
 * @apiSuccess {String} status
 * 'success'
 *
 * @apiSuccess {Object} data
 * User Object
 *
 * @apiError {String} status
 * 'error'
 *
 * @apiError {Object} error
 * error code and message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": "success",
 *           "data": {
 *               "user": {
 *                 "_id": "5731937d671ebc0f212273e2",
 *                 "updatedAt": "2016-05-13T12:38:51.805Z",
 *                 "createdAt": "2016-05-10T07:53:33.428Z",
 *                 "name": "System",
 *                 "lastName": "Admin",
 *                 "email": "admin@localhost.dev",
 *                 "password": "U2FsdGVkX1+2SfM4tn0UP73DaHDk8lxVGMbSYpk9g4U=",
 *                 "roleId": "5731937c671ebc0f212273e1",
 *                 "__v": 0,
 *                 "activationCode": null,
 *                 "active": true,
 *                 "network": [
 *                   {
 *                     "type": "local"
 *                   }
 *                 ]
 *               }
 *             }
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "status": "error",
 *       "error": {
 *          code: 422,
 *          message: 'User update failed'
 *        }
 *     }
 */

let jwt = require( 'jsonwebtoken' );

exports = module.exports = ( userModel ) => {
    return function *( id ){

        let h = this.request.header,
            b = this.request.body,
            token = jwt.decode( h[ 'x-user-token' ] ),
            rec;

        if ( ( id === token._id ) || (token.role.type === 'Administrator' ) || ( token.role.type === 'Editor' ) ){

            rec = yield userModel.findByIdAndUpdate( id, b , { new: true}).exec();

            if( !rec ) {
                throw ( {
                    code: 422,
                    message: 'User update failed'
                } );
            }
        } else {
            throw ( {
                code: 404,
                message: 'You are not allowed to edit this user'
            } );
        }

        this.success({ user: rec })
    };
};
exports[ 'singleton' ] = true;
exports[ '@require' ] = [
    'model/userModel'
];

