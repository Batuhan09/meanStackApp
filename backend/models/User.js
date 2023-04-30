const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');   
const Schema = mongoose.Schema;
let User = new Schema({
    userName: {
        type: String,
        required: 'Username can\'t be empty'
    },
    nameAndSurname:{
        type: String,
        required: 'User name and surname can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    role:{
        type: String,
    },
    gender:{
        type: String,
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
    birthdate: {
        type: Date
    },
    saltSecret: String
});

// Custom validation for email
User.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
User.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});
// Methods
User.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

User.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id, userName: this.userName, role: this.role},
        "SECRET#123",
    {
        expiresIn: "1h"
    });
}
module.exports = mongoose.model('User', User)