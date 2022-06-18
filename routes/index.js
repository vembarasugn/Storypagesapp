const express = require('express')
const router = express.Router()
const {validateAuth,validateGuest} = require('../middleware/auth')
const User = require('../models/User')
const Story = require('../models/Story')

//login-landing page
//route GET/
router.get('/', validateGuest, (req,res) => {
    res.render('login',{
        layout:'login'    
    })
})

//Dashboard
//route GET/dashboard
router.get('/dashboard', validateAuth , async (req,res) => {
    try {
        const stories = await Story.find({user: req.user.id}).lean()
        res.render('dashboard',{
            name:req.user.firstName,
            stories 
        })
    } catch (error) { 
        console.log(error)
        res.render('error/500')   
    }
})


module.exports = router
