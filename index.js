//se hace la importacion de express
const express=require('express');
const { request, response } = require('express');
//se incluye las rutas
const routes=require('./routes');
//path para las vistas
const path=require('path');
//se requiere para enviar los datos por post
const bodyParser=require('body-parser');
const helpers= require('./helpers');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser=require('cookie-parser');
const passport = require('./config/passport');
require('dotenv').config({path:'variables.env'});
//llamar la conexion a la db
require('./models/categoriaModel');
require('./models/tipoVentaModel');
require('./models/movimientoModel');
require('./models/productoModel');
require('./models/usuarioModel');
const db=require('./config/db');
db.sync().then(()=>console.log('Conectado a la base de datos.')).catch(error=>console.log(error));
//se inicializa express
const app=express();
//implementar body-parser
app.use(bodyParser.urlencoded({extended:true}));
//ruta para los estilos
app.use('/',express.static('public'));
//template para las vistas
app.set('view engine','pug');
//direccionamiento hacia las vistas
app.set('views',path.join(__dirname,'./views'));
//invocar flash
app.use(flash());
//manejo de sesiones
app.use(cookieParser());
app.use(session({
    secret:'Secreto',
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
//middleware
app.use((request,response,next)=>{
    response.locals.vardump=helpers.vardump;
    response.locals.mensajes= request.flash();
    response.locals.usuarios = {...request.user} || null;
    next();
})
//ruta para el inicio
app.use('/',routes());

//puerto a escuchar para el servidor
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//levantar el servidor
app.listen(4000);