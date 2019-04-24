# node_course
Curso NodeJs

- nodemon: para evitar reiniciar el servidor.  npm install -g nodemon 

- method-override : Para permitir utilizar PUT , DELETE . npm install method-override --save

- express-formidable : para subir archivo.  npm install express-formidable --save

  add form enctype="multipart/form-data"
  var ext = req.body.archivo.name.split(".").pop();
  fs.rename(req.body.archivo.path,"public/uploads/"+archivo._id+"."+ext);


- connect-redis : para concetar a redis y guardar datos de sesion

https://github.com/MicrosoftArchive/redis/releases