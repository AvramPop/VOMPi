exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        candidateSchema = new Schema( {
            type: {
                type: String,
                required: true
            },
            personId: {
              type: mongoose.Schema.Types.ObjectId,
              ref:'Person',
              required: true
            },
            optionals: {
              type: Mixed,
              required: false
            },
            numberOfVotes: {
              type: Number,
              required: true,
              default: 0
            }

        } );

    return candidateSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
