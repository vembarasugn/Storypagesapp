const mongoose = require('mongoose') 

const StorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    status:{
        type: String,
        default: 'public',
        enum:['public','private']
    },
    body:{
        type: String,
        required: true, 
        trim:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}) 

module.exports = mongoose.model('Story',StorySchema) 
