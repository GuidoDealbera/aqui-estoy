const Supervisor = require("../Models/Supervisor");
const putSupervisor = async (req, res) => {
  const {
    name,
    lastName,
    profilePhoto,
    birthdayDate,
    nationality,
    country,
    cityTimeZone,
    phone,
    profession,
    studies,
    gender,
  } = req.body;
  const { id } = req.params;
  try {
    const result = await Supervisor.update(
      {
        name,
        lastName,
        profilePhoto,
        birthdayDate,
        nationality,
        country,
        cityTimeZone,
        phone,
        profession,
        studies,
        gender,
      },
      { where: { id: id } }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = putSupervisor;
