const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');


module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:process.env.callURI +'/auth/google/callback'
        //callbackURL:'https://storypagesapp.herokuapp.com/auth/google/callback'
    },
    async (accessToken,refreshToken,profile,done) => {
        const newUser = {
            googleId : profile.id,
            displayName : profile.displayName,
            firstName : profile.name.givenName,
            lastName : profile.name.familyName,
            image : profile.photos[0].value
        }
         
        try {
            let user = await User.findOne({ googleId : profile.id })

            if(user) {
                done(null,user)
            } else {
                user = await User.create(newUser)
                done(null,user)
            }
        } catch (error) {
            console.log(error)
        }
    }))

    passport.serializeUser(function(user,done){
        done(null, user.id)
    })

    passport.deserializeUser(function(id,done){
        User.findById(id, function(err,user){
            done(err,user)
        })
    })

}
