const Sequelize = require('sequelize');
const connection = require('../../database/database');
const Category = require('../Categorias/CategoriesModels');

const Article = connection.define('Artigo', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },

    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },

    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article);
Article.belongsTo(Category);


Article.sync({force: false}).then(() =>{
    console.log('Tabela Artigo criada')
}).catch(err =>{
    console.log('Tabela ERROR!' + err)
});

module.exports = Article;