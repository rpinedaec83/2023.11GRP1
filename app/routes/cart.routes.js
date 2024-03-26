
module.exports = app => {
    const cart = require("../controllers/cart.controller.js");
    var router = require("express").Router();
    const { authJwt } = require("../middlewares");

    router.post("/",[authJwt.verifyToken], cart.create);
    router.get("/",[authJwt.verifyToken], cart.findAll);
    router.get("/getTotalUser/",[authJwt.verifyToken], cart.getTotalUser);
    router.get("/:id",[authJwt.verifyToken], cart.findOne);
    router.put("/:id",[authJwt.verifyToken], cart.update);
    router.delete("/:id",[authJwt.verifyToken], cart.delete);
    router.delete("/",[authJwt.verifyToken], cart.deleteAll);
    router.put("/changeCant/:id",[authJwt.verifyToken], cart.changeCant);

    app.use('/api/cart', router);

};