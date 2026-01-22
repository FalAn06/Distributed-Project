# ⭐ Biblioteca Integral FICA – Get_review Microservice

This directory contains the **Get_review microservice**, part of the Products Domain of the Biblioteca Integral FICA backend. This microservice is developed in **Python** and is focused exclusively on **retrieving book reviews** efficiently for the frontend.

It follows a **simple, clean architecture** optimized for read-only operations, ensuring fast responses and easy scalability.

## 🏗 Architecture Overview

The Get_review microservice uses a **layered architecture** combined with the **Service Layer Pattern**, where each folder has a clearly defined responsibility:

- **Models layer**: Handles data structures and database access for reviews.
- **Services layer**: Contains the business logic for fetching and processing reviews.
- **Application layer**: Exposes API endpoints and initializes the service.

This separation keeps the microservice lightweight and focused on retrieval operations.

## 📁 Folder Structure

```
Get_review/
├── models/        # Review data models and database queries
├── services/      # Business logic for retrieving reviews
├── app.py         # Application entry point and API routes
├── config.py      # Configuration settings (DB, environment variables)
├── Dockerfile     # Docker configuration for deployment
└── README.md      # Get_review microservice documentation
```

## 🎯 Design Patterns Used

### 🧠 Service Layer Pattern
All logic for fetching reviews is encapsulated in the **services** layer:
- Keeps the application entry point clean
- Makes logic reusable and testable
- Allows easy future extensions (filters, pagination, sorting)

### 📦 Single Responsibility Principle
This microservice is **read-only** and focused only on:
- Retrieving reviews by book ID
- Returning structured review data to the frontend

This clear responsibility improves performance and maintainability.

### 🔄 Separation of Concerns
- **Models** handle data access
- **Services** handle business rules
- **app.py** handles request/response flow

## 🛠 Technologies Used
- **Python**
- **Flask / FastAPI**
- **Docker**
- **REST API**
- Database integration (MongoDB / SQL, depending on configuration)

## 🚀 Purpose

The Get_review microservice allows Biblioteca Integral FICA to efficiently display user reviews for books, helping students make informed rental decisions. Its minimal and focused design ensures high performance and easy scaling as review data grows.
