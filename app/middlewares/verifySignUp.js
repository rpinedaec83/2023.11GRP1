const db = require("../models");
const User = db.user;

exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({ where: { username: req.body.username }
  }).then(response => {
      if(!response){
        User.findOne({ where: { email: req.body.email }
        }).then(response2 => {
            if(!response2){
              console.log('Usuario y correo desponible!');
              next();
            }else{
              console.log('Error: el correo ya existe!');
              res.send({ message: "Error: el correo ya existe!" });
              return;
            }
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
            return;
        });
      }else{
        console.log('Error: el usuario ya existe!');
        res.send({ message: "Error: el usuario ya existe!" });
        return;
      }
  }).catch((error) => {
      console.error('Failed to retrieve data : ', error);
      return;
  });
};


