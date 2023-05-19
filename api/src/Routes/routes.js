const { Router } = require("express");
const router = Router();

//* SuperAdmin
const {requireSuperAdmin,putSuperAdmin} = require("../Controllers/SuperAdmin/putSuperAdmin");
//* Companion
const postCompanion = require("../Controllers/Companion/postCompanion");
const putCompanion = require("../Controllers/Companion/putCompanion");
const getCompanion = require("../Controllers/Companion/getCompanion");
const {getCompanionShift} = require("../Controllers/Companion/getCompanionShift");
const assignCompanionShift = require("../Controllers/Companion/postAssignCompanionShift");
const deleteCompanionShift = require("../Controllers/Companion/deleteCompanionShift");
const getCompanionShiftById = require("../Controllers/Companion/getCompanionByIdShift");
const postRankUpCompanion = require("../Controllers/Companion/postRankUpCompanion");
const getAllCompanionShift = require("../Controllers/Companion/getAllCompanionShift");
//* Supervisor
const postSupervisor = require("../Controllers/Supervisor/postSupervisor");
const putSupervisor = require("../Controllers/Supervisor/putSupervisor");
const getSupervisor = require("../Controllers/Supervisor/getSupervisor");
const {getSupervisorShift,} = require("../Controllers/Supervisor/getSupervisorShift"); 
const assignSupervisorShift = require("../Controllers/Supervisor/postAssignSupervisorShift");
const deleteSupervisorShift = require("../Controllers/Supervisor/deleteSupervisorShift");
const downgradeSupervisor = require("../Controllers/Supervisor/postDowngradeSupervisor");
const getAllSupervisorShift = require("../Controllers/Supervisor/getAllSupervisorShift"); 
const postSupervisorCharge = require("../Controllers/Supervisor/postSupervisorCharge");
const getSupervisorCharge = require("../Controllers/Supervisor/getSupervisorCharge");
const putSupervisorCharge = require("../Controllers/Supervisor/putSupervisorCharge");

const getCityTimeZone = require("../Controllers/TimeZone/getCityTimeZone");
//* Both
const { getBothRoles, requireLogin } = require("../Controllers/getBothRoles");
const getUserById = require("../Controllers/getUserById");
const getAllCompanionsPerShift = require("../Controllers/Companion/getAllCompanionsPerShift");
const getAllSupervisorsPerShift = require("../Controllers/Supervisor/getAllSupervisorsPerShift");
const getOnlineSupervisor = require("../Controllers/Supervisor/getOnlineSupervisor");
//* nodemailer
const postCreatedAccount = require("../Controllers/Nodemailer/accountCreated/postCreatedAccount");
const getPasswordRecoveryCode = require("../Controllers/Nodemailer/passwordController/getPasswordRecoveryCode");
const putUserPassword = require("../Controllers/Nodemailer/passwordController/putUserPassword");
const postAddShift = require("../Controllers/Nodemailer/ShiftsControllers/postAddShift");
const postDeleteShift = require("../Controllers/Nodemailer/ShiftsControllers/postDeleteShift");
const putSupervisorShifts = require("../Controllers/Shift/putSupervisorShifts");
const putCompanionShifts = require("../Controllers/Shift/putCompanionShifts");
const putSupervisorShiftRules = require("../Controllers/Shift/putSupervisorShiftRules");
const putCompanionShiftRules = require("../Controllers/Shift/putCompanionShiftRules");
router.post("/postAddShift", postAddShift);
router.post("/postDeleteShift", postDeleteShift);
router.post("/postCreatedAccount", postCreatedAccount);
router.get("/getPasswordRecoveryCode/:email", getPasswordRecoveryCode);
router.put("/putUserPassword", putUserPassword);
router.put("/putIsSuperAdmin/:id", requireSuperAdmin, putSuperAdmin);
router.get("/getCompanion", getCompanion);
router.post("/postCompanion", postCompanion);
router.put("/putCompanion/:id", putCompanion);
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
router.delete("/deleteSupervisorShift", deleteSupervisorShift);
router.get("/getSupervisorShift", getSupervisorShift);
router.post("/postDowngradeSupervisor", requireSuperAdmin, downgradeSupervisor);
router.post("/postAssignSupervisorShift/:idSupervisor", assignSupervisorShift);
router.get("/getAllSupervisorShift", getAllSupervisorShift);
router.post("/postSupervisorCharge/:idSupervisor", postSupervisorCharge);
router.get("/getSupervisorCharge/:idSupervisor", getSupervisorCharge);
router.put("/putSupervisorCharge/:idSupervisor", putSupervisorCharge);
router.get("/getAllSupervisorsPerShift", getAllSupervisorsPerShift);

router.get("/getCityTimeZone", getCityTimeZone);
router.post("/getBothRoles", requireLogin, getBothRoles);
router.get("/getUserById/:id", getUserById);
router.post("/getOnlineSupervisor", getOnlineSupervisor);
router.put("/putSupervisorShifts", putSupervisorShifts)
router.put("/putCompanionShifts", putCompanionShifts)
router.put("/putSupervisorShiftRules", putSupervisorShiftRules)
router.put("/putCompanionShiftRules", putCompanionShiftRules)


module.exports = router;
