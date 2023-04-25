const { Router } = require('express');
const router = Router();
const postCompanion = require("../Controllers/postCompanion")
const postSupervisor = require("../Controllers/postSupervisor")

router.post("/postCompanion", postCompanion);
router.post("/postSupervisor", postSupervisor);


module.exports = router;