
const passport = require('passport');
const LocalStrategy = require('passport-local');
const usuarios = require('../models/usuarioModel');
passport.use(
    new LocalStrategy({
        usernameField:'txtCorreoElectronico',
        passwordField:'txtContrasenia'
    },
        async(email, password, done)=>{
            try {
              const usuario = await usuarios.findOne(
                  {
                      where:{usuCorreoElectronico:email}
                  }
              );  
              if(!usuario.verificarPassword(password)){
                  return done(null, false, {
                      message: '¡Error! Contraseña Incorrecta.'
                  });
              }
              return done(null, usuario);
            } catch (error) {
                return done(null, false,{
                    message: '¡Error! La cuenta no existe.'
                });
            }
        }
    )
)

passport.serializeUser((usuario, callback)=>{
    callback(null, usuario);
});

passport.deserializeUser((usuario, callback)=>{
    callback(null, usuario);
});

module.exports= passport;
