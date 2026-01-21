from flask import Flask
from flask_cors import CORS
from routes.change_password_routes import change_password_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(change_password_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8005)
