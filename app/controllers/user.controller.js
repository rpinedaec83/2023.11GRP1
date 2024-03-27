const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.findOne = (req, res) => {
  console.log(req)
    const id = req.userId;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};
