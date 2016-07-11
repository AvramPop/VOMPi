exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        candidateSchema = new Schema( {
            numberOfVotes: {
                type: Number,
                required: true
            }

        } );

    return candidateSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
