const { Router } = require("express");
const router = Router();
const postCompanion = require("../Controllers/postCompanion");
const postSupervisor = require("../Controllers/postSupervisor");
const putCompanion = require("../Controllers/putCompanion");
const putSupervisor = require("../Controllers/putSupervisor");

const getSupervisor = require("../Controllers/getSupervisor");
const getCompanion = require("../Controllers/getCompanion");

router.get("/getSupervisor", getSupervisor);
router.get("/getCompanion", getCompanion);

const {requireSuperAdmin,putSuperAdmin}= require("../Controllers/putSuperAdmin")

router.post("/postCompanion", postCompanion);
router.post("/postSupervisor", postSupervisor);
router.put("/putCompanion", putCompanion);
router.put("/putSupervisor", putSupervisor);


router.put("/isSuperAdmin",)

module.exports = router;
