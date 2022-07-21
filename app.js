const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const methodOverride = require('method-override')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const connectDB = require('./DB/connection')
require('./models/User')
require('./models/Story')

// Initializing app  
const app = express()


// To load config 
dotenv.config({path:'./config/.env'}) 

//passport config
require('./config/passport')(passport)

//Call written connectDB function here 
connectDB().catch(console.error);

//MongoDB sessions
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions', 
  expires: 1000 * 60 * 60 * 24 * 30,
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
  }
});


//Express body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json()) 


//middleware methodoverride
app.use(
  methodOverride(function(req,res){
    if(req.body && typeof req.body ==='object' && '_method' in req.body){
        //look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
   })
)

//Logging in 
if (process.env.PORT === 'development') {
   app.use(morgan('dev'))
}

//Express Handlebars helpers
const {formatDate,stripTags,truncate,editIcon,select} = require('./helpers/hbs')
const { truncateSync } = require('fs')
const { connection } = require('mongoose')

//Express Handlebars
app.engine('.hbs', exphbs.engine({ 
    helpers:{
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
    }, 
        defaultLayout:'main', extname: '.hbs'}));
app.set('view engine', '.hbs');


//connect-sessions
  app.use(session({
    secret: 'This is a secret',
    store: store,
    resave: true,
    saveUninitialized: false,
    cookie:{
      maxAge: 1000 * 60 * 60 * 24 * 7 
    }
  }));

//passport middleware
app.use(passport.initialize())
app.use(passport.session()) 

//set global variable
app.use( function(req,res,next) {
    res.locals.user = req.user || null
    next()
})

//static folders
app.use(express.static(path.join(__dirname,'public')))


//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 5000 

 
app.listen(PORT,function(){
  console.log( `Server is listening on localhost:${process.env.PORT} ..!`)})


 