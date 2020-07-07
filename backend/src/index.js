
//dependencias
const express = require('express');
const passport = require("passport")
//config de la base de datos
const app = express()
const cors = require('cors')

app.use(express.json({extended : true }))
require('./config/database')


//middlewares
app.use(cors());
app.use(passport.initialize())
//definir rutas
app.use('/usuarios', require('./routes/usuarios'))
app.use('/auth', require('./routes/auth'))
app.use('/proyectos', require('./routes/proyectos'))
app.use('/tareas', require('./routes/tareas'))
app.use('/', require('./routes/googleAuth'))



//appp en el puerto :
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'),'0.0.0.0', ()=> {
    console.log('servidor en el puerto ', app.get('port'));
    })


    