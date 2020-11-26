//impotacion de sequalize
const Sequelize=require('sequelize');
//conexion a la base de datos
const db=require('../config/db');
//url amigable
const slug=require('slug');
//id unico
const shortid=require('shortid');
//definir la base de datos y las tablas
const tipoVentaModel=db.define('tipo_venta',{
    idTipoVenta:{
        type:Sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    tvDescripcion:{ 
        type:Sequelize.STRING(100),
        allowNull:false
    },
    tvFechaRegistro:{ 
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    }
},{
    tableName: 'tipo_venta'
}
);
module.exports=tipoVentaModel;