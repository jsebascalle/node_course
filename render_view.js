function render(html_string,parametros) {
  var variables = html_string.match(/[^\{\}]+(?=\})/g);
  var nombre = "";
  for (var i = variables.length - 1; i >= 0; i--) {
          //[nombre,apellido]
          var variable = variables[i];
          // parametros[variables[i]]
          //parametros[i]
          html_string = html_string.replace("{" + variables[i] + "}", parametros[variable]);
      };

      
  return html_string;
}

module.exports.render=render;