const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect:'/inicio',
    failureRedirect:'/',
    failureFlash: true,
    badRequestMessage: '¡Error! Ambos campos son obligatorios.'
});

exports.usuarioAutenticado = (request, response, next)=>{
    if(request.isAuthenticated()){
        return next();
    }
    return response.redirect('/');
}

exports.cerrarSesion = (request, response)=>{
    request.session.destroy(()=>{
        response.redirect('/');
    });
}

exports.verRecuperarContrasenia= (request, response)=>{
    response.render('recuperarContrasenia',{});
}

exports.recuperarContrasenia= (request, response)=>{
    response.redirect('/');
}