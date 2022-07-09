const express = require('express')
const router = express.Router()
const passport = require('passport')

//Google auth
//route GET/auth/google
router.get('/google',passport.authenticate('google',{ scope:['profile']}))

//Google auth callback
//route GET/auth/google/callback
router.get('/google/callback',passport.authenticate('google',{ failureRedirect:'/'}),(req,res) => {
    res.redirect('/dashboard')
})

// User Logout
//route /auth/logout
router.get('/logout', (req,res) => {
    req.logout( (err) => {
        if (err){
           return res(err)
        }
    })
    res.redirect('/')
} )

module.exports = router


