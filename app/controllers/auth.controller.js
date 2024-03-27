const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      };
      User.create(user)
          .then(data => {
            res.send({ message: "Usuario registrado exitosamente!" });
            return;
          })
          .catch(err => {
              res.status(500).send({
                  message:
                      err.message || "Some error occurred while creating the Tutorial."
              });
          });
};

exports.signin = (req, res) => {

  User.findOne({ where: { username: req.body.username, }
  }).then(user => {
      if(user){
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({ message: "Constraseña incorrecta!" });
        }

        if (!passwordIsValid) {
          return res.status(401).send({ message: "Invalid Password!" });
        }
  
        const token = jwt.sign({ id: user.id,
                                  username:user.username  
                                },
                                config.secret,
                                {
                                  algorithm: 'HS256',
                                  allowInsecureKeySizes: true,
                                  expiresIn: 86400, // 24 hours
                                });
  
        req.session.token = token;
        /*res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
        });*/
        res.redirect('/index');

      }else{
        console.log('Error: el usuario no existe!');
        res.send({ message: "Error: el usuario no existe!" });
        return;
      }
  }).catch((error) => {
      console.error('Failed to retrieve data : ', error);
      return;
  });

};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "Has cerrado sesión!" });
  } catch (err) {
    this.next(err);
  }
};