document.addEventListener('DOMContentLoaded', function() {
    function getAllProductos() {
        let filter = document.getElementById('search-item').value
        let url = "/api/producto?filter="+filter;
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
                                a.innerText ='Agregar al carrito'
                                a.style.width = '100%'
                                des.appendChild(a);

                            cardBody.appendChild(des);
                        cardRounded.appendChild(cardBody);
                    
                contentCourse.appendChild(cardRounded);
            }
        });
    }
    document.getElementById("search-item").onkeyup = function() {getAllProductos()};
    
    getAllProductos()
})