import app from './app.js'
import {sequelize} from './database/database.js'

//Tablas
import "./models/Incidencia.js"
import "./models/Afectaciones.js"
import "./models/Categoria.js"
import "./models/Prioridad.js"
import "./models/Riesgos.js"
import "./models/Estados.js"
import "./models/Imagenes.js"
import "./models/Usuarios.js"
import "./models/Departamento.js"
import "./models/Diagnostico.js"
import "./models/Pantallas.js"
import "./models/BitacoraGeneral.js"
import "./models/PantallaxRol.js"
import "./models/Roles.js"
import "./models/UsuariosXRoles.js"
import "./models/BitcaoraEstado.js"
import "./models/Incidencia_diagnostico.js"
import "./models/Asigna.js"





async function main() {
    try {
      
      await sequelize.sync();
  
      app.listen(3000);
      console.log("Server is listening");
    } catch (error) {
      console.log("Error al conectarse a la base de datos",error)
    }
  }
  main();