'use strict';

exports = module.exports = ( mongoose ) => {
    let validateEmail = ( email ) => {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test( email ); // Assuming email has a text attribute
        },
        Schema = mongoose.Schema,
        userSchema = new Schema( {
            email: {
                type: String,
                trim: true,
                unique: true,
                required: 'Email address is required',
                validate: [ validateEmail, 'Please fill a valid email address' ]
            },
            password: {
                type: String,
                trim: true
            },
            name: {
                type: String
            },
            lastName: {
                type: String
            },
            avatar: {
                type: String,
                trim: true
            },
            roleId: {
                type: Schema.Types.ObjectId
            },
            network: [ {
                _id: false,
                type: {
                    type: String,
                    trim: true,
                    enum: [ 'facebook', 'google', 'local' ],
                    required: true,
                },
                match: { // for facebook and google social network match
                    id: {
                        type: String,
                        trim: true
                    },
                    token: {
                        type: String,
                        trim: true
                    },
                    email: {
                        type: String,
                        trim: true
                    },
                    name: {
                        type: String,
                        trim: true
                    },
                    avatar: {
                        type: String,
                        trim: true
                    },
                    url: {
                        type: String,
                        trim: true
                    }
                }
            } ],
            active: {
                type: Boolean,
                default: false
            },
            activationCode: {
                type: String,
                default: null
            }
        }, {
            timestamps: true
        } );

    return userSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
