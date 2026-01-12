const crypto = require('crypto');

// Implementamos el generador de contraseñas usando el patrón 'Factory'
class PasswordGenerator {
  static generateSecurePassword(length = 16) {
    return crypto.randomBytes(length).toString('hex'); // Contraseña segura de 32 caracteres hexadecimales
  }
}

module.exports = PasswordGenerator;
