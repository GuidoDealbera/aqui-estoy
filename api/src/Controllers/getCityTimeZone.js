const { CityTimeZone } = require("../db");

const getCityTimeZone = async (req, res) => {
    try {
        const results = await CityTimeZone.findAll()
        res.json(results)
    } catch (error) {
        res.status(500).send("Error del servidor al obtener zonas horarias")
    }
}
module.exports = getCityTimeZone;