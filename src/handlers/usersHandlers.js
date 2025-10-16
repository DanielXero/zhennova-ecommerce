const {
  createUserController,
  getAllUsersController,
  getUsersByNameController,
  getOneUserById,
  updateUserController,
  deleteUserController,
} = require("../controllers/usersControllers");

// Handler para obtener todos los usuarios
const getAllUsersHandler = (req, res) => {
  try {
    const { name } = req.query;

    if (name) {
      const response = getUsersByNameController(name);
      res.status(200).send(response);
    } else {
      const response = getAllUsersController();
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

// Handler para obtener un usuario por ID
const getOneUserHandler = (req, res) => {
  try {
    const { id } = req.params;
    const response = getOneUserById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

// Handler para crear un nuevo usuario
const createUserHandler = (req, res) => {
  try {
    const response = createUserController(req.body);

    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

// Handler para actualizar un usuario
const updateUserHandler = (req, res) => {
  try {
    const { id } = req.params;

    const response = updateUserController(id, req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

// Handler para eliminar un usuario
const deleteUserHandler = (req, res) => {
  try {
    const { id } = req.params;

    const response = deleteUserController(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
