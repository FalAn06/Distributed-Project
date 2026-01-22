
# Reviews Microservice ✍️ - Product Review Submission

## 📦 Project Overview

The **Reviews Microservice** is part of the **Products-Domain** repository and is responsible for handling product review submissions in an platform. This service allows users to submit their reviews for products, which are then stored in the database. The microservice is built using **Python** and **Flask** and follows a **RESTful** architecture. It is containerized using **Docker** for easy deployment.

### 🚀 Main Features:
- **Submit Review**: Allows users to submit their review for a specific product.

## 🔧 Technologies Used

- **Python** 🐍: The primary programming language for this microservice.
- **Flask** 🖥️: A lightweight web framework for building APIs.
- **Docker** 🐳: Containerization for easy deployment and portability.
- **RESTful API** 🌐: Architecture style for designing networked applications using HTTP.

## 🔍 Folder Structure

Here’s a breakdown of the folder structure in the **Reviews** service:

```
Reviews/
├── models/               - Defines the data models for reviews. 📚
│   ├── __init__.py       - Initialization file for the models directory. 🗂️
│   ├── review_model.py   - Defines the review model for review submission. 📖
├── services/             - Contains the logic and API routes for review services. 🛠️
│   ├── __init__.py       - Initialization file for the services directory. 🗂️
│   ├── review_service.py - Defines the API logic for submitting reviews. ✍️
├── app.py                - Main application file where routes are defined. 🖥️
├── config.py             - Configuration settings for the application. ⚙️
├── Dockerfile            - Docker containerization instructions. 🐳
├── requirements.txt      - List of Python dependencies. 📦
```

- **models/**: Contains files for defining the data structure related to reviews.
    - **review_model.py**: Defines the review model, which outlines how review data is structured for submission.

- **services/**: Contains the business logic and API routes.
    - **review_service.py**: Contains the service layer that handles submitting new reviews and storing them in the database.

- **app.py**: The entry point for the Flask application. It handles the routes for submitting reviews.
- **config.py**: Contains configuration variables for the application, such as database connection settings and environment configurations.
- **Dockerfile**: Contains the instructions to build a Docker image for the Reviews microservice.
- **requirements.txt**: Lists all the dependencies (such as Flask) needed to run the service.

## 🎯 Purpose of the Reviews Microservice

This microservice is responsible for handling the submission of product reviews in an e-commerce platform. It provides an API that:
- Allows users to submit reviews for a specific product.

## ⚙️ Architecture & Design Pattern

- **Architecture**: The service follows a **RESTful architecture**, which is ideal for client-server communication. It exposes an API that handles the submission of reviews using the HTTP `POST` method.
- **Design Pattern**: This microservice follows the **Microservices Design Pattern**, ensuring that it operates independently, making it easier to scale and maintain.

## 🚀 How It Works

1. **Submit Review**: A `POST` request to the `/reviews` endpoint allows users to submit a review for a specific product. The service stores the review in the database and returns a success response.

## 🛠 Deployment

1. **Docker**: This microservice is containerized for easy deployment. The Docker image for the Reviews service can be built and run using the following:
   ```bash
   docker build -t chamorrito/review .
   docker run -p 5000:5000 chamorrito/review
   ```
   This will build the Docker image and run the service on port 5000.

## 🌟 Future Enhancements

- **Review Validation**: Add validation for review content (e.g., check for offensive language).
- **Rating System**: Implement functionality to allow users to rate their reviews (e.g., thumbs up or thumbs down).
- **Review Moderation**: Allow administrators to moderate reviews before they are published.

## 💬 Contact Information
For any questions or contributions, feel free to reach out to me through my GitHub profile!

Happy coding! 👨‍💻👩‍💻
