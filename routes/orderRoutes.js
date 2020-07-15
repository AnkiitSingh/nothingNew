const express = require("express");
const router = express.Router();
const {placeOrder, getUserOrder, cancleOrder, orderDetails} = require("../controller/orderControler");

router.get("/user/order/:userId", getUserOrder);
router.get("/user/orderDetails/:orderId", orderDetails);
router.post ("/order/create/:userId", placeOrder);
router.put("/order/cancle/:userId/:orderId", cancleOrder);

module.exports = router;
