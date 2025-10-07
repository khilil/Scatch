const express = require('express');
const router = express.Router();
const ownersModel = require('../models/owner.model')




if (process.env.NODE_ENV === 'development') {
    router.post('/create', async function (req, res) {
        let owners = await ownersModel.find();
        if (owners.length > 0) {
            return res
                .status(503)
                .send('You dont have permission to create owners');
        }

        let { fullname, email, password } = req.body;

        let createdOwner = await ownersModel.create({
            fullname,
            email,
            password,
        })

        res.status(201).send(createdOwner)
    })
    console.log('In development mode');
}

router.get('/', (req, res) => {
    res.send('Owners Home Page');
})

router.get('/admin', (req, res) => {
    let success = req.flash("success")
    res.render('createproducts', { success });
})




module.exports = router;