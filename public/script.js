var categoriaAll = ''
const user_id = '1'
document.addEventListener('DOMContentLoaded', function() {
    function getCantCart() {
        let url = "/api/cart/getTotalUser?user_id="+user_id;
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
    function addCarts(producto_id,price) {
        let url = "/api/cart/";
        console.log
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                cant: 1,
                user_id: user_id,
                item_id: producto_id,
                price: price
            })
          })
          .then(function(response) {
            getCantCart()
            alert('Se agrego al carrito')
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
    function getCategorias() {
        let url = "/api/producto/get/categoria";
        console.log(url)
        fetch(url, {
            method: "GET"
        }).then(res => res.json())
        .catch(error => {
            })
        .then(response => {
            console.log(response)
            const dropdown = document.getElementById('dropdown-select');
            dropdown.innerHTML = '';
            var li = document.createElement("li");
                var a = document.createElement("a");
                    a.classList.add("dropdown-item");
                    a.innerText = 'Todos'
                    a.onclick = function() {getAllProductos('')};
                li.appendChild(a);
            dropdown.appendChild(li);
            for (let index = 0; index < response.length; index++) {
                const element = response[index];
                var li = document.createElement("li");
                    var a = document.createElement("a");
                        a.classList.add("dropdown-item");
                        a.innerText = element['categoria']
                        a.onclick = function() {getAllProductos(element['categoria'])};
                    li.appendChild(a);
                dropdown.appendChild(li);
            }
        });
    }

    function getAllProductos(categoria) {
        categoriaAll = categoria
        let filter = document.getElementById('search-item').value
        let url = "/api/producto?filter="+filter+'&categoria='+categoriaAll;
        console.log(url)
        fetch(url, {
            method: "GET"
        }).then(res => res.json())
            .catch(error => {
            })
        .then(response => {
            console.log(response)
            const contentCourse = document.getElementById('content-course');
            contentCourse.innerHTML = '';
            for (let index = 0; index < response.length; index++) {
                const element = response[index];
                var cardRounded = document.createElement("div");
                    cardRounded.classList.add("col-md-4");
                    cardRounded.classList.add("col-lg-3");
                    cardRounded.classList.add("col-xl-3");
                    cardRounded.classList.add("pro-container");
                        var cardBody = document.createElement("div");
                        cardBody.classList.add("pro");
                            const img = document.createElement('img');
                            img.src = element['urlPhoto']
                            cardBody.appendChild(img);
                            var des = document.createElement("div");
                            des.classList.add("des");
                                var span = document.createElement("span");
                                span.innerText = element['core']
                                des.appendChild(span);
                                var h5 = document.createElement("h5");
                                h5.innerText = element['name']
                                des.appendChild(h5);
                                var span = document.createElement("span");
                                span.classList.add("badge");
                                span.classList.add("bg-primary");
                                span.innerText = element['categoria']
                                span.style.color = "white";
                                des.appendChild(span);

                                    var star = document.createElement("div");
                                    star.classList.add("star");
                                        var i;
                                        for (let index2 = 0; index2 < element['cant_star']; index2++) {
                                            i = document.createElement("i");
                                            i.classList.add("fas");
                                            i.classList.add("fa-star");
                                            star.appendChild(i);
                                        }
                                des.appendChild(star);
                                var h4 = document.createElement("h4");
                                h4.innerText = '$'+element['precio']
                                des.appendChild(h4);
                                var a = document.createElement("a");
                                a.classList.add("btn");
                                a.classList.add("btn-primary");
                                a.classList.add("active");
                                a.onclick = function() { addCarts(element['id'],element['precio'])}
                                a.innerText ='Agregar al carrito'
                                a.style.width = '100%'
                                des.appendChild(a);

                            cardBody.appendChild(des);
                        cardRounded.appendChild(cardBody);
                    
                contentCourse.appendChild(cardRounded);
            }
        });
    }
    document.getElementById("search-item").onkeyup = function() {getAllProductos(categoriaAll)};
    getCategorias()
    getAllProductos(categoriaAll)
    getCantCart()
})