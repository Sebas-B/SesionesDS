const mongoose = require('mongoose');

//Definit el esquemavde la coleccion ventas
mongoose.model('canciones', {
 nombreCancion: {
  type: String,
  require: true,
  unique: false,
  max: 50,
  min: 3
},

 nombreArtista: {
  type: String,
  require: true,
  unique: false,
  max: 50,
  min: 3
},

 nombreAlbum: {
  type: String,
  require: true,
  unique: false,
  max: 50,
  min: 3
},

 lanzamiento: {
  type: Number,
  require: true,
  min: 3
},

 escritores: {
  type: String,
  require: true,
  unique: false,
  max: 50,
  min: 3
},

 productores: {
  type: String,
  require: true,
  max: 50,
  min: 3
},

 disquera: {
 type: String,
  require: true,
  unique: false,
  max: 50,
  min: 3
}
});
