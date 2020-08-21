const express = require('express')
const path = require('path')
const adminRouter = require('./routes/admin.routes')
const userRouter = require('./routes/user.routes')
const bodyParser = require('body-parser').urlencoded({extended:true})
const mongoose = require('mongoose')
const multer = require('multer')
const articleModel = require('./model/index.model')

const app = express()

app.set('view engine','ejs')
app.use(bodyParser)
app.use(express.static(path.join(__dirname,'assets')))
app.use('/uploads', express.static(path.join(__dirname,'uploads')))



var storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'uploads/articles_images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
})

function fileFilter (req, file, cb) {
    if(file.mimetype==="image/png" ||file.mimetype==="image/jpg"||file.mimetype==="image/jpeg")
    {
        cb(null, true)

    }else 
    {
        cb(null, false)

    }  
}

var uploadAdd = multer({dest:'uploads/articles_images',storage,fileFilter,}).single('imageAdd')

app.use(uploadAdd)


// ========================================== VIEW ARTICLE ==========================================>>

app.get('/article/:id',async(req,res)=>
{
    let article_id = req.params.id
    let article_datails = await articleModel.findById(article_id)
    let admin = false
    res.render('article',{article_datails, admin})
})

// ==================================================================================================>>

app.use(adminRouter)
app.use(userRouter)
mongoose.connect('mongodb+srv://devo:tavo@devo.fddan.mongodb.net/blogDB', { useUnifiedTopology: true , useNewUrlParser: true})
app.listen(process.env.PORT||3003 , ()=>{
    console.log(`Server Is Running ....`);
})