const {CompanionShift} = require("../../db");

const putCompanionShifts = async (req, res) => {
    try {
      const { idShift, maxCompanions } = req.body;
      if (!maxCompanions) {
        res.status(401).json("No se asignó ningun valor máximo");
      }
      
      if (idShift) {
        const shift = await CompanionShift.findByPk(idShift);
        shift.maxCompanions = maxCompanions;
        shift.hasRules = true;
        await shift.save();
        const shifts = await CompanionShift.findAll({
          order: [['id', 'ASC']]
        });
       return res.json(shifts);
      } else {
          const shifts = await CompanionShift.findAll({
              order: [['id', 'ASC']]
            });
        const response =  shifts.map((shift) => {
          if (!shift.hasRules) {
            shift.maxCompanions = maxCompanions;
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
  
  module.exports = putCompanionShifts;