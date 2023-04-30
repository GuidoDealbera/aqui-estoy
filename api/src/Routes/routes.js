const { Router } = require("express");
const router = Router();

const { requireSuperAdmin,  putSuperAdmin,} = require("../Controllers/SuperAdmin/putSuperAdmin");

const postCompanion = require("../Controllers/Companion/postCompanion");
const putCompanion = require("../Controllers/Companion/putCompanion");
const getCompanion = require("../Controllers/Companion/getCompanion");
const getOneCompanion = require("../Controllers/Companion/getOneCompanion");
const { getCompanionShift } = require("../Controllers/Companion/getCompanionShift");
const assignCompanionShift = require("../Controllers/Companion/postAssignCompanionShift");
const deleteCompanionShift = require("../Controllers/Companion/deleteCompanionShift");
const getCompanionShiftById=  require("../Controllers/Companion/getCompanionByIdShift");
const postRankUpCompanion = require("../Controllers/Companion/postRankUpCompanion");


const postSupervisor = require("../Controllers/Supervisor/postSupervisor");
const putSupervisor = require("../Controllers/Supervisor/putSupervisor");
const getSupervisor = require("../Controllers/Supervisor/getSupervisor");
const getOneSupervisor = require("../Controllers/Supervisor/getOneSupervisor");
const { getSupervisorShift } = require("../Controllers/Supervisor/getSupervisorShift");
const assignSupervisorShift = require("../Controllers/Supervisor/postAssignSupervisorShift");
const deleteSupervisorShift = require("../Controllers/Supervisor/deleteSupervisorShift");
const downgradeSupervisor = require("../Controllers/Supervisor/postDowngradeSupervisor")
const getAllSupervisorShift = require("../Controllers/Supervisor/getAllSupervisorShift")

const getCityTimeZone = require("../Controllers/TimeZone/getCityTimeZone");
const { getBothRoles, requireLogin } = require("../Controllers/getBothRoles");

router.put("/putIsSuperAdmin/:id", requireSuperAdmin, putSuperAdmin);


router.get("/getCompanion", getCompanion);
router.post("/postCompanion", postCompanion);
router.put("/putCompanion/:id", putCompanion);
router.post("/getOneCompanion", requireLogin, getOneCompanion);
router.get("/getCompanionShift", getCompanionShift); // Ruta para traer todos los shift de Companion cada 1 hs.
router.post("/postAssignCompanionShift/:idCompanion", assignCompanionShift);
router.delete("/deleteCompanionShift", deleteCompanionShift);
router.post("/postRankUpCompanion/:id",requireSuperAdmin, postRankUpCompanion);
router.get("/getCompanion/:idShift", getCompanionShiftById);

router.get("/getSupervisor", getSupervisor);
router.post("/postSupervisor", postSupervisor);
router.put("/putSupervisor/:id", putSupervisor);
router.post("/getOneSupervisor", requireLogin, getOneSupervisor);
router.delete("/deleteSupervisorShift", deleteSupervisorShift);
router.get("/getSupervisorShift", getSupervisorShift); // Ruta para traer todos los shift de Supervisor cada 1 hs.
router.post("/postDowngradeSupervisor/:id", requireSuperAdmin, downgradeSupervisor);
router.post("/postAssignSupervisorShift/:idSupervisor", assignSupervisorShift);

router.get("/getCityTimeZone", getCityTimeZone);
router.post("/getBothRoles", requireLogin, getBothRoles);
router.get("/getAllSupervisorShift", getAllSupervisorShift)

module.exports = router;
