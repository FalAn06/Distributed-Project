from flask import Flask
from flask_cors import CORS
from routes.delete_user_routes import delete_user_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(delete_user_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8004)
