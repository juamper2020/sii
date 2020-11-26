const { request, response } = require("express")
//se llama el modelo
const usuario=require('../models/usuarioModel');
//se crean los controladores
exports.verInicioSesion=async(request,response)=>{
    if(response.locals.usuarios.idUsuario){
        response.redirect('/inicio');
    }
    const {error} = response.locals.mensajes;
    response.render('inicioSesion',{
        error
    });
}

exports.registrarUsuario = (request, response)=>{
    response.render('registrarUsuario');
 
}
exports.verUsuarios=async(request,response)=>{
    listaUsuarios=await usuario.findAll();
    response.render('verUsuarios',{listaUsuarios});
}
exports.registrarUsuario = (request, response)=>{
    response.render('registrarUsuario');
 
}
exports.verFormularioRegistro = (request, response)=>{
    response.render('verFormUsuario');
 
}
exports.insertarUsuario=async(request,response)=>{
     const {txtNombre, txtCorreoElectronico, txtContrasenia} = request.body;
     try {
       await usuario.create({
            usuNombre:txtNombre, usuCorreoElectronico:txtCorreoElectronico, usuContrasenia:txtContrasenia
        });
        if(response.locals.usuarios.id){
            response.render('registrarUsuario',{mensaje:'¡Bien! Usuario registrado correctamente.'});
        }
        if(response.locals.usuarios.idUsuario){
            response.render('registrarUsuario',{mensaje:'¡Bien! Usuario registrado correctamente.'});
        }
        response.render('verFormUsuario',{mensaje:'¡Bien! Usuario registrado correctamente.'});
     } catch (error) {
        if(response.locals.usuarios.idUsuario){
            response.render('registrarUsuario',{
                errores: error.errors,
                txtNombre, 
                txtCorreoElectronico, 
                txtContrasenia
             });
        }
        response.render('verFormUsuario',{
           errores: error.errors,
           txtNombre, 
           txtCorreoElectronico, 
           txtContrasenia
        })
     }  
}