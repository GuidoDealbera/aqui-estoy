const { Supervisor, SupervisorShift } = require("../../db");
const deleteSupervisorShift = async (req, res) => {
  try {
    const { id, idShift } = req.body;
    let supervisor = await Supervisor.findOne({ where: { id: id } , include: { model: SupervisorShift} });
     await supervisor.removeSupervisorShift(idShift);
      supervisor.save();
      supervisor = await Supervisor.findOne({ where: { id: id } , include: { model: SupervisorShift} });
      return res.status(200).json(supervisor);   
    } catch (error) {
   return res.status(400).json(error.message);
  }
};
module.exports = deleteSupervisorShift;
