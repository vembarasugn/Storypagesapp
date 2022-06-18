//connecting via mongoClient 

// const MongoClient = require('mongodb').MongoClient;

// async function connectDB() {

//     const uri = process.env.MONGO_URI

//     //const uri = mongodb://127.0.0.1:27017/StoryDB

//     const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
    
//         try {
//             await client.connect();
//             console.log('Connected to mongoDB successfully..')
//             //await listDatabases(client);
//         } catch (err) {
//             console.error(err)
//         } finally {
//             await client.close();
//         }
//     }

// module.exports = connectDB 


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
                    console.log( "Not connected to mongoDB..")});

                }

module.exports = connectDB        










