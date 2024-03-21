
module.exports = app => {
    const cupon = require("../controllers/cupon.controller.js");
    var router = require("express").Router();

    router.post("/", cupon.create);
    router.get("/", cupon.findAll);
    router.get("/:id", cupon.findOne);
    router.put("/:id", cupon.update);
    router.delete("/:id", cupon.delete);
    router.delete("/", cupon.deleteAll);

    app.use('/api/cupon', router);

};