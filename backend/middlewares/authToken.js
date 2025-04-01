// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
    // Obtener el token de los encabezados (Authorization: Bearer <token>)
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    // Verificar el token usando la clave secreta
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token is not valid' });
      }
      req.user = user; // Adjuntamos la información del usuario al objeto de la solicitud
      next(); // Si todo es correcto, pasamos al siguiente middleware o ruta
    });
  };