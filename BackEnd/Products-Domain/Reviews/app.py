# Reviews/app.py

from flask import Flask
from services.review_service import add_review
from flask_cors import CORS  # Importamos CORS

app = Flask(__name__)

# Habilitar CORS para todas las rutas
CORS(app)

# Ruta para agregar una reseña
app.add_url_rule('/reviews', 'add_review', add_review, methods=['POST'])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
