from flask import Blueprint
from controllers.delete_user_controller import delete_user

delete_user_bp = Blueprint('delete_user_bp', __name__)

@delete_user_bp.route('/delete_user', methods=['DELETE'])
def delete():
    return delete_user()

