const { Supervisor } = require("../db");
const bcrypt = require("bcrypt");

const getOneSupervisor = async (req,res) =>{
    try{
        const {email, password} = req.body;
        const supervisor = await Supervisor.findOne({where: {email}});
        const match = await bcrypt.compare(password, supervisor.password);

        if (supervisor && match) {
            return res.status(200).json({supervisor});
          }else{
            res.status(400).json('Supervisor no encontrado')
          }
    }    
    catch(error){
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


  module.exports = getOneSupervisor;