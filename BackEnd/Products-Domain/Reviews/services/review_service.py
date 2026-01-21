from pymongo import MongoClient
from flask import request, jsonify
from datetime import datetime
import config

# Conexión a MongoDB
client = MongoClient(config.MONGO_URI)
db = client[config.MONGO_DB_NAME]
reviews_collection = db[config.MONGO_COLLECTION]

# Función para agregar una reseña
def add_review():
    data = request.get_json()

    # Validar los datos
    if 'productId' not in data or 'review' not in data or 'rating' not in data:
        return jsonify({"error": "Datos incompletos"}), 400

    # Preparar los datos para insertarlos en la base de datos
    review = {
        "productId": data['productId'],
        "review": data['review'],
        "rating": data['rating'],
        "timestamp": datetime.now()
    }

    # Insertar la reseña en la base de datos
    try:
        reviews_collection.insert_one(review)
        return jsonify({"message": "Reseña agregada con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
