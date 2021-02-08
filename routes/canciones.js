var express = require('express');
var router = express.Router();
var request = require('request');

const { isAuthenticated } = require('../helpers/auth');

//LISTADO DE CANCIONES.
router.get('/', isAuthenticated, (req, res, next) => {
  request.get("https://nopedipermiso-crud.herokuapp.com/canciones", (error, response, body) => {
   mensaje= '';

  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }
  console.log(JSON.parse(body));
  //Enviamos la informacion a la vista eb formato JSON
  res.render('canciones', {page:'Crud', mensaje: mensaje, data: JSON.parse(body)

});
});
});



//Mostar por ID
router.get('/viewCancion/:_id', isAuthenticated, async function(req, res, next) {

   id = req.params._id

   URI = "https://nopedipermiso-crud.herokuapp.com/canciones/" + id;

   request.get(URI, (error, response, body) => {

   mensaje= 'Viendo unico registro';

  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }

  console.log(JSON.parse(body));
  //Enviamos la informacion a la vista eb formato JSON
  res.render('viewCancion', {page:'Crud', mensaje: mensaje, data: JSON.parse(body)

});
});
});



//AGREGAR REGISTRO
//pantalla para agregar registro
router.get('/addCancion', isAuthenticated, function(req, res)  {
  mensaje = "Agregando registro";

  //Desplegar pantalla para la captura del registro
  res.render('addCancion', {
    mensaje: mensaje,
    title: "Agregar una cancion",  //Titull de la pagina
    nombreCancion: '',
    nombreArtista: '',
    nombreAlbum: '',
     lanzamiento: '',
    escritores: '',
    productores: '',
    disquera: ''
 });
});

// Agregando un nuevo estudiante a través del Microservicio
router.post('/addCancion', function(req, res, next) {
 //Extrae los datos enviados por la forma
 let nombreCancion = req.body.nombreCancion;
 let nombreAlbum = req.body.nombreAlbum;
 let nombreArtista = req.body.nombreArtista;
 let lanzamiento = req.body.lanzamiento;
 let escritores = req.body.escritores;
 let productores = req.body.productores;
 let disquera = req.body.disquera;

 let errors = false;

 // Si no hay errores
 if (!errors) {
 //Encapsula datos de la forma
     var datosForma = {
     nombreCancion: nombreCancion,
     nombreAlbum: nombreAlbum,
     nombreArtista: nombreArtista,
     lanzamiento: lanzamiento,
     escritores: escritores,
     productores: productores,
     disquera: disquera
 }

 //Invoca al Microservicios
 request.post({ url: "https://nopedipermiso-crud.herokuapp.com/canciones", json: datosForma }, (error, response, body) => {

     mensaje = 'El dato se ha agregado con éxito';
     if (error) {
        console.log(error);
        mensaje = 'Error: ' + error;
      }
        console.log(response);
         res.redirect('/canciones'); //Redirige a Listado de Ventas
 });
 }
});


//EDITAR REGISTRO
router.get('/editarCancion/:_id', (req, res) => {

   id = req.params._id;

   mensaje= 'Modificar registro ' + id;
   console.log(mensaje);

  var cancionesFind;
  //Buscar si la venta existe  con su numero de control
  URI = "https://nopedipermiso-crud.herokuapp.com/canciones/"+id;

  console.log('URI: ' + URI)
  request.get(URI, (error, response, body) => {

  mensaje='';
  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }

 console.log("Cancion Encontrada ===>");
 console.log(body);

//Desplega pantalla para modificar de estudiante
res.render('editarCancion', {
    mensaje: mensaje,
    title: "Modicando Cancion",  //Titull de la pagina
    _id: JSON.parse(body)._id,
    nombreCancion: JSON.parse(body).nombreCancion,
    nombreArtista: JSON.parse(body).nombreArtista,
    nombreAlbum: JSON.parse(body).nombreAlbum,
    lanzamiento: JSON.parse(body).lanzamiento,
    escritores: JSON.parse(body).escritores,
    productores: JSON.parse(body).productores,
    disquera: JSON.parse(body).disquera
 });
});
});

// Modificando un nuevo estudiante a través del Microservicio
router.post('/editarCancion', function(req, res, next) {

 console.log('Modificando una venta');
 //Extrae los datos enviados por la forma
 let _id = req.body._id;
 let nombreCancion = req.body.nombreCancion;
 let nombreArtista = req.body.nombreArtista;
 let nombreAlbum = req.body.nombreAlbum;
 let lanzamiento = req.body.lanzamiento;
 let escritores = req.body.escritores;
 let productores = req.body.productores;
 let disquera = req.body.disquera;

 let errors = false;

 // Si no hay errores
 if (!errors) {
 //Encapsula datos provenientes de la forma
 var datosForma = {
     _id: _id,
     nombreCancion: nombreCancion,
     nombreArtista: nombreArtista,
     nombreAlbum: nombreAlbum,
     lanzamiento: lanzamiento,
     escritores: escritores,
     productores: productores,
     disquera: disquera
 }

//Invoca al Microservicio de modificar
 request.put({ url: "https://nopedipermiso-crud.herokuapp.com/canciones", json: datosForma }, (error, response, body) => {
 mensaje = 'El dato se ha modificado con éxito';
 if (error) {
 console.log(error);
 mensaje = 'Error: ' + error;
 }
 console.log(response);
 res.redirect('/canciones'); //Redirige a Listado de Estudiantes
 });
 }
});




//DELETE
router.get('/borrarCanciones/:_id', isAuthenticated, (req, res) => {

 id = req.params._id;

 mensaje = 'Eliminando el cancion con la clave del producto' + id;

 console.log(mensaje);

 if (id) {
    //Invoca al Microservicios
    URI = "https://nopedipermiso-crud.herokuapp.com/canciones/" + id;
    request.delete(URI, (error, response, body) => {
    mensaje = 'El dato se ha eliminado con éxito';

   if (error) {
      console.log(error);
      mensaje = 'Error: ' + error;
}
    console.log(response);
    res.redirect('/canciones'); //Redirige a Listado de productos
  });
 }
});


module.exports = router;

