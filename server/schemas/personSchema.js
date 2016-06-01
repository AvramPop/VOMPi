exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        personSchema = new Schema( {
            Name: {
                type: String,
            },
            Surname: {
                type: String,
            },
            canVote: {
                type: boolean,
            },
            uniqueIdentifier: {
                type: String,
            },
            gender: {
                type: String,
            },
            dateOfBirth: {
                type: Date,
            },
            livingArea: {
                type: String,
            }

        } );

    return personSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
