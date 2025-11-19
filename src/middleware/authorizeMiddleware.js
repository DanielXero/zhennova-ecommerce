const autorizationAdmin = (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== 2) {
    return res.status(400).send("Acceso denegado");
  }
  next();
};

module.exports = autorizationAdmin;