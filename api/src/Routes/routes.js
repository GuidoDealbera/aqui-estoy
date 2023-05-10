const { Router } = require("express");
const router = Router();

//* SuperAdmin
const {
  requireSuperAdmin,
  putSuperAdmin,
} = require("../Controllers/SuperAdmin/putSuperAdmin");
//* Companion
const postCompanion = require("../Controllers/Companion/postCompanion");
const putCompanion = require("../Controllers/Companion/putCompanion");
const getCompanion = require("../Controllers/Companion/getCompanion");
const getOneCompanion = require("../Controllers/Companion/getOneCompanion");
const {
  getCompanionShift,
} = require("../Controllers/Companion/getCompanionShift"); //Trae todos los shift VACIOS de Companion cada 1 hs.
const assignCompanionShift = require("../Controllers/Companion/postAssignCompanionShift");
const deleteCompanionShift = require("../Controllers/Companion/deleteCompanionShift");
const getCompanionShiftById = require("../Controllers/Companion/getCompanionByIdShift");
const postRankUpCompanion = require("../Controllers/Companion/postRankUpCompanion");
const getAllCompanionShift = require("../Controllers/Companion/getAllCompanionShift"); //Trae todos los shift ASIGNADOS
//* Supervisor
const postSupervisor = require("../Controllers/Supervisor/postSupervisor");
const putSupervisor = require("../Controllers/Supervisor/putSupervisor");
const getSupervisor = require("../Controllers/Supervisor/getSupervisor");
const getOneSupervisor = require("../Controllers/Supervisor/getOneSupervisor");
const {
  getSupervisorShift,
} = require("../Controllers/Supervisor/getSupervisorShift"); // Trae todos los shift VACIOS de Supervisor cada 1 hs.
const assignSupervisorShift = require("../Controllers/Supervisor/postAssignSupervisorShift");
const deleteSupervisorShift = require("../Controllers/Supervisor/deleteSupervisorShift");
const downgradeSupervisor = require("../Controllers/Supervisor/postDowngradeSupervisor");
const getAllSupervisorShift = require("../Controllers/Supervisor/getAllSupervisorShift"); //Trae todos los shift ASIGNADOS
const postSupervisorCharge = require("../Controllers/Supervisor/postSupervisorCharge");
const getSupervisorCharge = require("../Controllers/Supervisor/getSupervisorCharge");
const putSupervisorCharge = require("../Controllers/Supervisor/putSupervisorCharge");
const getMatchShiftTime = require ("../Controllers/Supervisor/getMatchShiftTime");


const getCityTimeZone = require("../Controllers/TimeZone/getCityTimeZone");
//* Both
const { getBothRoles, requireLogin } = require("../Controllers/getBothRoles");
const getUserById = require("../Controllers/getUserById");
const getAllCompanionsPerShift = require("../Controllers/Companion/getAllCompanionsPerShift");
const getAllSupervisorsPerShift = require("../Controllers/Supervisor/getAllSupervisorsPerShift");

//* nodemailer
const postEmailController = require(".././Controllers/Nodemailer/postEmailController");
router.post("/postEmail", postEmailController);

router.put("/putIsSuperAdmin/:id", requireSuperAdmin, putSuperAdmin);
router.get("/getCompanion", getCompanion);
router.post("/postCompanion", postCompanion);
router.put("/putCompanion/:id", putCompanion);
router.post("/getOneCompanion", requireLogin, getOneCompanion);
router.get("/getCompanionShift", getCompanionShift);
router.post("/postAssignCompanionShift/:idCompanion", assignCompanionShift);
router.delete("/deleteCompanionShift", deleteCompanionShift);
router.post("/postRankUpCompanion", requireSuperAdmin, postRankUpCompanion);
router.get("/getCompanion/:idShift", getCompanionShiftById);
router.get("/getAllCompanionShift", getAllCompanionShift);
router.get("/getAllCompanionsPerShift", getAllCompanionsPerShift);

router.get("/getSupervisor", getSupervisor);
router.post("/postSupervisor", postSupervisor);
router.put("/putSupervisor/:id", putSupervisor);
router.post("/getOneSupervisor", requireLogin, getOneSupervisor);
router.delete("/deleteSupervisorShift", deleteSupervisorShift);
router.get("/getSupervisorShift", getSupervisorShift);
router.post(
  "/postDowngradeSupervisor",
  requireSuperAdmin,
  downgradeSupervisor
);
router.post("/postAssignSupervisorShift/:idSupervisor", assignSupervisorShift);
router.get("/getAllSupervisorShift", getAllSupervisorShift);
router.post("/postSupervisorCharge/:idSupervisor", postSupervisorCharge);
router.get("/getSupervisorCharge/:idSupervisor", getSupervisorCharge);
router.put("/putSupervisorCharge/:idSupervisor", putSupervisorCharge);
router.get("/getAllSupervisorsPerShift", getAllSupervisorsPerShift);

router.get("/getCityTimeZone", getCityTimeZone);
router.post("/getBothRoles", requireLogin, getBothRoles);
router.get("/getUserById/:id", getUserById);
router.get("/getMatchShiftTime/:idCompanion", getMatchShiftTime);
module.exports = router;
