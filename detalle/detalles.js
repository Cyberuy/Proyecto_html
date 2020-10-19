(function () {

    var libros = Libro.cargarLibrosDeLocalStorage = () => {

        var libro = null;
        // esta funcion se engancha al evento ready del document.
        $(document).ready(() => {
            var condicion = $.urlParam("libro");
            libro = libros.find(c => c.libro === condicion);
            console.info(libro);

            Utils.renderHandlebarTemplate(
                "#libro-form-template",
                "#libro-contenedor",
                { libro: libro });


            $('#select-colores-contenedor select').change((event) => {
                var value = $('#select-colores-contenedor select option:selected').val();
                console.info(value);
                $(".libro-form_nombre").css("background-color", value);
            });

            $("#libro-form").submit((evento) => {
                var inputs = $("#libro-form input[type=\"text\"]");
                console.info(inputs);
                var titulo = $(inputs[0]).val();
                var autor = $(inputs[1]).val();
                var isbn = $(inputs[2]).val();
                var tema = $(inputs[3]).val();
                var stock = $(inputs[4]).val();
                var precio = $(inputs[5]).val();

                libro.titulo = titulo;
                libro.autor = autor;
                libro.isbn = isbn;
                libro.tema = tema;
                libro.stock = stock;
                libro.precio = precio;

                Libro.guardarLibrosEnLocalStorage(libros);

                return false;
            });

            $("#libro-editar").click(() => {
                $('.input-editable').attr('readonly', false);
            });

        });

    };

}());