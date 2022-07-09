
//connecting via mongoose
const mongoose = require('mongoose')

const connectDB =  async() => {
     await mongoose.connect( process.env.MONGO_URI , { 
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true,
              useFindAndModify: false,})
                .then(()=> {
                    console.log("Connected to mongoDB successfully..")})
                .catch(()=> {
                    console.log( "Error: Not connected to mongoDB..")});

                }

module.exports = connectDB        








