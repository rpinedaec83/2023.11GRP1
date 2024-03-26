
module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();
    const { authJwt } = require("../middlewares");
    router.get("/",[authJwt.verifyToken], user.findOne);
    app.use('/api/user', router);

};