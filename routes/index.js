const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product.model.js');

router.get('/', (req, res) => {
    let error = req.flash("error");
    let loggedin = !!req.user; 
    
    res.render("index", { error , loggedin });
});

router.get('/shop', isLoggedin, async (req, res) => {
    try {
        let products = await productModel.find();
        // console.log(products);
        res.render("shop", { products });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading products");
    }
});

module.exports = router;