const express = require("express");
const bcrypt = require("bcrypt");

const UserModel = require("../models/user-model");

const router = express.Router();

// ROUTES -----------------------------------

// Signup form
router.get("/signup", (req, res, next) => {
    res.render("user-views/signup-page");
});

// Process signup form
router.post("/process-signup", (req, res, next) => {
    UserModel.findOne( {username: req.body.signupUsername} )
      .then((userFromDb) => {
        if (userFromDb !== null) {
          res.locals.errorMessage = "This username is taken.";
          res.render("user-views/signup-page");

          return;
    }

    const salt = bcrypt.genSaltSync(10);
        // encrypt the password submitted by the user from the form
        const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

        // register the new user
        const theUser = new UserModel({
            fullName: req.body.signupFullName,
            username:    req.body.signupUsername,
            encryptedPassword: scrambledPassword
        });
        // return the promise of the next database query
        // to continue the sequence
        return theUser.save();
    })

    .then( () => {
        //redirect to the home page on a successful sign up
        res.redirect("/");
    })
    .catch( (err) => {
        next(err);
    });

});


// -------------------------------------------

module.exports = router;
