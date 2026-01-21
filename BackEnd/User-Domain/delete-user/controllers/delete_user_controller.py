from flask import request
from services.delete_user_service import DeleteUserService

def delete_user():
    email = request.args.get('email')

    if not email:
        return {'error': 'Email requerido'}, 400

    return DeleteUserService.delete(email)
