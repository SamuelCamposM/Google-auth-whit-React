const {model , Schema} = require('mongoose')   

const Proyecto = new Schema({
    nombre:{
        type: String,
        required: true,
        trim : true

    },
    creador : {
       type : String,
       ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    },

})

module.exports = model('Proyecto', Proyecto)