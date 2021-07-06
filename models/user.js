const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

let emailLengthChecker = (email) =>{
    if(!email){
        return false;
    }else{
        if(email.length < 5 || email.length > 30){
            return false
        }else{
            return true;
        }
    }
}
let validEmailChecker = (email) => {
    if(!email){
        return false;
    }else{
        const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const regEx = new RegExp(exp);
        return regEx.test(email);
    }
}

const emailValidators = [
    {
        validator:emailLengthChecker , message:'Email length is not proper!'
    },
    {
        validator:validEmailChecker , message : 'Email is not Valid !'
    }
]

var userSchema = new Schema({
    email: { type: String, required: true, unique: true , validate: emailValidators },
    password: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true }

});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        this.password = hash;
        console.log(this.password)
        next();
    })
})

userSchema.methods.comparePassword = (password) => {
    console.log(bcrypt.compareSync(password, this.password));
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema);