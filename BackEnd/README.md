# 📚 Biblioteca Integral FICA – Backend

The backend of **Biblioteca Integral FICA** is built using a **microservices architecture**, fully developed in **Python**. It is responsible for handling business logic, authentication, user management, and book-related operations for the online university book rental system.

Each microservice is independent, scalable, and designed to communicate with frontend applications and other services through RESTful APIs.

## 🧩 Microservices Architecture

The backend is divided into multiple domains, each one representing a specific responsibility within the system:

### 🔐 Authentication-Domain
This microservice manages all authentication and authorization processes, including:
- User login
- User registration
- Credential validation
- Token-based authentication (JWT or similar mechanisms)

It ensures secure access to the system and protects restricted resources.

### 📚 Products-Domain
This microservice handles everything related to books and library products:
- Listing available university books
- Managing book information (title, author, availability, category, etc.)
- Handling rental availability and book status

It acts as the core service for the digital library catalog.

### 👤 User-Domain
This microservice manages user-related data and operations:
- User profiles
- Personal information management
- Rental history and user interactions with the platform

It ensures that each user has a personalized experience within the system.

## 🛠 Technologies Used

- **Python** – Core programming language for all microservices
- **Flask / FastAPI** – Lightweight frameworks for building REST APIs
- **Docker** – Containerization of each microservice
- **REST APIs** – Communication between frontend and backend services

## 📁 Project Structure

```
BackEnd/
├── Authentication-Domain/   # Authentication and security services
├── Products-Domain/         # Book and product management services
├── User-Domain/             # User management services
└── README.md                # Backend documentation
```

## 🎯 Purpose

The backend is designed to be modular, scalable, and maintainable. By using a microservices approach, each domain can be developed, deployed, and scaled independently, allowing the system to grow as the number of users and services increases.

This architecture ensures high availability, better fault isolation, and easier future expansion of the Biblioteca Integral FICA platform.
