from flask import Blueprint
from controllers.change_password_controller import change_password

change_password_bp = Blueprint('change_password_bp', __name__)

@change_password_bp.route('/change-password', methods=['PUT'])
def change():
    return change_password()
