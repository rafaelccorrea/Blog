const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database')
const Categorias = require('./models/Categorias/CategoriesController')
const Artigos = require('./models/Artigos/ArtigoController')
const CategoriaModels = require('./models/Categorias/CategoriesModels')
const ArtigosModels = require('./models/Artigos/ArtigoModel')

//Conexão Banco de Dados
connection.authenticate().then(() =>{
    console.log('Connect Database');
}).catch(err =>{
    console.log('Connection Lost' + err)
});

//Config BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Config Ejs => Html
app.set('view engine', 'ejs');
//Static Config
app.use(express.static('public'));


//Rotas
app.get('/', (req, res) =>{
    res.render("index")
})

app.use('/', Categorias);
app.use('/', Artigos);





//Servidor
app.listen(8081, (req,res) => {
    console.log("Servidor Online!")
})