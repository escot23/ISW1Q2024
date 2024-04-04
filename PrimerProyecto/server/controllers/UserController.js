const UserModel = require('../models/UserModel');

// Función para registrar un usuario
const registerPost = async (req, res) => {
  const { email, password, pin, name, lastName, country, dateOfBirth } = req.body;

  try {
    const newUser = new UserModel({
      email,
      password,
      pin,
      name,
      lastName,
      country,
      dateOfBirth
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error while registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerPost };
