function parse(req){
	var arreglo_parametros = [],
          parametros = {};

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

  	return parametros;
}

module.exports.parse = parse;