const mongoose = require("mongoose");

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    pseudo: { type: String, require: true, minLength: [3, 'Pseudo trop court'], maxLength: [16, 'Pseudo trop long'],},
    birthDate: { type: Date, require: true },
    sexe: { type: String, required: true },
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true, minLength: [6, 'Mot de Passe trop court'],},
    isAdmin: { type: Boolean, default: false},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

