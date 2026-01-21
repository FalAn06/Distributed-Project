from flask import request
from services.auth_service import AuthService

def register_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    return AuthService.register_user(email, password)
