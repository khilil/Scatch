const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken')


module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email });

     if (user) {
            req.flash("error", "You already have an account, please login");
            return res.redirect("/"); // go back to homepage/login
        }

        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    })

                    let token = generateToken(user);
                    res.cookie('token', token, { httpOnly: true });

                    res.send("user created successfully");
                }
            })
        })


    } catch (error) {
        res.send(error.message);
    }
}