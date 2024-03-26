const express = require('express');
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const port = 3000;
const { authJwt } = require("./app/middlewares");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "final-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/login", (req, res) => {
  res.redirect('/login.html');
});

app.get("/index.html",[authJwt.verifyToken], (req, res) => {
  console.log(req.username)
  res.redirect('/index.html');
});

app.get("/index",[authJwt.verifyToken], (req, res) => {
  console.log(req.username)
  res.redirect('/index.html');
});




app.get("/",[authJwt.verifyToken], (req, res) => {
  console.log(req.username)
  res.redirect('/index.html');
});



require("./app/routes/cart.routes")(app);
require("./app/routes/cupon.routes")(app);
require("./app/routes/producto.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});