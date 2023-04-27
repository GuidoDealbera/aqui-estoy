const { Supervisor } = require("../db");

//Controlador para traer todos los Supervisores de la bd
const getSupervisor = async (req,res)=>{
    try{
        //Buscar todos los Supervisores guardados en bd
        const results = await Supervisor.findAll();
        //Retorna todos los supervisores como un array de objetos
        res.status(200).json(results)
    }
    catch(error){
        res.status(400).json({ error: 'Error al buscar datos' });
    }
}

module.exports = getSupervisor;