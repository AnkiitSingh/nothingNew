const express = require("express");
const router = express.Router();
const {searchOrder, getOrders, placeOrder, getUserOrder, cancleOrder, orderDetails} = require("../controller/orderControler");

router.get("/get/orders", getOrders);
router.get("/user/order/:userId", getUserOrder);
router.get("/user/orderDetails/:orderId", orderDetails);
router.post("/order/search", searchOrder);
router.post ("/order/create/:userId", placeOrder);
router.put("/order/cancle/:userId/:orderId", cancleOrder);

module.exports = router;
