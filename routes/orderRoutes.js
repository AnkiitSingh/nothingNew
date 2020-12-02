const express = require("express");
const router = express.Router();
const { returnOrder, searchOrder, getOrderDatabase, getOrder, getOrders, placeOrder, getUserOrder, cancleOrder, orderDetails, orderAmount } = require("../controller/orderControler");

router.get("/get/orders", getOrders);
router.get("/orders/:id", getOrder);
router.get("/orders-:id", getOrderDatabase);
router.get("/user/order/:userId", getUserOrder);
router.get("/user/orderDetails/:orderId", orderDetails);
router.get("/user/:userId/amount", orderAmount)
router.post("/order/search", searchOrder);
router.post("/order/create/:userId", placeOrder);
router.put("/order/cancel/:userId/:orderId", cancleOrder);
router.put("/order/return/:userId/:orderId", returnOrder)
module.exports = router;