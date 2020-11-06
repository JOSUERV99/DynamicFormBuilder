const express = require("express");
const router = express.Router();

const templatesController = require("../controllers/template");

router.get("/", templatesController.get);

router.post("/", templatesController.create);

router.put("/", templatesController.edit);

router.delete("/", templatesController.delete);

module.exports = router;