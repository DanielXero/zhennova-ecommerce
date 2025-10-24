const { users } = require("../db/database");

const Joi = require("joi");
const bcrypt = require("bcrypt");

// Esquema de validación con Joi
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.",
    }),
    role: Joi.string().valid('user', 'admin').required(),
});

// Controlador para crear un nuevo usuario
const createUserController = async (userData) => {
  // Validación con Joi
  const { error } = userSchema.validate(userData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { name, email, password, role } = userData;
  
  // Verificar si el email ya existe
  const emailExists = users.some(user => user.email === email);
  if (emailExists) {
    throw new Error('El email ya está registrado');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const id = users.length + 1;

  const newUser = { id, name, email, name, password: hashPassword, role };
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
const updateUserController = async (id, userData) => {
  const userById = users.find((user) => user.id === Number(id));

  if (!userById) {
    throw new Error(`No se encontró un usuario con ID ${id}`);
  }

  const { error } = userSchema.validate(userData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { name, email, password, role } = userData;

    // Buscar si ya existe otro usuario con ese email (excluyendo al actual)
  const emailExists = users.some(user => 
    user.email === email && user.id !== Number(id)
  );

  if (emailExists) {
    throw new Error('El email ya está en uso por otro usuario');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { name, email, password, role };

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
