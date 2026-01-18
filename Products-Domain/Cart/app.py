from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import config

app = Flask(__name__)

# Habilitar CORS para todas las rutas
CORS(app)

# Conexión a MongoDB
client = MongoClient(config.MONGO_URI)
db = client[config.MONGO_DB_NAME]
cart_collection = db[config.MONGO_CART_COLLECTION]

# Ruta para añadir un producto al carrito
@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()

    # Validar que los datos necesarios están presentes
    if 'productId' not in data:
        return jsonify({"error": "Datos incompletos"}), 400

    # Preparar el dato del carrito
    cart_item = {
        "productId": data['productId'],
    }

    # Insertar el producto al carrito
    try:
        # Verificar si el producto ya está en el carrito
        existing_item = cart_collection.find_one({"productId": data['productId']})
        if existing_item:
            return jsonify({"message": "El producto ya está en el carrito"}), 200
        cart_collection.insert_one(cart_item)
        return jsonify({"message": "Producto añadido al carrito con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para obtener los productos en el carrito
@app.route('/cart', methods=['GET'])
def get_cart():
    cart_items = cart_collection.find({})
    cart_list = []
    for item in cart_items:
        cart_list.append({
            "productId": item['productId'],
        })

    if not cart_list:
        return jsonify({"message": "El carrito está vacío"}), 404

    return jsonify({"cart": cart_list}), 200

# Ruta para eliminar un producto del carrito
@app.route('/cart/<product_id>', methods=['DELETE'])
def remove_from_cart(product_id):
    try:
        cart_collection.delete_one({"productId": product_id})
        return jsonify({"message": "Producto eliminado del carrito"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
