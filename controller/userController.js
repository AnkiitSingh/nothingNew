const User = require("../models/userSchema");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


exports.createUser = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                err: "NOT able to save user in DB",
            });
        }
        res.json({
            email: user.email,
            id: user._id,
            phoneNo: user.phoneNo
          });
    })
}

exports.signIn = (req, res) => {
    const { email, phoneNo } = req.body;
  
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        console.log(user);
        return res.status(400).json({
          error: "USER email does not exists"
        });
      }
      if (user.phoneNo !== req.body.phoneNo) {
        return res.status(401).json({
          error: "Phone No does not match"
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
