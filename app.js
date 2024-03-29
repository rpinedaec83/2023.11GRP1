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
      const orden = {
          id: producto.nombre,
          price: producto.price,
          cant: producto.cant
      };
      console.log('Orden de compra guardad.');
      /*connection.query('INSERT INTO OrdenDeCompra SET ?', orden, function(error, results, fields) {
          if (error) throw error;
          console.log('Orden de compra guardad.');
      });*/
  });
  /*
  if (req.body.tarjeta) {

      const tarjeta = req.body.tarjeta;
      const datosTarjeta = {
        numero: tarjeta.numero,
          cvv: tarjeta.cvv,
          nombre: tarjeta.nombre,
          fecha_expiracion: tarjeta.fecha_expiracion,
      };

      connection.query('INSERT INTO DatosTarjeta SET ?', datosTarjeta, function(error, results, fields) {
          if (error) throw error;
          console.log('Datos de tarjeta guardados.');
      });
  }*/


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
        success_url: 'http://51.222.87.39:3500/carrito.html',
        cancel_url: 'http://51.222.87.39:3500/carrito.html',
    });
  }else{
     session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://51.222.87.39:3500/carrito.html',
      cancel_url: 'http://51.222.87.39:3500/carrito.html',
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