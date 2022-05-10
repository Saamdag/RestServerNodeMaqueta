const { response, request } = require('express');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcrypt-nodejs'); 
const Usuario = require('../models/usuario');
const { query } = require('express');


const usuariosGet = async(req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { limite=5, desde=0 }= req.query 
    const query = {estado: true}//Condicion

    /*const usuarios = await Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

    const total = await Usuario.countDocuments(query);
*/              //Lo hago en promesas para que se ejecuten simultaneamente

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
       total,
        usuarios

    });
}

const usuariosPost = async (req, res = response) => {

    
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    
    ///Verificar si el correo existe
    /*const existeEmail = await Usuario.findOne({correo:correo})
    if(existeEmail){
        return res.status(400).json({
            msg:'El correo ya esta registrado'
        });
    }*/

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt);
    //Guardar BD
    await usuario.save();
    
    res.json({
        msg: 'post API - usuariosPost',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const {_id,password,google,correo, ...resto } = req.body;
    //Validar contra BD
    if(password){
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto );

    res.json({usuario});
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;
    const query = {estado: false}//Condicion
    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);
    //No se recomienda borrarlo fisicamente porque puede romper la integridad referencial

    const usuario = await Usuario.findByIdAndUpdate(id,query);

    res.json({
        msg: 'delete API - usuariosDelete',
        id,
        usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}