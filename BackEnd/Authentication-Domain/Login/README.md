# 🔐 Biblioteca Integral FICA – Login Microservice

This directory contains the **Login microservice**, part of the Authentication Domain of the Biblioteca Integral FICA backend. This microservice is fully developed in **Python** and follows a **clean, layered architecture** inspired by common backend design patterns.

The Login microservice is responsible for authenticating users and granting access to the system in a secure and scalable way.

## 🏗 Architecture Overview

The microservice is structured using a **layered architecture**, which helps separate concerns and improves maintainability, scalability, and testability.

The main layers are:
- **Routes layer** – Handles HTTP requests and responses
- **Controllers layer** – Manages request validation and flow control
- **Services layer** – Contains business logic
- **Models layer** – Handles data access and persistence
- **Utils layer** – Shared utilities and helper functions

This structure loosely follows patterns such as **MVC (Model–View–Controller)** and **Service Layer Pattern**, adapted for REST APIs.

## 📁 Folder Structure

```
Login/
├── controllers/    # Request handling and controller logic
├── models/         # Database models and data access logic
├── routes/         # API route definitions (endpoints)
├── services/       # Business logic for authentication
├── utils/          # Utility functions (JWT, hashing, DB helpers, etc.)
├── app.py          # Application entry point
├── Dockerfile      # Docker configuration for the microservice
└── README.md       # Login microservice documentation
```

## 🎯 Design Patterns Used

### 🧩 MVC-inspired Structure
Although this is a REST API (without views), the structure is inspired by MVC:
- **Models** manage data access
- **Controllers** orchestrate requests
- **Routes** expose endpoints

### 🧠 Service Layer Pattern
Business logic is isolated inside the **services** folder, which:
- Keeps controllers lightweight
- Improves code reuse
- Simplifies future changes and testing

### 🔐 Security-Oriented Design
- Authentication logic is isolated from routing logic
- Token handling (JWT) and encryption utilities are placed in the utils layer
- Promotes secure and maintainable authentication flows

## 🛠 Technologies Used
- **Python**
- **Flask / FastAPI**
- **JWT-based Authentication**
- **Docker**

## 🚀 Purpose

The Login microservice provides a secure entry point to the Biblioteca Integral FICA platform. Its modular architecture allows easy extension, testing, and independent deployment as part of the overall microservices ecosystem.
