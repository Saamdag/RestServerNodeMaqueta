const Role = require('../models/rol');
const Usuario = require('../models/usuario')

const esRoleValido = async (rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error('El rol '+ rol + ' no esta registrado en db')
    }
}

const emailExiste =  async (correo = '') =>{

    const existeEmail = await Usuario.findOne({correo:correo})
    if(existeEmail){
       throw new Error(`El correo ${correo} ya fue utilizado`)
    };
}
const existeUsuarioPorId =  async (id ) =>{

    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
       throw new Error(`El ID  no existe`)
    };
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}








