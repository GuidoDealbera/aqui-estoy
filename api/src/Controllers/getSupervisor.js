const { Supervisor } = require("../db");

const getSupervisor = async (req,res)=>{
    try{
        const results = await Supervisor.findAll();
        res.status(200).json(results)
    }
    catch(error){
        res.status(400).json({ error: 'Error al buscar datos' });
    }
}

module.exports = getSupervisor;