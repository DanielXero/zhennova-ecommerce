const {users} = require("../db/database");

const createUserController = (name, email) => {
  const id = users.length + 1;

  const newUser = { id, name, email };
  if (!name || !email) throw new Error("Los datos estan incompletos");
  users.push(newUser);
  return newUser;
};

const getAllUsersController = () => {
  return users;
};

const getUsersByNameController = (name) => {
  const userByName = users.filter((user) => user.name === name);
  if (!userByName.length)
    throw new Error("No se encontro el user con ese nombre");
  return userByName;
};

const getOneUserById = (id) => {
  const userById = users.find((user) => user.id === Number(id));
  if (!userById) throw new Error("No se encontro el usuario con ese ID");
  return userById;
};

const updateUserController = (id, name, email) => {
  const userById = users.find((user) => user.id === Number(id));

  if (!userById) {
    throw new Error(`No se encontró un usuario con ID ${id}`);
  }

  const newUser = { name, email };

  if (userById) {
    Object.assign(userById, newUser);
  }
  return userById;
};

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
