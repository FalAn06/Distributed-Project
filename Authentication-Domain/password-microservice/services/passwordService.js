const PasswordGenerator = require('../utils/passwordGenerator');

// El servicio se encargará de gestionar la creación de contraseñas
class PasswordService {
  static generatePassword() {
    return PasswordGenerator.generateSecurePassword();
  }
}

module.exports = PasswordService;
