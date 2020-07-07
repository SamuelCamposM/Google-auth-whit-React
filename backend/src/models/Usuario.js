const {Schema, model } = require('mongoose')

const UsuarioSchema = new Schema ({
 nombre :{
      type:String,
      
      trim : true 
 },
 email: {
    type:String,
    
    trim : true ,
    unique :true
 },
 password: {
    type:String,
    
    trim : true 
 },
 registro: {
    type:Date,
    default : Date.now()
  
 },
 avatar:String,
 _id:String

})

module.exports = model('Usuario', UsuarioSchema);