const adminRouter = require('express').Router()
const articleModel = require('../model/index.model')
const multer = require('multer')

adminRouter.get('/dashboard',async(req,res)=>{
    let articles_data = await articleModel.find()
    let admin = true
    res.render('dashboard',{articles_data, admin})
})

// ========================================== ADD ARTICLE ==========================================>>

adminRouter.get('/add_article',async(req,res)=>
{
    let error = false
    let admin = true
    res.render('add_article', {error, admin})
})

adminRouter.post('/confirmAdd',async(req,res)=>
{
    if(req.file==undefined)
    {
        let error = true
        let admin = true
        res.render('add_article',{error, admin})
    }
    else
    {
        let title = req.body.title
        let post = req.body.post
        let imgURL = req.file.path
        let date = new Date().toLocaleString()
        await articleModel.insertMany({title,imgURL,post,date})
        res.redirect('/dashboard')
    }    
})

// ========================================== EDIT ARTICLE ==========================================>>

adminRouter.get('/edit/:id',async(req,res)=>
{
    let error = false
    let article_id = req.params.id
    let article_data = await articleModel.findById(article_id)
    let admin = true
    res.render('edit_article',{article_data, error, admin})
})

adminRouter.post('/confirmEdit/:id',async(req,res)=>
{
    

    if(req.file==undefined)
    {
        let error = true
        let article_id = req.params.id
        let article_data = await articleModel.findById(article_id)
        let admin = true
        res.render('edit_article',{article_data,error, admin})
    }
    else
    {
        let _id = req.params.id
        let title = req.body.title
        let post = req.body.post
        let imgURL = req.file.path
        let date = new Date().toLocaleString()
        await articleModel.findByIdAndUpdate({_id},{title,imgURL,post,date})
        res.redirect('/dashboard')
    }
})

// ========================================== DELETE ARTICLE ==========================================>>

adminRouter.get('/delete/:id',async(req,res)=>
{
    let _id = req.params.id
    let article_id = await articleModel.findByIdAndDelete({_id})
    res.redirect('/dashboard')
})

// ========================================== SEARCH ARTICLE ==========================================>>

adminRouter.get('/dashboard/search',async(req,res)=>
{
    let t = req.query.searchTerm
    //let tr = '/' + t + '/'
    console.log(t);
    let articles_data = await articleModel.find({title: /t/})
    let admin = true
    res.render('dashboard',{articles_data, admin})
})




module.exports = adminRouter