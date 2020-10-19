var vendeLibro = (toSearchIsbn) => {
    $("#isbnExiste").css("display", "none");
    $("#libroVendido").css("display", "none");
    $("#libroAgregado").css("display", "none");
    var index = 0;
    var existe = 0;
    var titulo;
    var autor;
    var isbn;
    var tema;
    var stock;
    var precio;

    var datas = localStorage.getItem("libros");
    var arrayDatas = JSON.parse(datas);
    for (var i = 0; i < arrayDatas.length; i++) {
        var element = arrayDatas[i];
        if (toSearchIsbn === element.isbn && element.stock > 0) {
            element.stock = parseInt(element.stock) - parseInt(1);
            titulo = element.titulo;
            autor = element.autor;
            isbn = element.isbn;
            tema = element.tema;
            stock = element.stock;
            precio = element.precio;
            console.info(element);
            index = i;
            existe = 1;

        } else {
        }

    }


    libro = new Libro(titulo, autor, isbn, tema, stock, precio);
    arrayDatas.splice(index, 1);
    arrayDatas.push(libro);
    var json = JSON.stringify(arrayDatas);
    localStorage.setItem("libros", json);
    if (existe === 0) {
        $("#isbnNoExiste").css("display", "inline");
    } else {
        $("#libroVendido").css("display", "inline");

    }


}
