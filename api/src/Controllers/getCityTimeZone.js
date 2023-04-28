const { CityTimeZone } = require("../db");

//recupera todas las time zones de la base de datos y las devuelve un array de objetos del tipo:
// {"id": "6a522905-8dc9-4bdc-84b1-af7f23514217", "zoneName": "Africa/Abidjan","offSet": "UTC+00:00"}

const getCityTimeZone = async (req, res) => {
    try {
        const results = await CityTimeZone.findAll()
        res.json(results)
    } catch (error) {
        res.status(500).send("Error del servidor al obtener zonas horarias")
    }
}
module.exports = getCityTimeZone;