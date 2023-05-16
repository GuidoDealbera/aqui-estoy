const {SupervisorShift} = require("../../db");

const putSupervisorShifts = async (req, res) => {
  try {
    const { idShift, maxSupervisors } = req.body;
    if (!maxSupervisors) {
      res.status(401).json("No se asignó ningun valor máximo");
    }
    
    if (idShift) {
      const shift = await SupervisorShift.findByPk(idShift);
      shift.maxSupervisors = maxSupervisors;
      shift.hasRules = true;
      await shift.save();
      const shifts = await SupervisorShift.findAll({
        order: [['id', 'ASC']]
      });
     return res.json(shifts);
    } else {
        const shifts = await SupervisorShift.findAll({
            order: [['id', 'ASC']]
          });
      const response =  shifts.map((shift) => {
        if (!shift.hasRules) {
          shift.maxSupervisors = maxSupervisors;
          shift.save();
        }
        return shift
      });
     return res.json(response);
    }
  } catch (error) {
    res.status(500).json("Fallo al hacer un put");
  }
};

module.exports = putSupervisorShifts;
