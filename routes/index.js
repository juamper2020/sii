//se hace la importacion de express
const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const productoController=require('../controllers/productoController');
const usuarioController=require('../controllers/usuarioController')
const movimientoController=require('../controllers/movimientoController')
const authController=require('../controllers/authController')
//se crean las rutas
module.exports=function() {
    router.get('/',usuarioController.verInicioSesion);
    router.get('/verFormularioRegistro',usuarioController.verFormularioRegistro);
    router.post('/insertarUsuario',usuarioController.insertarUsuario);
    router.post('/autenticarUsuario',authController.autenticarUsuario);
    router.get('/verRecuperarContrasenia',authController.verRecuperarContrasenia);
    router.post('/recuperarContrasenia',authController.recuperarContrasenia);
    router.get('/cerrarSesion',authController.cerrarSesion);
    router.get('/inicio',authController.usuarioAutenticado,productoController.inicio);
    router.get('/registrarProducto',authController.usuarioAutenticado,productoController.registrarProducto);
    router.get('/verProductos',authController.usuarioAutenticado,productoController.verProductos);
    router.get('/verMovimientoInventario',authController.usuarioAutenticado,movimientoController.verMovimientoInventario);
    router.post('/insertarProducto',authController.usuarioAutenticado,productoController.insertarProducto);
    router.get('/verProducto/:idProducto',authController.usuarioAutenticado,productoController.verProducto);
    router.get('/editarProducto/:idProducto',authController.usuarioAutenticado,productoController.editarProducto);
    router.post('/actualizarProducto/:idProducto',authController.usuarioAutenticado,productoController.actualizarProducto);
    router.delete('/eliminarProducto/:url',authController.usuarioAutenticado,productoController.eliminarProducto);

    router.get('/verEntrada/:idProducto',authController.usuarioAutenticado,movimientoController.verEntrada);
    router.get('/verSalida/:idProducto',authController.usuarioAutenticado,movimientoController.verSalida);
    router.post('/insertarEntrada',authController.usuarioAutenticado,movimientoController.insertarEntrada);
    router.post('/insertarSalida',authController.usuarioAutenticado,movimientoController.insertarSalida);

    router.get('/registrarUsuario',authController.usuarioAutenticado,usuarioController.registrarUsuario);
    router.get('/verUsuarios',authController.usuarioAutenticado,usuarioController.verUsuarios);
    return router;
}

