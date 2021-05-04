const express = require('express');
const Router = express.Router();
const User = require('./UserModel')
const bcrypt = require('bcryptjs');


Router.get('/admin/users', (req, res) =>{
        User.findAll().then((users) =>{
            res.render("admin/users/index", {users: users})
        })
})

Router.get('/admin/users/create', (req, res) =>{
    res.render("admin/users/create")
})

Router.post('/users/create', (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        where: {
            email: email
        }
    }).then((user)=>{
        if(user == undefined){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
         User.create({
            email: email,
            password: hash
        }).then(()=>{
            res.redirect("/")
        }).catch((err)=>{
            res.redirect("/")
        })
        }else{
            res.redirect("/admin/users/create")
        }
    })
});

Router.get("/admin/login", (req, res)=>{
    res.render("admin/users/login");
});


Router.post("/authenticate", (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        where: {
            email: email
        }
    }).then((user)=>{
        if(user != undefined){
            let correct = bcrypt.compareSync(password, user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email                    
                }
                res.redirect("/admin/artigos")
            }else{
                res.redirect("/admin/login")
            }
        }else{
            res.redirect("/admin/login");
        }
    })
})

Router.get("/admin/Logout", (req, res)=>{
    req.session.user = undefined;
    res.redirect("/")
})


module.exports = Router;