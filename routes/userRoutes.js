var express = require ("express"),
router = express.Router();
const {formUser,createUser, getUser,signIn, signOut, pushCart, userCart, removeFromCart} = require("../controller/userController");

router.get("/userForm", formUser);
router.post("/newUser", createUser);
router.post("/signIn", signIn);
router.get("/signout", signOut);
router.get("/user/:userId", getUser);
router.get("/:userid/cart", userCart);
router.patch("/put/:userid/:productid", pushCart);
router.patch("/cart/:userId/:no", removeFromCart)

module.exports = router;