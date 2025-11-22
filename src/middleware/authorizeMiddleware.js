const autorizationAdmin = (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== 'admin') {
    return res.status(400).send("Acceso denegado: se requiere rol de administrador");
  }
  next();
};

module.exports = autorizationAdmin;