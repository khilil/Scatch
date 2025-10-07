const express = require('express');
const userModel = require('../models/user.model');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken')

const { registerUser } = require('../controllers/auth.controller');
const e = require('express');

router.get('/', (req, res) => {
    res.send('Users Page');
})

router.post('/register', registerUser)

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error", "Email or password is incorrect");
            return res.redirect("/");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash("error", "Email or password is incorrect");
            return res.redirect("/");
        }

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            path: "/",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.redirect("/shop");
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong. Try again.");
        return res.redirect("/");
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' });
    req.flash("success", "Logged out successfully");
    res.redirect('/');
});



module.exports = router;