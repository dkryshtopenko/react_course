const { User } = require("../models");

exports.userBoard = (req, res) => {
    User.findByPk(req.userId).then((user) => {
        res.status(200).send(user);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
};