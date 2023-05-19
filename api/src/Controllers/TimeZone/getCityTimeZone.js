const { CityTimeZone } = require("../../db");

const getCityTimeZone = async (req, res) => {
    try {
        const results = await CityTimeZone.findAll()
       return res.json(results)
    } catch (error) {
       return res.status(500).send("Error del servidor al obtener zonas horarias")
    }
}
module.exports = getCityTimeZone;