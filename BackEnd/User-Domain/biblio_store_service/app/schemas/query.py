import graphene
from app.services.frases_service import obtener_frases

class Query(graphene.ObjectType):
    obtener_frases = graphene.List(graphene.String)

    def resolve_obtener_frases(self, info):
        # Llamamos al servicio que obtiene las frases
        return obtener_frases()

# Definimos el esquema de GraphQL
schema = graphene.Schema(query=Query)
