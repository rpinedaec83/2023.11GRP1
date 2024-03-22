const db = require("../models");
const Cart = db.cart;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.nombres) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }*/
    const cart = {
        item_id: req.body.item_id,
        user_id: req.body.user_id,
        cant: req.body.cant,
        price: req.body.price,
        state: 'CART',
    };
    Cart.create(cart)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.findAll = (req, res) => {
    
    const user_id = req.query.user_id;

    Cart.findAll( { 
        include: ["producto"],
        where: {user_id:  user_id},
        state: 'CART' 
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
exports.getTotalUser = (req, res) => {
    
    const user_id = req.query.user_id;

    Cart.findAll( { 
            where: {
                user_id:  user_id,
                state: 'CART'
            }  
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cart.findByPk(id)
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
exports.update = (req, res) => {
    const id = req.params.id;

    Cart.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};
exports.changeCant = (req, res) => {
    const id = req.params.id;
    const cant = req.body.cant;

    Cart.update({ cant: cant }, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Tutorial was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id
        });
    });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Cart.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};
exports.deleteAll = (req, res) => {
    Cart.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
};