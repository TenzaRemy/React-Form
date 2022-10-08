const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');

const secret = process.env.TOKEN;

exports.signin = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            birthDate: req.body.birthDate,
            password: hash,
            isAdmin: false,
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée'}))
        .catch(error => res.status(400).json({ message: 'Adresse mail déjà utilisée'}));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.signup = (req, res, next) => {
    User.findOne({ email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(400).json({error: 'Aucun compte correspond aux identifiants inscrits'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(400).json({error: 'Mot de passe incorrect'});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    secret,
                    { expiresIn: '24h' },
                ),
                    pseudo: user.pseudo,
                    email: user.email,    
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};