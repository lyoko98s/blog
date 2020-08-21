const userRouter = require('express').Router()
const articleModel = require('../model/index.model')

userRouter.get('/',async(req,res)=>{
    let articles_data = await articleModel.find()
    let admin = false
    res.render('index',{articles_data, admin})
})



module.exports = userRouter