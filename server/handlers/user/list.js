'use strict';

/**
 * @api {get} /users  GET User list
 *
 * @apiVersion 1.0.0
 * @apiName GetUser's
 * @apiGroup User
 *
 * @apiDescription
 * Get User list
 *
 * @apiHeader {String} x-user-token authentication token
 *
 * @apiPermission [ Administrator, Editor ]
 * @apiSuccess {String} status
 * 'success'
 *
 * @apiSuccess {Array} data
 * Array of User Object
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
 *          "data": [{
 *              "_id": "5731937d671ebc0f212273e2",
 *            	"updatedAt": "2016-05-10T09:20:52.349Z",
 *             	"createdAt": "2016-05-10T07:53:33.428Z",
 *            	"name": "System",
 *            	"lastName": "Administrator",
 *            	"email": "admin@localhost.dev",
 *            	"password": "U2FsdGVkX1+2SfM4tn0UP73DaHDk8lxVGMbSYpk9g4U=",
 *            	"roleId": "5731937c671ebc0f212273e1",
 *              "__v":v0,
 *              "activationCode": null,
 *              "active": true,
 *              "network" : [
 *              {
 *                  "type" : "local"
 *           }]
 *       }]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "error": {
 *          code: 404,
 *          message: 'The list of users is empty or doesn\'t exist'
 *        }
 *     }
 */

exports = module.exports = ( userModel, _ ) => {
    return function* (){
        let rec = yield userModel.find();

        if ( _.isEmpty(rec) ) {
            throw ( {
                code: 404,
                message: "The list of users is empty or doesn\'t exist"
            } );
        }

        this.success({ rec })
    };
};
exports[ 'singleton' ] = true;
exports[ '@require' ] = [
    'model/userModel',
    'libs/lodash'
];