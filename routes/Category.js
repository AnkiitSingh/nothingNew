var express = require("express");
var router = express.Router();

router.post("/create/category/admin", categoryAddition);

module.exports = router;