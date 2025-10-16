const { users } = require("../db/database");

const Joi = require("joi");

// Esquema de validación con Joi
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

// Controlador para crear un nuevo usuario
const createUserController = (userData) => {
  // Validación con Joi
  const { error } = userSchema.validate(userData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { name, email } = userData;
  const id = users.length + 1;

  const newUser = { id, name, email };
  users.push(newUser);
  return newUser;
};

// Controlador para obtener todos los usuarios
const getAllUsersController = () => {
  return users;
};

// Controlador para obtener usuarios por nombre
const getUsersByNameController = (name) => {
  const userByName = users.filter((user) => user.name === name);
  if (!userByName.length)
    throw new Error("No se encontro el usuario con ese nombre");
  return userByName;
};
// Controlador para obtener un usuario por ID
const getOneUserById = (id) => {
  const userById = users.find((user) => user.id === Number(id));
  if (!userById) throw new Error("No se encontro el usuario con ese ID");
  return userById;
};

// Controlador para actualizar un usuario por ID
const updateUserController = (id, userData) => {
  const userById = users.find((user) => user.id === Number(id));

  if (!userById) {
    throw new Error(`No se encontró un usuario con ID ${id}`);
  }

  const { error } = userSchema.validate(userData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { name, email } = userData;

  const newUser = { name, email };

  if (userById) {
    Object.assign(userById, newUser);
  }
  return userById;
};

// Controlador para eliminar un usuario por ID
const deleteUserController = (id) => {
  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index === -1) {
    throw new Error(`No se encontró un usuario con ID ${id}`);
  }

  const deleteUserArray = users.splice(index, 1);

  const deleteUser = deleteUserArray[0];
  return deleteUser;
};

module.exports = {
  createUserController,
  getAllUsersController,
  getUsersByNameController,
  getOneUserById,
  updateUserController,
  deleteUserController,
};
