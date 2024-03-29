var categoriaAll = ''
const user_id = '1'

document.addEventListener('DOMContentLoaded', function() {
    user()
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

   