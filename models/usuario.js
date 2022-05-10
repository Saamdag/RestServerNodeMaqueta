const {Schema,model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required: [true,'El nombre es obligatorio']
    },
    password:{
        type:String,
        required: [true,'La contraseña es obligatorio']
    },
    correo:{
        type:String,
        required: [true,'El correo es obligatorio'],
        unique:true
    },
    imagen:{
        type:String,
    },
    estado:{
        type:Boolean,
        default:true
    },
    rol:{
        type:String,
        required: [true,'El rol es obligatorio'],
        emun : ['ADMIN_ROLE','USER_ROLE']
    },
    google: {
        type:Boolean,
        default:false
    }
})

//sacar contraseña Del post
UsuarioSchema.methods.toJSON = function (){
    const { password,__v,...usuario} = this.toObject();
    return usuario;
}


module.exports = model('Usuario',UsuarioSchema);




