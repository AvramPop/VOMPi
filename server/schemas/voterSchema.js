exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        voterSchema = new Schema( {
            voterHasVoted: {
                type: Boolean,
                required: true
            },
            voterIsValid: {
                type: Boolean,
                required: true
            }
        }
      );

    return voterSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
