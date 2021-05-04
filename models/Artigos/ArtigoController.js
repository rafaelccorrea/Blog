const express = require('express');
const Router = express.Router();
const Category = require('../Categorias/CategoriesModels');
const Article = require('./ArtigoModel');
const slugify = require('slugify');
const adminAuth = require('../../middlewares/adminAuth')

//Listando um artigo
Router.get('/admin/artigos', adminAuth, (req,res)=>{
    Article.findAll({
        include:[{model: Category}]
    }).then((articles)=>{
        res.render('./admin/articles/index',{articles:articles});
    })
});

Router.get('/admin/artigos/new', adminAuth, (req,res)=>{
    Category.findAll().then((categories)=>{
        res.render("admin/articles/new", {categories: categories});
    })
})


//Criando um artigo
Router.post('/articles/save', adminAuth, (req,res)=>{
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

//Deletando Artigo
Router.post("/artigo/delete", adminAuth,(req,res)=>{
    let id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id:id
                }
            }).then(() => {
                res.redirect("/admin/artigos")
                
            }).catch((err) => {
                res.send("Erro ao deletar artigo" + err)
            })
        }else{
            res.redirect("/admin/artigos")
            console.log("Erro Não é um numero!")
        }
    }else{
        res.redirect("/admin/artigos")
        console.log("Erro id vazio!")
    }
});

//Rota de edicao
Router.get("/artigo/edit/:id", adminAuth, (req,res)=>{
    let id = req.params.id
    Article.findByPk(id).then((article)=>{
        if(article != undefined){
            Category.findAll().then((category)=>{
                res.render("admin/articles/edit", {category: category, article: article})
            })
        }else{
            res.redirect('/')
        }
    }).catch(()=>{
        res.redirect("/")
    })
})

//Update edicao
Router.post('/artigo/update', adminAuth,(req,res)=>{
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.update({ title: title, body: body, CategoriaId: category, slug:slugify(title)}, { 
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/artigos')
    }).catch((err)=>{
        res.redirect("/")
    })
})

//Paginacao
Router.get("/articles/page/:num", (req, res)=>{
    let page = req.params.num;
    let offset = 0;
    if(isNaN(page || page == 1)){
        offset = 0;
    }else{
        offset = (parseInt(page) - 1) * 4 ;
    }
    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order:[
            ['id', 'DESC']
        ]
    }).then((articles)=>{
        let next;
        if(offset + 4 >= articles.count ){
            next = false;
        }else{
            next = true;
        }
        let result = {
            next: next,
            page: parseInt(page),
            articles: articles,
        }
        Category.findAll().then((categories)=>{
            res.render("admin/articles/page", {result: result, categories: categories})
        });
    })
})





module.exports = Router;