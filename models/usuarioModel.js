//impotacion de sequalize
const Sequelize=require('sequelize');
//conexion a la base de datos
const db=require('../config/db');
const bcrypt = require('bcrypt-nodejs');
//url amigable
const slug=require('slug');
//id unico
const shortid=require('shortid');
//definir la base de datos y las tablas
const usuarioModel=db.define('usuario',{
    idUsuario:{
        type:Sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    usuNombre:{ 
        type:Sequelize.STRING(100),
        allowNull:false
    },
    usuCorreoElectronico:{ 
        type: Sequelize.STRING(60),
        allowNull:false,
        validate:{
           isEmail:{
               msg:'¡Error! Agrega un Correo electrónico Válido.' 
           },
           notEmpty:{
            msg:'¡Error! El Correo electrónico no puede ir vacío.'
           }
        },
        unique:{
            args: true,
            msg:'¡Error! Usuario ya Registrado.'
        }
    },
    usuContrasenia:{ 
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty:{
                msg:'¡Error! La contraseña no puede ir vacía.'
            }
        }
    },
    url:Sequelize.STRING,
    usuFechaRegistro:{ 
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    usuFechaActualizacion:{ 
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    }
},{
    hooks:{
        beforeCreate(usuario){
            usuario.usuContrasenia = bcrypt.hashSync(usuario.usuContrasenia, bcrypt.genSaltSync(10));
            const url=slug(usuario.usuNombre).toLowerCase();
            usuario.url=`${url}-${shortid.generate()}`;
        }
    },
    tableName: 'usuario'
}
);

usuarioModel.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.usuContrasenia);
}

module.exports=usuarioModel;