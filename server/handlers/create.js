'use strict';

exports = module.exports = ( PersonModel) => {
    return function *(){
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findOne({ name: b.name}).exec();
            console.log(b);
            if( !rec ) {
               let newUser = new PersonModel({
                //  password: b.password,
                //  email: b.email,
                //  active: false,
                 name: b.name,
                 lastName: b.lastName,
                 uniqueIdentifier: (b.lastName+b.name+'ceva') });
                 console.log(newUser);
               yield newUser.save();
                 this.success({ user: newUser });
            }else{
              throw ( {
                  code: 404,
                  message: 'User already exists'
              } );
            }
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel'
];
