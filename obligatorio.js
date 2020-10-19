(function () {

  if (localStorage.getItem("libros") === null) {
    console.info("creando array de libros");
    localStorage.setItem("libros", "[]");
  }


  $(document).ready(() => {
    try {
      $('#libros-contenedor').toggle();

      $('#btn-toggle-tabla').click((event) => {
        $('#libros-contenedor').toggle();
      });

    } catch (error) {
      console.error(error);
    }
  });


  function Libro(titulo, autor, isbn, tema, stock, precio) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.tema = tema;
    this.stock = stock;
    this.precio = precio;
  };


  $(document).ready(function () {

    var colorTema;

    var datos = localStorage.getItem("libros");
    var arraydatos = JSON.parse(datos);
    arraydatos.forEach(libro => {
      if (libro.tema === "policial") {
        colorTema = "orange";
      } else if (libro.tema === "novela") {
        colorTema = "burlywood";
      } else if (libro.tema === "terror") {
        colorTema = "coral";
      } else if (libro.tema === "infantil") {
        colorTema = "cyan";
      } else if (libro.tema === "cocina") {
        colorTema = "darkkhaki";
      } else if (libro.tema === "autoayuda") {
        colorTema === "darksalmon";
      } else {

      }

      Utils.renderHandlebarTemplate(
      "#libro-template",
      "#libros-contenedor",
      { title: "Detalles", libro: libro, colorTema: colorTema }
    )
    })
})

document.agregar = () => {
  $(".alert").css("display", "none");
  var titulo = document.getElementById("txtTitulo").value;
  var autor = document.getElementById("txtAutor").value;
  var isbn = document.getElementById("numbISBN").value;
  var tema = document.getElementById("txtTema").value;
  var stock = document.getElementById("numbStock").value;
  var precio = document.getElementById("numbPrecio").value;


  var existe = 0;
  var datas = localStorage.getItem("libros");
  var arrayDatas = JSON.parse(datas);
  arrayDatas.forEach(element => {
    if (isbn === element.isbn && titulo === element.titulo && autor === element.autor &&
      tema === element.tema && precio === element.precio) {
      existe = 1;
    }
    else if (isbn === element.isbn) {
      existe = 2;
    }
  });


  if (existe === 1) {

    var datas = localStorage.getItem("libros");
    var arrayDatas = JSON.parse(datas);
    arrayDatas.forEach(element => {
      if (isbn === element.isbn) {
        element.stock = parseInt(element.stock) + parseInt(stock)
      }
    });
    // transformo el objeto contacto en un json
    var json = JSON.stringify(datosArray);
    // uso el nombre como clave y la variable json como valor
    localStorage.setItem("libros", json);

    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtAutor").value = "";
    document.getElementById("numbISBN").value = "";
    document.getElementById("txtTema").value = "";
    document.getElementById("numbStock").value = "";
    document.getElementById("numbPrecio").value = "";

  }
  else if (existe === 2) {
    console.info("ya existe");
  }
  else if (existe === 0) {
    var libro = new Libro(titulo, autor, isbn, tema, stock, precio);
    var datos = localStorage.getItem("libros");
    var datosArray = JSON.parse(datos);
    
    datosArray.push(libro);

    // transformo el objeto libro en un json
    var json = JSON.stringify(datosArray);
    // uso el nombre como clave y la variable json como valor
    localStorage.setItem("libros", json);

    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtAutor").value = "";
    document.getElementById("numbISBN").value = "";
    document.getElementById("txtTema").value = "";
    document.getElementById("numbStock").value = "";
    document.getElementById("numbPrecio").value = "";



    $("#libroAgregado").css("display", "inline");
  } else if (existe === 1) {
    var datos = localStorage.getItem("libros");
    var datosArray = JSON.parse(datos);
    datosArray.forEach((libro) => {
      if (libro.isbn === document.getElementById("numbISBN").value) {
        libro.stock = parseInt(libro.stock) + parseInt(document.getElementById("numbStock").value);
      }
    })
    datosArrayJson = JSON.stringify(datosArray);
    localStorage.setItem("libros", datosArrayJson);
    $("#libroAgregado").css("display", "inline");
  };
  location.reload();
}


document.searchBook = () => {
  $('#resultado').html("");
  $("#noExisteIsbn").css("display", "none");
  $("#noStock").css("display", "none");
  var existeLibro = 0;
  var hayStock = 0;
  var libroParaTempleate;
  var toSearchIsbn = $('#myInput').val();
  var datos = localStorage.getItem("libros");
  var arrayDatas = JSON.parse(datos);
  arrayDatas.forEach(element => {
    if (toSearchIsbn === element.isbn) {
      existeLibro = 1;
      if (element.stock > 0) {
        hayStock = 1;
      }
      libroParaTempleate = element;
    } else {

    }
  });

  if (existeLibro === 1 && hayStock === 1) {
    Utils.renderHandlebarTemplate(
      "#libro-template",
      "#resultado", {
        element: libroParaTempleate
      });
  } else if (existeLibro === 0) {
    $("#noExisteIsbn").css("display", "inline");
  } else if (hayStock === 0) {
    $("#noStock").css("display", "inline");
  }
  else {
    $("#noExisteIsbn").css("display", "inline");
  }


};





// filtra para la consulta
filtrar = () => {
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $('tr')
      .filter(".isbn_dato")
      .toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });

  $('#myInput').keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
  });
};

filtrarVenta = () => {
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
};




var libros = Libro.cargarLibrosDeLocalStorage = () => {

  var libro = null;
  // esta funcion se engancha al evento ready del document.
  $(document).ready(() => {
    var condicion = $.urlParam("libro");
    libro = libros.find(c => c.libro === condicion);
    console.info(libro);

    var colorTema;

    var datos = localStorage.getItem("libros");
    var arraydatos = JSON.parse(datos);
    arraydatos.forEach(libro => {
      if (libro.tema === "policial") {
        colorTema = "orange"
      } else if (libro.tema === "novela") {
        colorTema = "burlywood";
      } else if (libro.tema === "terror") {
        colorTema = "coral";
      } else if (libro.tema === "infantil") {
        colorTema = "cyan";
      } else if (libro.tema === "cocina") {
        colorTema = "darkkhaki";
      } else if (libro.tema === "autoayuda") {
        colorTema === "darksalmon";
      } else {

      
      }
      Utils.renderHandlebarTemplate(
        "#libro-form-template",
        "#libro-contenedor",
        { libro: libro, colorTema: colorTema });
    })



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

  });

};

}());