import jwt
import datetime
from flask import jsonify
from models.user_model import UserModel

SECRET_KEY = "supersecretkey"

class AuthService:
    @staticmethod
    def login_user(email, password):
        user = UserModel.find_user(email, password)
        if not user:
            return jsonify({'error': 'Credenciales inválidas'}), 401

        token = jwt.encode({
            'user_id': user[0],
            'email': email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, SECRET_KEY, algorithm='HS256')

        if isinstance(token, bytes):
            token = token.decode('utf-8')

        return jsonify({'token': token})

    @staticmethod
    def register_user(email, password):
        existing = UserModel.find_user(email)
        if existing:
            return jsonify({'error': 'El correo ya está registrado'}), 409

        UserModel.create_user(email, password)
        return jsonify({'message': 'Usuario registrado correctamente'}), 201
