const express = require('express');
const Router = express.Router();
const Artigo = require('./ArtigoModel')

Router.get('/artigos', (req,res)=>{
    res.send("Artigos")
});

Router.get('/admin/artigos', (req,res)=>{
    res.send("Admin, artigos")
})

module.exports = Router;