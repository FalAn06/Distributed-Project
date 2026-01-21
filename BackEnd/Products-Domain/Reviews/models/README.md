
# Models Folder 📚 - Defines the Data Models for Reviews

## 📦 Folder Overview

The **models** folder is responsible for defining the data structure used within the **Get Review Microservice**. It contains the definition of the review data model, which represents the structure and attributes of a product review. This folder ensures that the data used by the service is consistent and follows the required structure for product reviews.

### 🛠 Key Components:
- **review_model.py**: This file defines the structure of the review model, including the product ID, review content, rating, and timestamp. This model is essential for managing review data within the service.
- **__init__.py**: This is an initialization file that marks the directory as a Python package, making it possible to import the model into other parts of the application.

## 🎯 Purpose of the Models Folder

The models folder serves as the foundation for handling product review data in the system. It allows the **Get Review Microservice** to:
- Consistently structure and store product reviews.
- Ensure that review data passed between different services follows the same format.

## 🔍 Review Model

The review model includes:
- **productId**: The ID of the product associated with the review.
- **user**: The user who wrote the review.
- **review**: The content of the review.
- **rating**: The rating given by the user.
- **timestamp**: The time when the review was submitted.

## 🌟 Future Enhancements

- **Additional Fields**: Add more attributes to the review model, such as images or tags.
- **Data Validation**: Implement validation checks for the review data to ensure consistency and quality.

This folder plays a critical role in organizing and managing review data for the platform.
