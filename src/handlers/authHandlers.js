const {
  registerController,
  loginController,
} = require("../controllers/authControllers");

// Handler para registrar un nuevo usuario
const registerHandler = async (req, res) => {
  try {
    const response = await registerController(req.body);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message})
  }
};

// Handler para iniciar sesión
const loginHandler = async (req, res) => {
  try {
    const response = await loginController(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message})
  }
};



module.exports = {
  registerHandler,
  loginHandler
};