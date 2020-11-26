const { request, response } = require("express")
//se llama el modelo
const producto=require('../models/productoModel');
const categoria=require('../models/categoriaModel');
const tipoVenta=require('../models/tipoVentaModel');
//se crean los controladores
exports.inicio=async(request,response)=>{
    listaCategoria=await categoria.findAll();
    listaTipoVenta=await tipoVenta.findAll();
    if(listaCategoria.length==0){
        await categoria.create({catDescripcion:"Nuevos"});
        await categoria.create({catDescripcion:"Estrella"});
        await categoria.create({catDescripcion:"Seguidores"});
        await categoria.create({catDescripcion:"Apoyo"});
        await categoria.create({catDescripcion:"Temporada"});
    }
    if(listaTipoVenta.length==0){
        await tipoVenta.create({tvDescripcion:"Menor"});
        await tipoVenta.create({tvDescripcion:"Mayor"});
        await tipoVenta.create({tvDescripcion:"Individual"});
        await tipoVenta.create({tvDescripcion:"Docena"});
    }
    response.render('index');
}
exports.registrarProducto=async(request,response)=>{
    listaCategoria=await categoria.findAll();
    listaTipoVenta=await tipoVenta.findAll();
    response.render('registrarProducto',{listaCategoria,listaTipoVenta});
}
exports.verProductos=async(request,response)=>{
    listaProductos=await producto.findAll({ include: categoria , required: true});
    response.render('verProductos',{listaProductos});
}
exports.insertarProducto=async(request,response)=>{
    //se validan los campos del formulario
    const {txtCodigo,txtNombre,selCategoria,selTipoVenta,txtPrecioCompra,
        txtPrecioVenta,txtCantidadActual,txtStockMinimo,txtStockMaximo,txtDescripcion}=request.body;
    let errores=[];
    if(!txtCodigo){
        errores.push({'texto':'¡Error! Código obligatorio.'});
    }
    if(!/^[a-záéíóúA-ZÁÉÍÓÚñÑ ]+$/.test(txtNombre)){
        errores.push({'texto':'¡Error! Solo se aceptan Letras A-Z, no caracteres especiales ni números'});

    }
    if(!txtNombre){
        errores.push({'texto':'¡Error! Nombre obligatorio.'});
    }
    if(!selCategoria){
        errores.push({'texto':'¡Error! Categoría obligatoria.'});
    }
    if(!selTipoVenta){
        errores.push({'texto':'¡Error! Tipo venta es obligatorio.'});
    }
    if(!txtPrecioCompra){
        errores.push({'texto':'¡Error! Precio compra es obligatorio.'});
    }
    if(!txtPrecioVenta){
        errores.push({'texto':'¡Error! Precio Venta es obligatorio.'});
    }
    if(!txtCantidadActual){
        errores.push({'texto':'¡Error! Cantidad actual es obligatoria.'});
    }
    if(!txtStockMinimo){
        errores.push({'texto':'¡Error! Stock mínimo es obligatorio.'});
    }
    if(!txtStockMaximo){
        errores.push({'texto':'¡Error! Stock máximo es obligatorio.'});
    }
    if(!txtDescripcion){
        errores.push({'texto':'¡Error! Descripción es obligatoria.'});
    }
    
    if(errores.length>0){
        //se envian los errores
        response.render('registrarProducto',{errores});
    }else{
        //se insertan los datos
        const productoInsertado= await producto.create({proCodigo:txtCodigo,proNombre:txtNombre,categoriumIdCategoria:selCategoria,tipoVentumIdTipoVenta:selTipoVenta,
            proPrecioCompra:txtPrecioCompra,proPrecioVenta:txtPrecioVenta,proCantidadActual:txtCantidadActual,
            proStockMinimo:txtStockMinimo,proStockMaximo:txtStockMaximo,proDescripcion:txtDescripcion});
            response.render('registrarProducto',{mensaje:'¡Bien! Producto registrado correctamente.'});

    }
}
exports.verProducto=async(request,response,next)=>{
    const verProducto=await producto.findOne({
        where:{
            idProducto:request.params.idProducto
        },
        include:[{ 
            model: categoria , 
            required: true
        },
        { 
            model: tipoVenta , 
            required: true
        }]
    })
    console.log(JSON.stringify(verProducto, null, 2));
    if(!producto) return next();
    response.render('verProducto',{verProducto});
}
exports.editarProducto=async(request,response,next)=>{
    const productoEditar=await producto.findOne({
        where:{
            idProducto:request.params.idProducto
        }
    })
    if(!producto) return next();
    response.render('editarProducto',{productoEditar});
}
exports.actualizarProducto=async(request,response)=>{
    //se validan los campos del formulario
    const {txtCodigo,txtNombre,selCategoria,selTipoVenta,txtPrecioCompra,
        txtPrecioVenta,txtCantidadActual,txtStockMinimo,txtStockMaximo,txtDescripcion}=request.body;
    let errores=[];
    if(!txtCodigo){
        errores.push({'texto':'¡Error! Código obligatorio.'});
    }
    if(!/^[a-záéíóúA-ZÁÉÍÓÚñÑ ]+$/.test(txtNombre)){
        errores.push({'texto':'¡Error! Solo se aceptan Letras A-Z, no caracteres especiales ni números'});

    }
    if(!txtNombre){
        errores.push({'texto':'¡Error! Nombre obligatorio.'});
    }
    if(!selCategoria){
        errores.push({'texto':'¡Error! Categoría obligatoria.'});
    }
    if(!selTipoVenta){
        errores.push({'texto':'¡Error! Tipo venta es obligatorio.'});
    }
    if(!txtPrecioCompra){
        errores.push({'texto':'¡Error! Precio compra es obligatorio.'});
    }
    if(!txtPrecioVenta){
        errores.push({'texto':'¡Error! Precio Venta es obligatorio.'});
    }
    if(!txtCantidadActual){
        errores.push({'texto':'¡Error! Cantidad actual es obligatoria.'});
    }
    if(!txtStockMinimo){
        errores.push({'texto':'¡Error! Stock mínimo es obligatorio.'});
    }
    if(!txtStockMaximo){
        errores.push({'texto':'¡Error! Stock máximo es obligatorio.'});
    }
    if(!txtDescripcion){
        errores.push({'texto':'¡Error! Descripción es obligatoria.'});
    }
    
    if(errores.length>0){
        //se envian los errores
        const productoEditar=await producto.findOne({
            where:{
                idProducto:request.params.idProducto
            }
        })
        if(!producto) return next();
        response.render('editarProducto',{productoEditar,errores});
    }else{
        //se actualizan los datos
        const productoInsertado= await producto.update({proCodigo:txtCodigo,proNombre:txtNombre,categoriumIdCategoria:selCategoria,tipoVentumIdTipoVenta:selTipoVenta,
            proPrecioCompra:txtPrecioCompra,proPrecioVenta:txtPrecioVenta,proCantidadActual:txtCantidadActual,
            proStockMinimo:txtStockMinimo,proStockMaximo:txtStockMaximo,proDescripcion:txtDescripcion},
            {
                where: {idProducto:request.params.idProducto}
            });
            listaProductos=await producto.findAll({ include: categoria , required: true});
            response.render('verProductos',{listaProductos,mensaje:'¡Bien! Producto actualizado correctamente.'});
    }
}
exports.eliminarProducto=async(request,response,next)=>{
    const {urlProducto}=request.query;
    const resultado=await producto.destroy({
        where:{
            url:urlProducto
        }
    })
    response.status(200).send('¡Bien! Producto eliminado correctamente.');
}