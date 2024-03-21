
module.exports = app => {
    const cart = require("../controllers/cart.controller.js");
    var router = require("express").Router();

    router.post("/", cart.create);
    router.get("/", cart.findAll);
    router.get("/:id", cart.findOne);
    router.put("/:id", cart.update);
    router.delete("/:id", cart.delete);
    router.delete("/", cart.deleteAll);
    router.put("/changeCant/:id", cart.changeCant);

    app.use('/api/cart', router);

};