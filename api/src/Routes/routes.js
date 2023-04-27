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
const getOneCompanion = require("../Controllers/getOneCompanion");
const getOneSupervisor = require("../Controllers/getOneSupervisor");
const { getSupervisorShift } = require("../Controllers/getSupervisorShift");
const { getCompanionShift } = require("../Controllers/getCompanionShift");
const getCityTimeZone = require("../Controllers/getCityTimeZone");

router.get("/getSupervisor", getSupervisor);
router.get("/getCompanion", getCompanion);
router.post("/postCompanion", postCompanion);
router.post("/postSupervisor", postSupervisor);
router.put("/putCompanion/:id", putCompanion);
router.put("/putSupervisor/:id", putSupervisor);
router.put("/putIsSuperAdmin/:id", requireSuperAdmin, putSuperAdmin);
router.get("/getOneSupervisor", getOneSupervisor);
router.get("/getOneCompanion", getOneCompanion);
router.get("/getSupervisorShift", getSupervisorShift); // Ruta para traer todos los shift de Supervisor cada 1 hs.
router.get("/getCompanionShift", getCompanionShift); // Ruta para traer todos los shift de Companion cada 1 hs.
router.get("/getCityTimeZone", getCityTimeZone);

module.exports = router;
