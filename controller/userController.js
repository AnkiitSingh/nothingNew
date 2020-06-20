const User = require("../models/userSchema");

exports.createUser = (req, res) =>{
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
