//impotacion de sequalize
const Sequelize=require('sequelize');
//conexion a la base de datos
const db=require('../config/db');
//url amigable
const slug=require('slug');
//id unico
const shortid=require('shortid');
const usuario=require('./usuarioModel');
const producto=require('./productoModel');
const productoModel = require('./productoModel');
//definir la base de datos y las tablas
const movimientoModel=db.define('movimiento',{
    idMovimiento:{
        type:Sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    movCantidad:{ 
        type:Sequelize.INTEGER(4),
        allowNull:false,

    },
    movEntrada:{ 
        type:Sequelize.CHAR(1),
        allowNull:true
    },
    movSalida:{ 
        type:Sequelize.CHAR(1),
        allowNull:true
    },
    movFechaRegistro:{ 
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    }
},{
    tableName: 'movimiento'
}
);
movimientoModel.belongsTo(usuario);
usuario.hasMany(movimientoModel);
movimientoModel.belongsTo(producto);
productoModel.hasMany(movimientoModel);
module.exports=movimientoModel;