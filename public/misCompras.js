document.addEventListener('DOMContentLoaded', function() {
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
    getAllItemCart()
    function getAllItemCart() {
        carrito = [];
        let url = "/api/cart/obtenerListaDeCompras";
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

                                    const input = document.createElement('span')
                                    input.innerText = element['cant']
                                    input.id = 'input-cant-'+element['id']
                                cardItem4.appendChild(input);

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
                    cardRounded.innerText = 'No hay productos'
                itemsCarrito.appendChild(cardRounded);
            }
        });
    }

})