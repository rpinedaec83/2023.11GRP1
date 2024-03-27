const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    // Dominio que tengan acceso (ej. 'http://example.com')
   res.setHeader('Access-Control-Allow-Origin', '*');

  // Metodos de solicitud que deseas permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
  // Encabecedados que permites (ej. 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);

  function authenticate(req, res) {
      //console.log("authenticate called");
      if (!req.session.user) {
          res.sendFile(__dirname + '/public/login.html');
      }
      else {
          //console.log(req.session.user);
          username = req.session.user;
          res.sendFile(__dirname + '/public/chat.html');
      }
  }


};