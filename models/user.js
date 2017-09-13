const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// email validate
let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};

let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp =
            new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

const emailValidators = [
    {
        validator: emailLengthChecker,
        message: 'E-mail must be at least 5 characters but no more than 30'
    },
    {
        validator: validEmailChecker,
        message: 'Must be a valid e-mail'
    }
]
//user name validate
let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15) {
            return false;
        } else {
            return true;
        }
    }
};
let validUsername = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp =
            new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};
const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: 'User name must be at least 3 characters but no more than 15'
    },
    {
        validator: validUsername,
        message: 'Username must not have any special characters'
    }
]
//password validate
let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 35) {
            return false;
        } else {
            return true;
        }
    }
};
let validPassword = (password) => {
    if (!password) {
        return false;
    } else {
        const regExp =
            new RegExp(/^(?=.*?[a-z])(?=.*?[\d])(?=.*?[\w]).{8,35}$/);
        return regExp.test(password);
    }
};
const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'Password must be at least 8 characters but no more than 35'
    },
    {
        validator: validPassword,
        message: 'Password must not have any special characters'
    }
]


var UserSchema = new Schema({
    email: { type: String, require: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, require: true, unique: true, lowercase: true, validate: usernameValidators },
    password: { type: String, require: true,validate: passwordValidators }
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});


module.exports = mongoose.model('User', UserSchema);