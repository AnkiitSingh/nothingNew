const Order = require("../models/orderSchema");
const User = require("../models/userSchema");
const Products = require("../models/productSchema")

exports.placeOrder = async (req, res) => {
    const user = await User.find({ _id: req.params.userId }, async function (err, person) {
        if (err) {
            res.send("No user Found")
        }
        Order.user = req.params.userId;
        const order = new Order(req.body);
        order.save(async (err, order) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    err: "NOT able to save user in DB",
                });
            }
            person[0].orders.push(order.id);
            person[0].cart = [];
            await person[0].save();
            res.send(order);
        })
    })
};

exports.getUserOrder = async (req, res) => {
    const user = await Order.find({ user: req.params.userId }, async function (err, data) {
        if (err) {
            res.send("No user Found")
        }
        res.send(data);
    })
}

exports.cancleOrder = async (req, res) => {
    const user = await User.find({ _id: req.params.userId }, async function (err, person) {
        if (err) {
            res.send("No user Found")
        }
        Order.find({ _id: req.params.orderId }, async function (err, value) {
            if (err) {
                res.send("Order Not Found");
            }
            value[0].status = "Cancelled";
            await value[0].save()
            res.send(value)
        })
    })
}

exports.orderDetails = async (req, res) => {
    Order.find({ _id: req.params.orderId }, async function (err, value) {
        if (err) {
            res.send("Order not found")
        }
        if (value[0] == null) {
            res.send("No Orders Found")
        }
        res.send(value[0].products)
    })
}