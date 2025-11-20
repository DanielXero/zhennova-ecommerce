const {
  registerController,
  loginController,
} = require("../controllers/authControllers");

// Handler para registrar un nuevo usuario
const registerHandler = async (req, res, next) => {
  try {
    const response = await registerController(req.body);
    res.status(201).send(response);
  } catch (error) {
     next(error);
  }
};

// Handler para iniciar sesión
const loginHandler = async (req, res, next) => {
  try {
    const response = await loginController(req.body);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};



module.exports = {
  registerHandler,
  loginHandler
};