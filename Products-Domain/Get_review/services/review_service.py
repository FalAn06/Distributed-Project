from pymongo import MongoClient
from flask import request, jsonify
import config
from datetime import datetime

# Conexión a MongoDB
client = MongoClient(config.MONGO_URI)
db = client[config.MONGO_DB_NAME]
reviews_collection = db[config.MONGO_COLLECTION]

# Función para obtener las reseñas
def get_reviews():
    product_id = request.args.get('productId')  # Obtenemos el productId de la URL
    
    if not product_id:
        return jsonify({"error": "Falta el productId"}), 400  # Si no hay productId, devolvemos error
    
    # Buscar las reseñas en la base de datos
    reviews = reviews_collection.find({"productId": product_id})
    reviews_list = []
    
    for review in reviews:
        review_data = {
            "review": review['review'],
            "rating": review['rating'],
            "timestamp": review['timestamp'].strftime('%Y-%m-%d %H:%M:%S')  # Formateamos la fecha
        }
        reviews_list.append(review_data)

    if not reviews_list:
        return jsonify({"message": "No hay reseñas para este producto"}), 404  # Si no hay reseñas, devolvemos un mensaje
    
    return jsonify({"reviews": reviews_list}), 200  # Devolvemos la lista de reseñas en formato JSON
