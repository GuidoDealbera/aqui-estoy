const { Router } = require("express");
const router = Router();
const postCompanion = require("../Controllers/postCompanion");
const postSupervisor = require("../Controllers/postSupervisor");
const putCompanion = require("../Controllers/putCompanion");

router.post("/postCompanion", postCompanion);
router.post("/postSupervisor", postSupervisor);
router.put("/putCompanion", putCompanion);

module.exports = router;
