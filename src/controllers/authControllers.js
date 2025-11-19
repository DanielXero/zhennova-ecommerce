const { users } = require("../db/database");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Joi = require("joi");
require('dotenv').config({quiet: true})

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
    id_rol: Joi.number().integer().valid(1, 2).required()
});

// Controlador para registrar un usuario
const registerController = async (userData) => {
  // Validación con Joi
  const { error } = userSchema.validate(userData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { name, email, password, id_rol } = userData;
  
  // Verificar si el email ya existe
  const emailExists = users.some(user => user.email === email);
  if (emailExists) {
    throw new Error('El email ya está registrado');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const id = users.length + 1;

  const newUser = { id, name, email, password: hashPassword, id_rol };
  users.push(newUser);
  return newUser;
};

// Controlador para iniciar sesión
const loginController = async (loginData) => {
  const { email, password } = loginData;

  if (!email || !password) {
    throw new Error('Email y contraseña son obligatorios');
  }

  // Buscar usuario por email
  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error('El usuario no esta registrado');
  }

  // Verificar contraseña
  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    throw new Error('La contraseña es incorrecta');
  }

  // Generar JWT
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'zhennova-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );

  // Eliminar contraseña de la respuesta
  const { password: _, ...userWithoutPassword } = user;

  return { message: "Inicio de sesion exitoso", token, user: userWithoutPassword };
};


module.exports = {
  registerController,
  loginController,
};




