const User = require("../models/userSchema");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


exports.formUser = async (req, res) => {
  res.render("userForm");
};

exports.createUser = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(500).json({
        error: "include all fields or email already in use"
      });
    }
    res.redirect('/api/userForm');
  })
}

exports.signIn = (req, res) => {
  const { email, phoneNo } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      ;
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }
    if (user.phoneNo.toString() !== req.body.phoneNo) {
      return res.status(401).json({
        error: "Phone No does not match",
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, email, phoneNo, address } = user;
    return res.json({ token, user: { _id, email, phoneNo, address } });
  });
};

exports.signOut = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};


exports.pushCart = async (req, res) => {
  const user = await User.find({ _id: req.params.userid })
  var cartProduct = await req.params.productid;
  if (user[0] == null) {
    return res.send("No user Found")
  }
  if (cartProduct) {
    user[0].cart.push(cartProduct);
  }
  await user[0].save();
  return res.send(user);
}

exports.userCart = async (req, res) => {
  const user = await User.find({ _id: req.params.userid })
  const cart = user[0].cart
  res.send(cart);
}

exports.getUser = async (req, res) => {
  const user = await User.find({ _id: req.params.userId }, async function (err, person) {
    if (err) {
      res.send("No user Found")
    }
    const info = { "email": person[0].email, "phoneNo": person[0].phoneNo, "address": person[0].address };
    await res.send(info)
  })
}
exports.removeFromCart = async (req, res) => {
  const user = await User.find({ _id: req.params.userId }, async function (err, person) {
    if (err) {
      res.send("No user Found")
    }
    if (req.params.no >= person[0].cart.lenght) {
      res.send(("Invalid Delete request"));
    }
    else {
      person[0].cart.splice(req.params.no, 1);
    }
    await person[0].save();
    res.send(person)
  })
}