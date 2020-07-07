//rutas para crear usuarios
//router
const router = require("express").Router();
//controlador
const passport = require('passport')
const { authGoogle } = require("../controllers/usuarioGoogleController");
const jwt = require("jsonwebtoken");
//express validator


//crea un usuario
router.get("/auth/google/callback",passport.authenticate("sign-in-google", {scope: ['https://www.googleapis.com/auth/plus.login']}),
  function async (req, res) {
    
    if (req.user) {
      const usuario = req.user
      console.log("desde las rutas",usuario)
      const payload = {
        usuario : {
            id: usuario._id
        }
    }
    //firmar token 
    //este es el que tengo abierto
    jwt.sign(payload , process.env.SECRETA ,{
        expiresIn: 3600 //hora
    },async(err , token )=> {
        if (err) {
            throw err
        }
        console.log(token);
    
        
        await res.cookie('token', token)   
        res.redirect('http://localhost:3000/Spinner')     
    })
    } else {
      res.redirect('http://localhost:3000')
    }
  }
);

module.exports = router;
