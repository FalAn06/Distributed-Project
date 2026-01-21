from flask import request
from services.change_password_service import ChangePasswordService

def change_password():
    data = request.get_json()
    email = data.get('email')
    old_password = data.get('oldPassword')
    new_password = data.get('newPassword')

    return ChangePasswordService.change(email, old_password, new_password)
