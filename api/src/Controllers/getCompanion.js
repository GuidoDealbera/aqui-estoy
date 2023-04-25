const { Companion } = require("../db");

const getCompanion = async (req,res)=>{
    try{
        const results = await Companion.findAll();
        res.status(200).json(results)
    }
    catch(error){
        res.status(400).json({ error: 'Error al buscar datos' });
    }
}

module.exports = getCompanion;