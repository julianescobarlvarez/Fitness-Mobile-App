import jwt from 'jsonwebtoken'
import User from '../../models/userModel.js'

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Aquí deberías validar las credenciales del usuario con la base de datos
  const user = await User.findOne({ email });
  
  if (!user || user.password !== password) {
    return res.status(400).json({ message: "Credenciales incorrectas" });
  }
  
  const token = jwt.sign({ userId: user._id }, 'tu_clave_secreta', { expiresIn: '1h' });
  
  return res.json({ token });
};

export default loginUser//module.exports = { login };