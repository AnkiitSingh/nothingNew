const Order = require("../models/orderSchema");
const User = require("../models/userSchema");
const Product = require("../models/productSchema")

exports.getOrders = async (req, res) => {
    const orders = await Order.find({ status: 'Recieved' });
    res.render("orders", { orders: orders });
};

  exports.getOrder = async (req, res) => {
    const order = await Order.find({_id: req.params.id});
    var list=[];
    for(var i=0;i<order[0].products.length;i++){
        const product= await Product.findById(order[0].products[i])
        list.push(product);
    }
    console.log(order);
    const en= Order.schema.path('status').enumValues;
    res.render("orders_detail", { order: order, status: order[0].status, list: list,en: en});
  };

exports.searchOrder = async (req, res) => {
    const order = await Order.find({ transaction_id: req.body.id, status: 'Recieved' });
    res.render("orders", { orders: order });
};

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

exports.orderAmount = async (req, res) => {
    User.find({ _id: req.params.userId }, async function (err, data) {
        if (err || !data || data === [] || data[0] === undefined || data[0] === null) {
            return res.json({ "error": "No user found" })
        }
        else if (data) {
            var amount = 0
            if (data[0].cart === []) {
                return res.send("no product found")
            }
            let orders = data[0].cart
            for (let i = 0; i < orders.length; i++) {
                await Products.find({ _id: orders[i] }, async function (err, value) {
                    if (err || !value || value === [] || value[0] === null || value[0] === undefined) {
                        if (i === orders.length - 1) {
                            return res.json({ "amount": amount })
                        }
                    }
                    else if (value) {
                        amount = amount + value[0].price
                        if (i === orders.length - 1) {
                            return res.json({ "amount": amount })
                        }
                    }
                })
            }
        }
    })
}