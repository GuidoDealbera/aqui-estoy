const { Router } = require("express");
const router = Router();
const postCompanion = require("../Controllers/postCompanion");
const postSupervisor = require("../Controllers/postSupervisor");
const putCompanion = require("../Controllers/putCompanion");
const putSupervisor = require("../Controllers/putSupervisor");
const getSupervisor = require("../Controllers/getSupervisor");
const getCompanion = require("../Controllers/getCompanion");
const {
  requireSuperAdmin,
  putSuperAdmin,
} = require("../Controllers/putSuperAdmin");

const getOneSupervisor = require("../Controllers/getOneSupervisor")

router.get("/getSupervisor", getSupervisor);
router.get("/getCompanion", getCompanion);
router.post("/postCompanion", postCompanion);
router.post("/postSupervisor", postSupervisor);
router.put("/putCompanion/:id", putCompanion);

router.put("/putSupervisor/:id", putSupervisor);
router.put("/isSuperAdmin/:id", requireSuperAdmin, putSuperAdmin);
router.get("/getOneSupervisor", getOneSupervisor);
module.exports = router;
