const express = require('express');
const Router = express.Router();
const Category = require('../Categorias/CategoriesModels');
const Article = require('./ArtigoModel');
const slugify = require('slugify');

Router.get('/admin/artigos', (req,res)=>{
    Article.findAll({
        include:[{model: Category}]
    }).then((articles)=>{
        res.render('./admin/articles/index',{articles:articles});
    })
});

Router.get('/admin/artigos/new', (req,res)=>{
    Category.findAll().then((categories)=>{
        res.render("admin/articles/new", {categories: categories});
    })
})

Router.post('/articles/save', (req,res)=>{
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        CategoriaId: category
    }).then(()=> {
        res.redirect("/admin/artigos")
    })
})

module.exports = Router;