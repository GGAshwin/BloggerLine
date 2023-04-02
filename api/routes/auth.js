const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')

// Register
// use async function if operations with database is involved
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        const user = await newUser.save()
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

// Login

router.post('/login', async (req, res) => {
    // try {
    const user = await User.findOne({ username: req.body.username })
    console.log(user);
    if(!user){
        res.status(400).json("WRONG CREDENTIALS")
        return
    }

    const validate = await bcrypt.compare(req.body.password, user.password)
    console.log(validate);
    if(!validate){
        res.status(400).json("WRONG CREDENTIALS")
        return
    }

    const { password, ...others } = user._doc
    res.status(200).json(others)
    // }
    // catch (err) {
    //     console.log(err);
    //     res.status(500).json(err)
    // }
})

module.exports = router