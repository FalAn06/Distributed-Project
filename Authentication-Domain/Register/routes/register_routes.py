from flask import Blueprint
from controllers.register_controller import register_user

register_bp = Blueprint('register_bp', __name__)

@register_bp.route('/register', methods=['POST'])
def register():
    return register_user()
