const { Router } = require('express');
const router = Router();
const postCompanion = require("../Controllers/postCompanion")

router.post("/", postCompanion);


module.exports = router;