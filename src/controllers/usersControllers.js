const User = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

// Esquema de validación con Joi
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.",
    }),
  role: Joi.string().valid("user", "admin").optional().default("user"),
});

// Controlador para crear un nuevo usuario
const createUserController = async (userData) => {
  // Validación con Joi
  const { error } = userSchema.validate(userData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { name, username, email, password, role } = userData;

  // Verificar si el email ya existe
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) {
    throw new Error("El email ya está registrado");
  }

  // Verificar si el username ya existe
  const usernameExists = await User.findOne({ where: { username } });
  if (usernameExists) {
    throw new Error("El nombre de usuario ya está en uso");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  // Crear el usuario
  const newUser = await User.create({
    name,
    username,
    email,
    password_hash: hashPassword,
    role_id: role === "admin" ? 2 : 1,
  });

  const { password_hash, ...userWithoutPassword } = newUser.toJSON();
  return { message: "Nuevo usuario creado", newUser: userWithoutPassword };
};

// Controlador para obtener todos los usuarios
const getAllUsersController = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password_hash"] },
  });
  return users;
};

// Controlador para obtener usuarios por nombre
const getUsersByNameController = async (name) => {
  const userByName = await User.findAll({
    where: { name },
    attributes: { exclude: ["password_hash"] },
  });
  if (userByName.length === 0) {
    throw new Error("No se encontró el usuario con ese nombre");
  }
  return userByName;
};
// Controlador para obtener un usuario por ID
const getOneUserById = async (id) => {
  const userById = await User.findByPk(id, {
    attributes: { exclude: ["password_hash"] },
  });
  if (!userById) {
    throw new Error("No se encontró el usuario con ese ID");
  }
  return userById;
};
// userById

// Controlador para actualizar un usuario por ID
const updateUserController = async (id, userData) => {
  // Validación
  const { error } = userSchema.validate(userData, { stripUnknown: true });
  if (error) {
    throw new Error(error.details[0].message);
  }

  // Buscar usuario (incluye eliminados lógicamente)
  const user = await User.findByPk(id, { paranoid: false });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Si el usuario estaba eliminado, restaurarlo implícitamente
  if (user.deletedAt !== null) {
    await user.restore();
  }

  // Si se actualiza el email, verificar que no esté en uso (por otro usuario)
  if (userData.email) {
    const emailExists = await User.findOne({
      where: { 
        email: userData.email, 
        id: { [Op.ne]: id }
      },
      paranoid: false,
    });
    if (emailExists) {
      throw new Error("El email ya está en uso por otro usuario");
    }
  }

  // Si se actualiza el username, verificar unicidad
  if (userData.username) {
    const usernameExists = await User.findOne({
      where: {
        username: userData.username,
        id: { [Op.ne]: id } 
      },
      paranoid: false,
    });
    if (usernameExists) {
      throw new Error("El nombre de usuario ya está en uso");
    }
  }

  // Hashear nueva contraseña si se envía
  if (userData.password) {
    userData.password_hash = await bcrypt.hash(userData.password, 10);
    delete userData.password; 
  }

  // Mapear rol a role_id
  if (userData.role) {
    userData.role_id = userData.role === "admin" ? 2 : 1;
    delete userData.role;
  }

  // Actualizar campos
  await user.update(userData, {
    where: {id}
  });

  // Devolver sin password_hash ni deletedAt
  const { password_hash, deletedAt, ...userWithoutSensitiveData } =
    user.toJSON();
  return userWithoutSensitiveData;
};

// Controlador para eliminar un usuario por ID
const deleteUserController = async (id) => {
  const userDelete = await User.findByPk(id);
  if (!userDelete) {
    throw new Error("Usuario no encontrado");
  }
  await userDelete.destroy();
  return userDelete;
};

// Controlador para restaurar usuario eliminado
const restoreUserController = async (id) => {
  const user = await User.findByPk(id, { paranoid: false }); // 👈 Incluye eliminados
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  if (!user.deletedAt) {
    throw new Error("El usuario no estaba eliminado");
  }
  await user.restore(); // Esto hace UPDATE SET deleted_at = NULL
  return user;
};

module.exports = {
  createUserController,
  getAllUsersController,
  getUsersByNameController,
  getOneUserById,
  updateUserController,
  deleteUserController,
  restoreUserController,
};
