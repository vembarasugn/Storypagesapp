const express = require('express')
const router = express.Router()
const {validateAuth} = require('../middleware/auth')
const Story = require('../models/Story')
const User = require('../models/User')

// Show add page
//route GET/stories/add
router.get('/add', validateAuth, (req,res) => {
    res.render('stories/add')
})

//  add story to dashboard
//route POST/stories
router.post('/', validateAuth, async (req,res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body) 
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})

// Show all stories
//route GET/stories
router.get('/', validateAuth, async (req,res) => {
    try {
       const stories = await Story.find({
         user: req.params.status,
         status: 'public'   
        }) 
         .populate('user')
         .sort({createdAt:'desc'})
         .lean()
        
        res.render('stories/index',{
            stories
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    } 
})


// Show single story
//route GET/stories/:id
router.get('/:id', validateAuth, async (req,res) => {
    try {
        let story = await Story.findById(req.params.id)
          .populate('user')
          .lean()
        
        if(!story){
            return res.render('error/404')
        }

        res.render('stories/show',{
            story
        })
    } catch (error) {
        console.error(error)
        res.render('error/404')
    }
})


// Show edit page
//route GET/stories/edit/:id
router.get('/edit/:id', validateAuth, async (req,res) => {
    try {
        const story = await Story.findOne({
            _id:req.params.id
        }).lean() 
    
        if(!story){
           return  res.render('error/404')
        }
    
        if(story.user != req.user.id){
            res.redirect('/stories')
        }else{
            res.render('stories/edit',{
                story
            })
        }   
    } catch (error) {
        console.error(error)
        return res.render('error/500')
    }
})
        
        
// Update Story
//route PUT/stories/:id 
router.put('/:id', validateAuth, async (req,res) => {
    try {
        let story = await Story.findById(req.params.id).lean()

        if(!story) {
            return res.render('error/404')
        }
    
        if(story.user != req.user.id){
            res.redirect('/stories')
        }else{
            story = await Story.findOneAndUpdate({_id: req.params.id},req.body,{
                new: true,
                runValidators: true 
            })
    
            res.redirect('/dashboard') 
        }
    
    } catch (error) {
        console.error(error)
        return res.render('error/500')
    }
})
        

// Delete story
//route DELETE/stories/:id
router.delete('/:id', validateAuth, async (req,res) => {
    try {
        await Story.remove({_id:req.params.id})
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        return res.render('error/500')
    }
})

// User stories
//route GET/stories/user/:userId
router.get('/user/:userId', validateAuth, async (req,res) => {
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public'
        })
        .populate('user')
        .lean()

        res.render('stories/index',{
            stories
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})


module.exports = router

