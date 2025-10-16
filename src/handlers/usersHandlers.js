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
  const { name } = req.query;

  if (name) {
    const response = getUsersByNameController(name);
    res.status(200).send(response);
  } else {
    const response = getAllUsersController();
    res.status(200).send(response);
  }
};

// Handler para obtener un usuario por ID
const getOneUserHandler = (req, res) => {
  const { id } = req.params;

  const response = getOneUserById(id);

  res.status(200).send(response);
};

// Handler para crear un nuevo usuario
const createUserHandler = (req, res) => {
  const { name, email } = req.body;

  const response = createUserController(name, email);

  res.status(201).send(response);
};

// Handler para actualizar un usuario
const updateUserHandler = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const response = updateUserController(id, name, email);
  res.status(200).send(response);
};

// Handler para eliminar un usuario
const deleteUserHandler = (req, res) => {
  const { id } = req.params;

  const response = deleteUserController(id);
  res.status(200).send(response);
};

module.exports = {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
