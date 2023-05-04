const {SupervisorShift} = require("../../db");
const { Supervisor } = require("../../db");

const assignSupervisorShift = async (req, res) => {
    try {
      const { idSupervisor } = req.params;
      const supervisor = await Supervisor.findOne({ where: { id: idSupervisor } });
      const { idShift, rol } = req.body;
      const shift = await SupervisorShift.findOne({ where: { id: idShift } });

    
     await supervisor.addSupervisorShifts(shift);
     const updatedSupervisor = await Supervisor.findOne({
            where: { id: idSupervisor},
            include: [{ model: SupervisorShift ,  through: { attributes: [] }}],
          });
          const response = {
            ...supervisor.toJSON(),
            rol: rol,
          };
     res.json(response);
        

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al asignar turno");
      }
    };


module.exports= assignSupervisorShift;