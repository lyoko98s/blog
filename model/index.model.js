const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title : {type:String},
    imgURL: {type:String},
    post: {type:String},
    date: {type:String}
})

const articleModel = mongoose.model('article',articleSchema)

module.exports = articleModel