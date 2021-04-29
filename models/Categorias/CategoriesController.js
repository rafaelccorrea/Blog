const express = require('express');
const Router = express.Router();
const Categoria = require('./CategoriesModels')
const slugify = require('slugify')

Router.get('/admin/categorias/new', (req,res) => {
    res.render("admin/categories/new")
})


//Criando Categoria
Router.post('/categories/save',(req,res)=>{
    let title = req.body.title
    if(title != undefined){
        Categoria.create({
            title: title,
            slug: slugify(title)
        }).then(() =>{
            console.log("Categoria Criada!")
            res.redirect("/admin/categorias")
        }).catch((err) =>{
            res.send("Erro ao criar categoria!" + err)
        })

    }else{
        res.redirect("/admin/categorias/new")
    } 
})

//Listando Categoria
Router.get("/admin/categorias", (req,res) => {

    Categoria.findAll().then((categories) => {
        res.render("admin/categories/index", {categories: categories})
    })
})



//Deletando Categoria
Router.post("/categoria/delete",(req,res)=>{
    let id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Categoria.destroy({
                where: {
                    id:id
                }
            }).then(() => {
                res.redirect("/admin/categorias")
                
            }).catch((err) => {
                res.send("Erro ao deletar categoria" + err)
            })
        }else{
            res.redirect("/admin/categorias")
            console.log("Erro Não é um numero!")
        }
    }else{
        res.redirect("/admin/categorias")
        console.log("Erro id vazio!")
    }
})

//Edição de categoria

Router.get("/admin/categorias/edit/:id", (req,res)=>{
    let id = req.params.id
    if(isNaN(id)){
        res.redirect("/admin/categorias")
    }
    Categoria.findByPk(id).then((categoria)=>{
        if(id != undefined){
            res.render("admin/categories/edit", 
            {categoria: categoria});
        }else{
            res.redirect("/admin/categorias")
        }
    }).catch((err)=>{
        res.redirect("/admin/categorias")
    })
})

Router.post('/categorias/update', (req, res)=>{

    let id = req.body.id
    let title = req.body.title

    Categoria.update({title:title, slug: slugify(title)},{
        where: {
            id:id
        }
    }).then(()=>{
        res.redirect("/admin/categorias")
     })
})



module.exports = Router;