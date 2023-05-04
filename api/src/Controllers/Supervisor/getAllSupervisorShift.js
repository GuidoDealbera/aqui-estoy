const { Supervisor, SupervisorShift } = require("../../db");

const getAllSupervisorShift = async (req,res)=>{
    try {
        const response = await Supervisor.findAll({
            include: [{
                model: SupervisorShift,
                attributes: ['id', 'day', 'time', 'timezone'],
                through: { attributes: [] },
                required: true
            }]
        });
          res.status(200).json(response);

    } catch (error) {
        res.status(500).send("Error del servidor al obtener turnos de supervisores")
    }
   
}
module.exports = getAllSupervisorShift;