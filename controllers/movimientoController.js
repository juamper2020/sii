const { request, response } = require("express")
//se llama el modelo
const usuario=require('../models/usuarioModel');
const movimiento=require('../models/movimientoModel');
const producto=require('../models/productoModel');
const categoria=require('../models/categoriaModel');
//se crean los controladores
exports.verMovimientoInventario=async(request,response)=>{
    const idUsuario = response.locals.usuarios.idUsuario;
    listaProductos=await producto.findAll({ include: categoria , required: true});
    listaMovimientos=await movimiento.findAll({ include: producto , required: true, where:{usuarioIdUsuario:idUsuario}});
    response.render('movimientoInventario',{listaProductos});
}
exports.verEntrada=async(request,response)=>{
    const datosProducto=await producto.findOne({
        where:{
            idProducto:request.params.idProducto
        }
    })
    if(!producto) return next();
    response.render('registrarEntrada',{datosProducto});
}
exports.verSalida=async(request,response)=>{
    const datosProducto=await producto.findOne({
        where:{
            idProducto:request.params.idProducto
        }
    })
    if(!producto) return next();
    response.render('registrarSalida',{datosProducto});
}
exports.insertarEntrada=async(request,response)=>{
    //se validan los campos del formulario
    const {idProducto,txtCantidadActual,txtCantidadEntra}=request.body;
    let errores=[];
    if(!txtCantidadEntra){
        errores.push({'texto':'¡Error! Cantidad entrada obligatoria.'});
    }
    if(errores.length>0){
        //se envian los errores
        const datosProducto=await producto.findOne({
            where:{
                idProducto:idProducto
            }
        })
        if(!producto) return next();
        response.render('registrarEntrada',{datosProducto,errores});
    }else{
        //se insertan los datos
        const productoInsertado= await movimiento.create({movCantidad:txtCantidadActual,
        movEntrada:txtCantidadEntra,usuarioIdUsuario:response.locals.usuarios.idUsuario,productoIdProducto:idProducto});
        const datosProducto=await producto.findOne({
            where:{
                idProducto:idProducto
            }
        })
        if(!producto) return next();
        response.render('registrarEntrada',{datosProducto,mensaje:'¡Bien! entrada registrada correctamente.'});
    }
}
exports.insertarSalida=async(request,response)=>{
    //se validan los campos del formulario
    const {idProducto,txtCantidadActual,txtCantidadSale}=request.body;
    let errores=[];
    if(!txtCantidadSale){
        errores.push({'texto':'¡Error! Cantidad salida obligatoria.'});
    }
    if(errores.length>0){
        //se envian los errores
        const datosProducto=await producto.findOne({
            where:{
                idProducto:idProducto
            }
        })
        if(!producto) return next();
        response.render('registrarSalida',{datosProducto,errores});
    }else{
        //se insertan los datos
        const productoInsertado= await movimiento.create({movCantidad:txtCantidadActual,
        movSalida:txtCantidadSale,usuarioIdUsuario:response.locals.usuarios.idUsuario,productoIdProducto:idProducto});
        const datosProducto=await producto.findOne({
            where:{
                idProducto:idProducto
            }
        })
        if(!producto) return next();
        response.render('registrarSalida',{datosProducto,mensaje:'¡Bien! salida registrada correctamente.'});
    }
}