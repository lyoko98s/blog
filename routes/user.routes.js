const userRouter = require('express').Router()
const articleModel = require('../model/index.model')

userRouter.get('/',async(req,res)=>{
    let articles_data = await articleModel.find()
    let admin = false
    res.render('index',{articles_data, admin})
})

userRouter.get('/search',async(req,res)=>
{
    let searchTerm = req.query.searchTerm
    console.log(searchTerm)
    let articles_data = await articleModel.find({title: {$regex: searchTerm}})
    console.log(articles_data)
    let admin = false
    res.render('index',{articles_data, admin})
})



module.exports = userRouter