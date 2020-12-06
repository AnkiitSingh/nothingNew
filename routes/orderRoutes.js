const express = require("express");
const router = express.Router();

const { getReturnOrders,searchReturnOrder,returnOrder,changeOrderStatus, searchOrder, getOrderDatabase, getOrder, getOrders, placeOrder, getUserOrder, cancleOrder, orderDetails, orderAmount } = require("../controller/orderControler");



router.get("/get_orders", getOrders);
router.get("/get_returnOrders", getReturnOrders);
router.get("/orders/:id", getOrder);
router.get("/orders-:id", getOrderDatabase);
router.post("/changeOrderStatus-:id", changeOrderStatus);
router.get("/user/order/:userId", getUserOrder);
router.get("/user/orderDetails/:orderId", orderDetails);
router.get("/user/:userId/amount", orderAmount)
router.post("/order_search", searchOrder);
router.post("/order_return_search", searchReturnOrder);
router.post("/order/create/:userId", placeOrder);
router.put("/order/cancel/:userId/:orderId", cancleOrder);
router.put("/order/return/:userId/:orderId", returnOrder);

module.exports = router;

