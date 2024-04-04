const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthModel = require('../models/AuthModel');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica si el usuario existe en la base de datos
        const user = await AuthModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario o contraseña inválida' });
        }

        // Verifica si la contraseña es correcta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Usuario o contraseña inválida' });
        }

        // Genera un token de autenticación
        const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

        // Envía el token como respuesta
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
