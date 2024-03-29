const authModel = require("../models/usermodel");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Correo electrónico recibido:', email);
        console.log('Contraseña recibida:', password);

        // Verificar si el usuario existe en la base de datos
        console.log(email);
        console.log(password);
        const user = await authModel.findOne({email});
        console.log(user);
        if (user && user.email === email) {
            if (user.password === password) {
                res.status(200).json({ message: "Inicio de sesión exitoso" });
            } else {
                // Contraseña incorrecta, mostrar mensaje de error
                res.status(500).json({ error: 'Contraseña incorrecta' });
            }
        } else {
            // Credenciales inválidas, mostrar mensaje de error
            res.status(500).json({ error: 'Usuario no encontrado' });
        }
        
        
    } catch (error) {
        console.error('Error en inicio de sesión:', error);
        res.status(500).json({ error: 'l' });
    }
};

module.exports = {
    loginUser
};
