//Conectar la app a db

const mongoose= require('mongoose');

const dbConnection = async() =>{

    try {

         await mongoose.connect( process.env.mongoDB_atlas ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
         })
         console.log('Base de datos online');

    } catch (error) {
        console.log(error)
        throw new error ('Error a la hora de iniciar DB')
    }

}

module.exports = {
    dbConnection
}