// Handler para obtener todos los usuarios
const getAllUsersHandler = (req, res) => {
  const { name } = req.query; // Filtro opcional por nombre

  if (name) {
    return res.status(200).json({
      message: `Usuario(s) con nombre que contiene "${name}"`,
      users: [
        { id: 1, name: "Juan Pérez", email: "juan@zhennova.com" },
        { id: 2, name: "María López", email: "maria@zhennova.com" },
      ].filter((u) => u.name.toLowerCase().includes(name.toLowerCase())),
    });
  } else {
    res.status(200).json({
      message: "Lista de usuarios de Zhennova",
      users: [
        { id: 1, name: "Juan Pérez", email: "juan@zhennova.com" },
        { id: 2, name: "María López", email: "maria@zhennova.com" },
        { id: 3, name: "Carlos Gómez", email: "carlos@zhennova.com" },
      ],
    });
  }
};

// Handler para obtener un usuario por ID
const getOneUserHandler = (req, res) => {
  const { id } = req.params;
  const userId = Number(id);

  const usuarios = {
    1: { id: 1, name: "Juan Pérez", email: "juan@zhennova.com" },
    2: { id: 2, name: "María López", email: "maria@zhennova.com" },
  };

  const user = usuarios[userId];

  if (!user) {
    return res.status(404).json({
      message: `Usuario con ID ${id} no encontrado`,
    });
  } else {
    res.status(200).json({
      message: `Usuario con ID ${id}`,
      user,
    });
  }
};

// Handler para crear un nuevo usuario
const createUserHandler = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Faltan datos obligatorios: name y email",
    });
  } else {
    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: { id: Date.now(), name, email },
    });
  }
};

// Handler para actualizar un usuario
const updateUserHandler = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  res.status(200).json({
    message: `Usuario con ID ${id} actualizado`,
    user: { id: Number(id), name, email },
  });
};

// Handler para eliminar un usuario
const deleteUserHandler = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    message: `Usuario con ID ${id} eliminado`,
  });
};

module.exports = {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
