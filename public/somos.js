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
})