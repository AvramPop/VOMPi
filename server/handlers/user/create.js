exports = module.exports = ( echo ) => {
    return function *(){
        let h = this.request.header,
            b = this.request.body;
            yield;
            // rec = yield PersonModel.findOne({ email: b.email}).exec();
            //
            // if( !rec ) {
            //    let newUser = new PersonModel({
            //      password: b.password,
            //      email: b.email,
            //      active: false,
            //      name: b.name,
            //      lastName: b.lastname,
            //      activationCode: b.lastname+b.name+'ceva'});1
            //    yield newUser.save();
            //      this.success({ user: rec });
            // }else{
            //   throw ( {
            //       code: 404,
            //       message: 'User already exists'
            //   } );
            // }
        this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
  'libs/echo'
    // 'model/personModel'
];
