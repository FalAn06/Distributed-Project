from flask import jsonify
from models.user_model import UserModel

class ChangePasswordService:

    @staticmethod
    def change(email, old_password, new_password):
        stored_password = UserModel.get_password_by_email(email)

        if not stored_password:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        if stored_password != old_password:
            return jsonify({'error': 'Contraseña actual incorrecta'}), 400

        UserModel.update_password(email, new_password)
        return jsonify({'message': 'Contraseña actualizada'}), 200
