# Usamos la imagen base de Python
FROM python:3.9-slim

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos todos los archivos al contenedor
COPY . .

# Instalamos las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Exponemos el puerto 5000
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "run.py"]
