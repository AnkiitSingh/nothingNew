const Order = require("../models/orderSchema");
const User = require("../models/userSchema");
const Products = require("../models/productSchema")

exports.placeOrder = async(req, res) => {
    const user = await User.find({_id: req.params.userId}, async function(err, person){
        if(err){
          res.send("No user Found")
        }
        Order.user= req.params.userId;
        const order = new Order(req.body);
        order.save(async(err, order) => {
            if(err) {
                console.log(err);
                return res.status(400).json({
                    err: "NOT able to save user in DB",
                });
            }
            person[0].orders.push(order.id);
            await person[0].save();
            res.send(order);
        })
    })
};

exports.getUserOrder = async(req, res) => {
    const user = await User.find({_id: req.params.userId}, async function(err, person){
        if(err){
          res.send("No user Found")
        }
        var arre = []
        for (let i=0; i<=person[0].orders.length; i++){
            Order.find({_id: (person[0].orders[i])} , async function(err, value) {
                if(err){
                    res.send("order not found")
                }
                arre.push(value);
                if( i === person[0].orders.length){
                    await res.send(arre)
                } 
            }) 
        }
    })
}

exports.cancleOrder = async(req, res) =>{
    const user = await User.find({_id: req.params.userId}, async function(err, person){
        if(err){
          res.send("No user Found")
        }
        Order.find({_id: req.params.orderId}, async function(err, value){
            if(err){
                res.send("Order Not Found");
            }
            value[0].status = "Cancelled";
            await value[0].save()
            res.send(value)
        })
    })
}

exports.orderDetails = async(req, res) =>{
    Order.find({_id: req.params.orderId}, async function(err, value){
        if(err){
            res.send("Order not found")
        }
        if(value[0]==null){
            res.send("No Orers Found")
        }
        var arr= []
        for(let i=0; i<=value[0].products.length; i++){
            Products.find({_id : value[0].products[i]},async function(err, data){
                if(err){
                    res.send("Product not found");
                }
                try{
                    data[0].photo= undefined;
                } 
                catch{

                }
                var sent = data[0];
                arr.push(sent)
                if(i===value[0].products.length){
                    await res.send(arr)
                }
            })
        };
    })
}