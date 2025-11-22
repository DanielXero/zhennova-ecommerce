const { User } = require("../db/associations");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config({ quiet: true });

// Esquema de validación con Joi
const registerSchema = Joi.object({
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

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Controlador para registrar un usuario
const registerController = async (userData) => {
  // Validación con Joi
  const { error } = registerSchema.validate(userData);
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

  // Hashear la contraseña
  const hashPassword = await bcrypt.hash(password, 10);

  // Crear el usuario
  const newUser = await User.create({
    name,
    username,
    email,
    password_hash: hashPassword,
    role_id: role === "admin" ? 2 : 1,
  });

  const { password_hash, ...userWithoutPassword } = newUser.toJSON();;
  return { message: "Registro exitoso", newUser: userWithoutPassword };
};

// Controlador para iniciar sesión
const loginController = async (loginData) => {
  // Validación con Joi
  const { error } = loginSchema.validate(loginData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { email, password } = loginData;

  // Buscar usuario por email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("El usuario no esta registrado");
  }

  // Verificar contraseña
  const passMatch = await bcrypt.compare(password, user.password_hash);
  if (!passMatch) {
    throw new Error("La contraseña es incorrecta");
  }

  // Generar JWT
  const token = jwt.sign(
    { id: user.id, role: user.role_id === 2 ? "admin" : "user" },
    process.env.JWT_SECRET || "zhennova-secret-key",
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );

  // Eliminar contraseña de la respuesta
  const plainUser = user.toJSON();
  const { password_hash, ...userWithoutPassword } = plainUser;

  return {
    message: "Inicio de sesion exitoso",
    token,
    user: userWithoutPassword,
  };
};

module.exports = {
  registerController,
  loginController,
};
