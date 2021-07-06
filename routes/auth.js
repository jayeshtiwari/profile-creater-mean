const User = require('../models/user')
module.exports = (router) => {

    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.send({ status: "Failure", message: "Please provide Email !!" });
        } else {
            if (!req.body.mobile) {
                res.send({ status: "Failure", message: "Please provide Mobile !!" });
            } else {
                if (!req.body.password) {
                    res.send({ status: "Failure", message: "Please provide password !!" });
                } else {
                    let user = new User({
                        email: req.body.email,
                        mobile: req.body.mobile,
                        password: req.body.password
                    })
                    user.save((err) => {
                        if (err) {
                            console.log(err);
                            if (err.code === 11000) {
                                res.send({ status: "Failure", message: "User Already Exists" });
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.send({ status: "Failure", message: err.errors.email.message });
                                    }
                                } else {
                                    res.send({ status: "Failure", message: "Couldn't save the user" });
                                }
                            }

                        } else {
                            res.send({ status: "User Registered Success" })
                        }
                    });

                }
            }
        }
    })
    return router
}