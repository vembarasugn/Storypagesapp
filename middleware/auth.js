module.exports = {
    validateAuth: function (req,res,next) {
        if(req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        } 
    },
    validateGuest: function (req,res,next) {
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }
}




