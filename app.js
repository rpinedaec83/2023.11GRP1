const express = require('express');
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const port = 3000;
const { authJwt } = require("./app/middlewares");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const stripe = require('stripe')('sk_test_51Ow6H1LhefJPPZ8eaMI9pbkwKDtgDvCtRHtrt5AL7kYCKxZTtVf3G1szwWi1yLrdDP908G0Bx9w5AXKiIXUw7KcZ00eBSFTqqh');

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

app.post('/create-checkout-session', async (req, res) => {
  const productosSeleccionados = req.body.carrito;
  const stripe_cupon_id = req.body.stripe_cupon_id;

  productosSeleccionados.forEach(producto => {
      console.log('Orden de compra guardad.');
  });


  const line_items = productosSeleccionados.map(producto => ({
      price_data: {
          currency: 'usd',
          product_data: {
              name: producto.name,
              images: [producto.image],
          },
          unit_amount: producto.price * 100,  
      },
      quantity: producto.cant,
  }));
  var session = '';
  if(stripe_cupon_id){
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        discounts: [{
          coupon: stripe_cupon_id,
        }],
        success_url: 'http://localhost:3000/carrito.html',
        cancel_url: 'http://localhost:3000/carrito.html',
    });
  }else{
     session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/carrito.html',
      cancel_url: 'http://localhost:3000/carrito.html',
  });
  }
  

  res.json({ id: session.id });
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