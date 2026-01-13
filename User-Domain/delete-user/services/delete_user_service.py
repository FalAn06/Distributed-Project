from flask import jsonify
from models.user_model import UserModel

class DeleteUserService:

    @staticmethod
    def delete(email):
        UserModel.delete_by_email(email)
        return jsonify({'message': 'Usuario eliminado'}), 200
