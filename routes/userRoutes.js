var express = require ("express"),
router = express.Router();
const {createUser, signIn, signOut} = require("../controller/userController");


router.post("/newUser", createUser);
router.post("/signIn", signIn);
router.get("/signout", signOut);

module.exports = router;