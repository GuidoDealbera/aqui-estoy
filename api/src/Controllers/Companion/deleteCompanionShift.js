const { Companion , CompanionShift} = require("../../db");
const deleteCompanionShift = async (req, res) => {
  try {
    const { id, idShift } = req.body;
    let companion = await Companion.findOne({ where: { id: id } , include: { model: CompanionShift} });
     await companion.removeCompanionShift(idShift);
      companion.save();
      companion = await Companion.findOne({ where: { id: id } , include: { model: CompanionShift} });
    
      return res.status(200).json(companion);   
 
    } catch (error) {
   return res.status(400).json(error.message);
  }
};
module.exports = deleteCompanionShift;
