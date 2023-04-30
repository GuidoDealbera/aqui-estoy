const { CompanionShift } = require("../db"); 
const { Companion } = require("../db"); 

const getCompanionShiftById = async(req, res)=>{
    try {
        const { idShift } = req.params;
        const shift = await CompanionShift.findOne({
            where: { id: idShift },
            include: {
              model: Companion,
              through: { attributes: [] },
            },
        })
        
        res.status(200).json(shift);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = getCompanionShiftById;
