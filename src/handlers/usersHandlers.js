const {
  createUserController,
  getAllUsersController,
  getUsersByNameController,
  getOneUserById,
  updateUserController,
  deleteUserController,
  restoreUserController
} = require("../controllers/usersControllers");

// Handler para obtener todos los usuarios
const getAllUsersHandler = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (name) {
      const response = await getUsersByNameController(name);
      res.status(200).send(response);
    } else {
      const response = await getAllUsersController();
      res.status(200).send(response);
    }
  } catch (error) {
    next(error);
  }
};

// Handler para obtener un usuario por ID
const getOneUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await getOneUserById(id);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

// Handler para crear un nuevo usuario
const createUserHandler = async (req, res, next) => {
  try {
    const response = await createUserController(req.body);

    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
};

// Handler para actualizar un usuario
const updateUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await updateUserController(id, req.body);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

// Handler para eliminar un usuario
const deleteUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await deleteUserController(id);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const restoreUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await restoreUserController(id);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  restoreUserHandler,
};
