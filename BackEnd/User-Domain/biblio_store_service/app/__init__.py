from flask import Flask
from flask_graphql import GraphQLView
from flask_cors import CORS
from app.schemas.query import schema  # Asegúrate de importar el esquema

def create_app():
    app = Flask(__name__)

    # Configuración de CORS
    CORS(app)  # Habilita CORS para todas las rutas

    # Configuración de la aplicación
    app.config.from_object('app.config.Config')

    # Configuración de GraphQL
    app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

    return app
