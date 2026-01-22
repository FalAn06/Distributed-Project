# 📝 Biblioteca Integral FICA – Register Microservice

This directory contains the **Register microservice**, part of the Authentication Domain of the Biblioteca Integral FICA backend. This service is built in **Python** and follows a **clean, layered architecture** to keep responsibilities separated and the codebase easy to maintain.

The Register microservice is responsible for creating new user accounts, validating registration data, and ensuring that duplicate accounts are not created.

## 🏗 Architecture Overview

This microservice uses a **layered architecture** (MVC-inspired + Service Layer), where each folder represents a clear responsibility:

- **Routes**: Defines the HTTP endpoints exposed to the outside world (REST API).
- **Controllers**: Orchestrates request handling and response formatting.
- **Services**: Contains business rules and registration logic (validation, duplicate checks, etc.).
- **Models**: Handles data access and persistence operations.
- **Utils**: Shared helper utilities (database connection, hashing, token helpers, validations, etc.).

This structure improves:
- Readability and organization
- Scalability (easy to add new features)
- Testability (business logic isolated in services)
- Maintainability (changes are localized per layer)

## 📁 Folder Structure

```
Register/
├── controllers/      # Request handlers for registration
├── models/           # Database models / queries for users
├── routes/           # API routes/endpoints (e.g., /register)
├── services/         # Business logic (validation, create user, duplicates)
├── utils/            # Utilities (DB connection, security helpers, etc.)
├── app.py            # Application entry point
├── Dockerfile        # Docker configuration for the microservice
├── requirements.txt  # Python dependencies for this service
└── README.md         # Register microservice documentation
```

## 🎯 Design Patterns Used

### 🧩 MVC-inspired Structure (API version)
Even though this service is an API (no UI views), it follows an MVC-like separation:
- **Models**: Data access and persistence
- **Controllers**: Request orchestration and response mapping
- **Routes**: Endpoint definitions

### 🧠 Service Layer Pattern
The **services** layer contains the core registration logic:
- Validates input data
- Checks if an email already exists
- Creates new users safely
- Keeps controllers thin and focused on HTTP concerns

### ✅ Single Responsibility Principle
Each layer does one job:
- Routes expose endpoints
- Controllers handle request flow
- Services implement business rules
- Models work with the database
- Utils provide shared helpers

This makes the microservice easier to debug and extend.

## 🔐 Security Notes (Recommended)
For a production-ready registration service, it is recommended to:
- Hash passwords (e.g., bcrypt/werkzeug security)
- Validate email format and password strength
- Avoid returning sensitive error details
- Use environment variables for secrets and database credentials

## 🛠 Technologies Used
- **Python**
- **Flask / FastAPI**
- **Docker**
- **REST API**
- Dependencies managed through **requirements.txt**

## 🚀 Purpose

The Register microservice provides the user onboarding entry point for Biblioteca Integral FICA. Thanks to its modular architecture and clear folder responsibilities, it can be deployed independently and scaled as the platform grows.
