const express = require("express");
const passwordValidator = require("password-validator");


const passwordSchema = new passwordValidator();

passwordSchema
  .is().min(6, "Minimum lenght 6")
  .has().uppercase(1, "At least One Uppercase")
  .has().lowercase(1, "At least One Lowercase")
  .has().digits(1, "At least one number")
  .has().not().spaces()
  .not(/[='$<>{}\(\)].*/, "No vulnerable characters") //Protection contre injections

  module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
      next();
    } else {
      return res.status(400).json({ error: "le mot de passe n'est pas assez fort ",
      });
    }
  };