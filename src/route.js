const express = require("express");
const router = express.Router();
const dataController = require("./controller");

router.get("/", dataController.getData);

router.post("/", dataController.processData);

module.exports = router;
