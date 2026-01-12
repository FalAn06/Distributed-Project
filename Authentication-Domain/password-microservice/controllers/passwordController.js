const PasswordService = require('../services/passwordService');

// El controlador maneja la interacción con el cliente
class PasswordController {
  static async generatePassword(req, res) {
    try {
      const password = PasswordService.generatePassword();
      res.status(200).json({ password });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al generar la contraseña' });
    }
  }
}

module.exports = PasswordController;
