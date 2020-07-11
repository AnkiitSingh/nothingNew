var express = require ("express"),
router = express.Router();
const {createUser, signIn, signOut, pushCart, userCart} = require("../controller/userController");


router.post("/newUser", createUser);
router.post("/signIn", signIn);
router.get("/signout", signOut);
router.get("/:userid/cart", userCart);
router.patch("put/:userid/:productid", pushCart);

module.exports = router;