from flask import Flask
from services.review_service import get_reviews
from flask_cors import CORS  # Importamos CORS

app = Flask(__name__)
CORS(app)  # Habilitar CORS

# Ruta para obtener las reseñas
app.add_url_rule('/reviews', 'get_reviews', get_reviews, methods=['GET'])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
