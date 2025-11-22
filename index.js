const app = require("./src/app");
require("dotenv").config({ quiet: true });
const sequelize = require("./src/db/database");

require("./src/db/associations");




const PORT = process.env.PORT || 3001;

async function main() {
  try {
    await sequelize.sync(); 
    console.log("Conexión a la base de datos establecida correctamente.");

    app.listen(PORT, () => {
      console.log(`Servidor Zhennova escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}

main();
