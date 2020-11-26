//impotacion de sequalize
const Sequelize=require('sequelize');
//conexion a la base de datos
const db=require('../config/db');
//url amigable
const slug=require('slug');
//id unico
const shortid=require('shortid');
//definir la base de datos y las tablas
const categoriaModel=db.define('categoria',{
    idCategoria:{
        type:Sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    catDescripcion:{ 
        type:Sequelize.STRING(100),
        allowNull:false
    },
    catFechaRegistro:{ 
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    }
},{
    tableName: 'categoria'
}
);
module.exports=categoriaModel;