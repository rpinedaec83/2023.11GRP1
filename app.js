const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  res.redirect('/index.html');
});

require("./app/routes/cart.routes")(app);
require("./app/routes/cupon.routes")(app);
require("./app/routes/producto.routes")(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});