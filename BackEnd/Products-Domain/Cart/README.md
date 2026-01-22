
# Cart Microservice 🛒 - Biblioteca Cart Management

## 📦 Project Overview

The **Cart Microservice** is part of the **Products-Domain** repository and is responsible for handling shopping cart functionality in an biblioteca platform. It allows users to **add**, **get**, and **remove** products from their shopping cart. Built using **Python** and **Flask**, this microservice follows a **RESTful** architecture and is containerized using **Docker** for easy deployment.

### 🚀 Main Features:
- **Add to Cart**: Add products to the shopping cart.
- **Get Cart**: Retrieve the current contents of the shopping cart.
- **Remove from Cart**: Remove specific items from the cart.

## 🔧 Technologies Used

- **Python** 🐍: The primary programming language for this microservice.
- **Flask** 🖥️: A lightweight web framework for building APIs.
- **Docker** 🐳: Containerization for easy deployment and portability.
- **RESTful API** 🌐: Architecture style for designing networked applications using HTTP.

## 🔍 Folder Structure

Here’s a breakdown of the folder structure in the **Cart** service:

```
Cart/
├── app.py               - Main application file where routes are defined. 🖥️
├── config.py            - Configuration settings for the application. ⚙️
├── Dockerfile           - Docker containerization instructions. 🐳
├── requirements.txt     - List of Python dependencies. 📦
```

- **app.py**: The entry point for the Flask application. It handles the routes for adding, retrieving, and removing items from the shopping cart.
- **config.py**: Contains configuration variables for the microservice, such as database connection settings and environment configurations.
- **Dockerfile**: Contains the instructions to build a Docker image for the Cart microservice.
- **requirements.txt**: Lists all the dependencies (such as Flask) needed to run the service.

## 🎯 Purpose of the Cart Microservice

This microservice allows e-commerce platforms to manage shopping cart functionality. It provides an API that can:
- Add products to the cart.
- Retrieve all products currently in the cart.
- Remove specific products from the cart.

## ⚙️ Architecture & Design Pattern

- **Architecture**: The service follows a **RESTful architecture** to expose endpoints for interacting with the cart. It uses the HTTP methods `POST`, `GET`, and `DELETE` for adding, retrieving, and removing items.
- **Design Pattern**: The microservice follows the **Microservices Design Pattern**, allowing it to operate independently and be scaled or replaced without affecting the rest of the system.

## 🚀 How It Works

1. **Add to Cart**: A `POST` request is made to the `/cart` endpoint, passing the product information in the request body. The service adds the product to the cart and responds with the updated cart.
2. **Get Cart**: A `GET` request to `/cart` retrieves the contents of the current cart.
3. **Remove from Cart**: A `DELETE` request to `/cart/{product_id}` removes the specified product from the cart.


## 🌟 Future Enhancements

- **User-specific Cart**: Integrate user authentication and allow each user to have a unique cart.
- **Cart Persistence**: Use a database or cache (e.g., Redis) to persist the cart state across requests.

## 💬 Contact Information
For any questions or contributions, feel free to reach out to me through my GitHub profile!

Happy coding! 👨‍💻👩‍💻
