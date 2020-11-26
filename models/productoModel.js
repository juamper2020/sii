//impotacion de sequalize
const Sequelize=require('sequelize');
//conexion a la base de datos
const db=require('../config/db');
//url amigable
const slug=require('slug');
//id unico
const shortid=require('shortid');
const categoria=require('./categoriaModel');
const tipoVenta=require('./tipoVentaModel');
//definir la base de datos y las tablas
const productoModel=db.define('producto',{
    idProducto:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    proCodigo:{ 
        type:Sequelize.STRING(20),
        allowNull:false
    },
    proNombre:{ 
        type:Sequelize.STRING(100),
        allowNull:false
    },
    proPrecioCompra:{ 
        type:Sequelize.INTEGER(10),
        allowNull:false
    },
    proPrecioVenta:{ 
        type:Sequelize.INTEGER(10),
        allowNull:false
    },
    proCantidadActual:{ 
        type:Sequelize.INTEGER(4),
        allowNull:false
    },
    proStockMinimo:{ 
        type:Sequelize.INTEGER(4),
        allowNull:false
    },
    proStockMaximo:{ 
        type:Sequelize.INTEGER(4),
        allowNull:false
    },
    proDescripcion:{ 
        type:Sequelize.TEXT,
        allowNull:false
    },
    url:Sequelize.STRING,
    proFechaRegistro:{ 
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    proFechaActualizacion:{ 
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    }
},{
    hooks:{
        beforeCreate(producto){
            const url=slug(producto.proNombre).toLowerCase();
            producto.url=`${url}-${shortid.generate()}`;
        }
    },
    tableName: 'producto'
}
);
productoModel.belongsTo(categoria);
categoria.hasMany(productoModel);
productoModel.belongsTo(tipoVenta);
tipoVenta.hasMany(productoModel);
module.exports=productoModel;