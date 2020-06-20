var express = require ("express"),
    router = express.Router();
const {createUser} = require("../controller/userController")

router.post("/newUser", createUser);

module.exports = router;