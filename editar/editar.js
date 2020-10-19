(function () {

    var libros = Libros.cargarLibrosDeLocalStorage();

    var libro = null;
    // esta funcion se engancha al evento ready del document.
    $(document).ready(() => {
        var condicion = $.urlParam("isbn");
        libro = libros.find(c => c.isbn === condicion);
        //console.info(libro);

        Utils.renderHandlebarTemplate(
            "#libro-form-template",
            "#libro-contenedor",
            { libro: libro });



        $("#libro-form").submit((evento) => {
            var inputs = $("#libro-form input[type=\"text\"]");
            console.info(inputs);
            var titulo = $(inputs[0]).val();
            var autor = $(inputs[1]).val();
            var isbn = $(inputs[2]).val();
            var tema = $(inputs[3]).val();
            var stock = $(inputs[4]).val();
            var precio = $(inputs[5]).val();

            var datos = localStorage.getItem("libros");
            var arraydatos = JSON.parse(datos);
            arraydatos.forEach(libro => {
                if (isbn === libro.isbn) {
                    libro.titulo = titulo;
                    libro.autor = autor;
                    libro.isbn = isbn;
                    libro.tema = tema;
                    libro.stock = stock;
                    libro.precio = precio;

                    var json = JSON.stringify(arraydatos);
                    localStorage.setItem("libros", json)
                }
            });



        });

        $("#libro-editar").click(() => {
            $('.input-editable').attr('readonly', false);
        });

    });

    // console.info($.urlParam("isbn"));
}());