let carrito = [];
let subTotalG = 0;
let cuponG = 0;
let totalG = 0;
let stripe_cupon_id = '';
let stripe;
document.addEventListener('DOMContentLoaded', function() {
    stripe = Stripe('pk_test_51Ow6H1LhefJPPZ8eK39qzTGu9P9dCPmphuqPcKYpfKnyW2Vtj6Vcihj6kDxoGxirjNMS3gy2VbPkCc6NdobBF5pj00cK1hFib6');

    const form = document.getElementById('formulario');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
    
        stripe.createToken(card).then(function(result) {
        if (result.error) {

            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
    
            stripeTokenHandler(result.token);
        }
        });
    });

    function compras() {
        if (carrito.length === 0) {
          alert('El carrito está vacío. Agrega productos antes de continuar');
          return;
        }
      
        fetch('/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ carrito: carrito,stripe_cupon_id:stripe_cupon_id }) 
        })
      
        .then(function(response) {
          return response.json();
        })
        .then(function(session) {
            
          return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function(result) {
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function(error) {
          console.error('Error:', error);
        });
        alert('Compra completada!');
      }

    user()
    getCantCart()
    function user() {
        let url = "/api/user/";
        console.log(url)
        fetch(url, {
            method: "GET"
        }).then(res => res.json())
        .catch(error => {
            })
        .then(response => {
            console.log(response)
            document.getElementById('username').innerText = 'Bienvenido '+ response.username+'!';
        });
    }

    function getCantCart() {
        let url = "/api/cart/getTotalUser";
        console.log(url)
        fetch(url, {
            method: "GET"
        }).then(res => res.json())
        .catch(error => {
            })
        .then(response => {
            document.getElementById('number-cart').innerText = response.length;
            document.getElementById('number-cart').style.display = ''
        });
    }
    function getAllItemCart() {
        carrito = [];
        let url = "/api/cart?user_id=1";
        console.log(url)
        fetch(url, {
            method: "GET"
        }).then(res => res.json())
            .catch(error => {
            })
        .then(response => {
            const itemsCarrito = document.getElementById('content-cart');
            itemsCarrito.innerHTML = '';
            for (let index = 0; index < response.length; index++) {
                const element = response[index];
                console.log(element)
                carrito.push({ id: element['id'],price: element['price'], cant: element['cant'],image:element['producto']['urlPhoto'],name:element['producto']['name'] });
                    var cardRounded = document.createElement("div");
                    cardRounded.classList.add("card");
                    cardRounded.classList.add("mb-4");
                    cardRounded.classList.add("mb-4");
                    cardRounded.id = 'content-'+element['id']
                        var cardBody = document.createElement("div");
                        cardBody.classList.add("card-body");
                        cardBody.classList.add("p-4");
                            var cardRow = document.createElement("div");
                            cardRow.classList.add("row");
                            cardRow.classList.add("d-flex");
                            cardRow.classList.add("justify-content-between");
                            cardRow.classList.add("align-items-center");
                                var cardItem1 = document.createElement("div");
                                cardItem1.classList.add("col-md-2");
                                cardItem1.classList.add("col-lg-2");
                                cardItem1.classList.add("col-xl-2");
                                    const img = document.createElement('img');
                                    img.src = element['producto']['urlPhoto'];
                                    img.classList.add("img-fluid");
                                    img.classList.add("rounded-3");
                                    img.style.height = '120px';
                                    img.style.width = '120px';
                                    cardItem1.appendChild(img);

                                var cardItem2 = document.createElement("div");
                                cardItem2.classList.add("col-md-3");
                                cardItem2.classList.add("col-lg-3");
                                cardItem2.classList.add("col-xl-3");
                                    const p = document.createElement('p');
                                    p.classList.add("lead")
                                    p.classList.add("fw-normal")
                                    p.classList.add("mb-2")
                                    p.innerText = element['producto']['name'];
                                    cardItem2.appendChild(p);

                                var cardItem4 = document.createElement("div");
                                cardItem4.classList.add("col-md-3");
                                cardItem4.classList.add("col-lg-2");
                                cardItem4.classList.add("col-xl-2");
                                cardItem4.classList.add("d-flex");
                                    const buttonDown = document.createElement('button')
                                    buttonDown.classList.add("btn")
                                    buttonDown.classList.add("btn-link")
                                    buttonDown.classList.add("px-2")
                                    buttonDown.onclick = "this.parentNode.querySelector('input[type=number]').stepDown()"
                                        const iDown = document.createElement('i')
                                        iDown.classList.add("fas")
                                        iDown.classList.add("fa-minus")
                                        buttonDown.appendChild(iDown);

                                    const input = document.createElement('input')
                                    input.classList.add("form-control");
                                    input.classList.add("form-control-sm");
                                    input.type = "number"
                                    input.value = element['cant']
                                    input.min = 1
                                    input.id = 'input-cant-'+element['id']
                                    input.onchange = function() {disabledPlusDown(element['id'])};
                                cardItem4.appendChild(input);

                                    const buttonPlus = document.createElement('button')
                                    buttonPlus.classList.add("btn")
                                    buttonPlus.classList.add("btn-link")
                                    buttonPlus.classList.add("px-2")
                                    buttonPlus.onclick = "this.parentNode.querySelector('input[type=number]').stepUp();";
                                        const iPlus = document.createElement('i')
                                        iPlus.classList.add("fas")
                                        iPlus.classList.add("fa-plus")
                                        buttonPlus.appendChild(iPlus);

                                var cardItem5 = document.createElement("div");
                                cardItem5.classList.add("col-md-2");
                                cardItem5.classList.add("col-lg-1");
                                cardItem5.classList.add("col-xl-1");
                                cardItem5.classList.add("offset-lg-1");
                                    const h1 = document.createElement('h5');
                                    h1.classList.add("mb-0")
                                    h1.innerText = '$'+element['price']
                                    cardItem5.appendChild(h1);
                                    
                                var cardItem6 = document.createElement("div");
                                cardItem6.classList.add("col-md-1");
                                cardItem6.classList.add("col-lg-1");
                                cardItem6.classList.add("col-xl-1");
                                cardItem6.classList.add("text-end");
                                    const button = document.createElement('button')
                                    button.classList.add('btn');
                                    button.classList.add('btn-danger');
                                    button.innerText = ''
                                    button.onclick = function() {deleteItem(element['id'])};
                                        const imgDelete = document.createElement('img')
                                        imgDelete.src = 'https://img.icons8.com/ios/50/trash--v1.png';
                                        imgDelete.width = '20'
                                        imgDelete.height = '20'
                                        button.appendChild(imgDelete);
                                    cardItem6.appendChild(button);

                            cardRow.appendChild(cardItem1);
                            cardRow.appendChild(cardItem2);
                            cardRow.appendChild(cardItem4);
                            cardRow.appendChild(cardItem5);
                            cardRow.appendChild(cardItem6);
                        cardBody.appendChild(cardRow);
                    cardRounded.appendChild(cardBody);
                itemsCarrito.appendChild(cardRounded);
            }
            if(response.length == 0){
                var cardRounded = document.createElement("div");
                    cardRounded.classList.add("card");
                    cardRounded.classList.add("mb-4");
                    cardRounded.classList.add("mb-4");
                    cardRounded.innerText = 'No hay productos selecionados'
                itemsCarrito.appendChild(cardRounded);
            }
            updateDetail()
        });
    }

    function disabledPlusDown(id) {
        document.querySelectorAll('#content-'+id+' .btn').forEach(el => el.setAttribute('disabled', true));
        document.querySelectorAll('#content-'+id+' input').forEach(el => el.setAttribute('disabled', true));
        let url = "/api/cart/changeCant/"+id;
        console.log(url)
        fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cant: document.getElementById('input-cant-'+id).value })
          })
          .then(function(response) {
            const resultado = carrito.findIndex((item) => item.id === id);
            carrito[resultado]['cant']  = Number(document.getElementById('input-cant-'+id).value)
            updateDetail()
            document.querySelectorAll('#content-'+id+' .btn').forEach(el => el.removeAttribute('disabled'));
            document.querySelectorAll('#content-'+id+' input').forEach(el => el.removeAttribute('disabled'));
            return response.json();
          })
          .then(function(result) {
            if (result.error) {
              alert(result.error.message);
            }
          })
          .catch(function(error) {
            console.error('Error:', error);
          });
        
    }

    function updateDetail() {
        var subTotal = 0;
        subTotalG = 0;
        for (let index = 0; index < carrito.length; index++) {
            const element = carrito[index];
            for (let index2 = 0; index2 < element['cant']; index2++) {
                subTotal += element['price']
            }
        }
        document.getElementById('subTotal').innerText = '$'+subTotal;
        document.getElementById('cuponShow').innerText = '- $'+cuponG;
        subTotalG = subTotal;

        totalG = subTotal - cuponG;
        if(totalG < 0){
            totalG = 0;
        }
        document.getElementById('total').innerText = '$'+totalG;
    }

    function deleteItem(id) {
        document.querySelectorAll('#content-'+id+' .btn').forEach(el => el.setAttribute('disabled', true));
        document.querySelectorAll('#content-'+id+' input').forEach(el => el.setAttribute('disabled', true));
        let url = "/api/cart/"+id;
        console.log(url)
        fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(function(response) {
            getAllItemCart()
            getCantCart()
            return response.json();
          })
          .then(function(result) {
            if (result.error) {
              alert(result.error.message);
            }
          })
          .catch(function(error) {
            console.error('Error:', error);
          });
    }

    function addCupon(){
        const cupon = document.getElementById('cupon').value
        if(!cupon){
            alert('Ingrese un codigo de cupon')
            return false
        }
        let url = "/api/cupon/?code="+cupon;
        console.log(url)
        fetch(url, {
            method: "GET"
        }).then(res => res.json())
            .catch(error => {
            })
        .then(response => {
            for (let index = 0; index < response.length; index++) {
                cuponG = response[index]['descuento'];
                stripe_cupon_id = response[index]['stripe_id'];
                updateDetail()
                alert('Se encontro cupon')
            }
            if(response.length == 0){
                alert('No se encontro cupon')
            }
        });

    }

    document.getElementById("btn_cupon").onclick = function() {addCupon()};
    document.getElementById("btn_compras").onclick = function() {compras()};

    getAllItemCart();
})