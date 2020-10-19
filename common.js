// funcion auxiliar que permite obtener valores de la url

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.search);

    return (results !== null) ? results[1] || 0 : false;
};

var Libros = {
    cargarLibrosDeLocalStorage: () => {
        var string = localStorage.getItem("libros");
        var libros = JSON.parse(string);
        return libros;
    },
    guardarLibrosEnLocalStorage: (libros) => {
        var json = JSON.stringify(libros);
        localStorage.setItem('libros', json);
    }
};

var Categorias = {
    cargarCategoriasDeLocalStorage: () => {
        var string = localStorage.getItem("categorias");
        var categorias = JSON.parse(string);
        return categorias;
    },
    guardarCategoriasEnLocalStorage: (categorias) => {
        var json = JSON.stringify(categorias);
        localStorage.setItem('categorias', json);
    },
    
}

var Utils = {
    renderHandlebarTemplate: (origen, destino, context) => {
        // consigue el source del template declarado en index.html
        var source = $(origen).html();
        // transforma el source a un template de handlebars
        var template = Handlebars.compile(source);
        // el objecto context lo usamos para enviar datos al template
        //var context = {contacto: contacto};
        // transformamos el template en html
        var html = template(context);
        // agregamos el html al contenedor
        $(destino).append(html);
    }
};

function Libro(titulo, autor, isbn, tema, stock, precio) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.tema = tema;
    this.stock = stock;
    this.precio = precio;
};

Libro.prototype.mostrar = function () {
    return this.titulo + " - " + this.autor + " - " + this.isbn + " - " + this.tema + " - " + this.stock + " - " + this.precio;
};

function Categoria(nombre, color) {
    this.nombre = nombre;
    this.color = color;
}

$(document).ready(function () {
    $("#txtTema").change(function () {
        var colorCategoria = $("#txtTema option:selected").css("background-color");
        $("#txtTema").css("background-color", colorCategoria);
    });

});