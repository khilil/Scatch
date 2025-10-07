const jwt = require('jsonwebtoken'); // <- this was missing
const userModel = require('../models/user.model');

module.exports = async (req, res, next) => {
    const { token } = req.cookies;
    // console.log("Token from cookie:", token); // debug

    if (!token) {
        // console.log("No token found");
        req.flash("error", "You must be logged in to access this page");
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // console.log("Decoded token:", decoded); // debug
        const user = await userModel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            console.log("User not found");
            req.flash("error", "User not found");
            return res.redirect('/');
        }

        console.log("User found:", user.email); // debug
        req.user = user;
        return next();
    } catch (err) {
        console.error("JWT verify error:", err.message);
        req.flash("error", "You must be logged in to access this page");
        return res.redirect('/');
    }
};
