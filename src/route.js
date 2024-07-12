const express = require("express");
const router = express.Router();
const dataController = require("./controllers/controller");

router.post("/", dataController.processData);

module.exports = router;
