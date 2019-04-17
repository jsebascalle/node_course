// Form params 
 
var http = require("http"), 
 fs = require("fs"); 
 
http.createServer(function(req, res){ 
 if (req.url.indexOf("favicon.ico")>0) {return;} 
  //console.log("=======\n\n") 
  //console.log(req); 
  //console.log("=======\n\n") 
  fs.readFile("./index.html", function(err, html) {

      var html_string = html.toString();
      var arreglo_parametros = [],
          parametros = {};
      var variables = html_string.match(/[^\{\}]+(?=\})/g);
      var nombre = "";

      if (req.url.indexOf("?") > 0) {
          // separar el / path de los parametros
          // http://localhost:8080/?nombre=Erick&data=algo => ['/','nombre=Erick&data=algo']
          var url_data = req.url.split("?");
          var arreglo_parametros = url_data[1].split("&");
          // [nombre=Erick,data=algo]
          console.log(arreglo_parametros);
      }
      for (var i = arreglo_parametros.length - 1; i >= 0; i--) {
          var parametro = arreglo_parametros[i];
          // nombre=Erick
          var param_data = parametro.split("=");
          // [nombre,Erick]
          parametros[param_data[0]] = param_data[1];
          // {nombre: Erick}
      };
      for (var i = variables.length - 1; i >= 0; i--) {
          //[nombre,apellido]
          var variable = variables[i];
          // parametros[variables[i]]
          //parametros[i]
          html_string = html_string.replace("{" + variables[i] + "}", parametros[variable]);
      };

      res.writeHead(200, {
          "Content-Type": "text/html"
      });
      res.write(html_string);
      res.end();
  });
}).listen(3000); 