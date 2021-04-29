const Sequelize = require('sequelize');
const connection = require('../../database/database')

const Category =  connection.define('Categorias', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },

    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


Category.sync({force: false}).then(() => {
    console.log('Tabela Categoria Criada com sucesso!')
}).catch((err) => {
    console.log('Tabela Categoria ERROR!' + err)
})



module.exports = Category;