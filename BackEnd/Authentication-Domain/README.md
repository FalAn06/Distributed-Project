# 🔐 Biblioteca Integral FICA – Authentication Domain

This directory contains the **Authentication Domain** microservices of the Biblioteca Integral FICA backend. All services in this domain are developed in **Python** and follow a **microservices-based architecture**, where each service has a single, well-defined responsibility.

The Authentication Domain is responsible for managing access control and user identity within the system, ensuring secure interaction between users and the platform.

## 🧩 Microservices Overview

### 🔑 Login Service
The Login microservice handles user authentication processes. Its responsibilities include:
- Validating user credentials
- Authenticating users against stored records
- Generating authentication tokens (such as JWT)
- Controlling access to protected resources

This service ensures that only authorized users can access the system.

### 📝 Register Service
The Register microservice manages user registration workflows, including:
- Creating new user accounts
- Validating registration data
- Preventing duplicate accounts
- Storing user credentials securely

It serves as the entry point for new users joining the Biblioteca Integral FICA platform.

## 🛠 Technologies Used

- **Python** – Core language for all authentication services
- **Flask / FastAPI** – REST API development
- **JWT** – Token-based authentication
- **Docker** – Containerization for deployment

## 📁 Folder Structure

```
Authentication-Domain/
├── Login/        # User login microservice
├── Register/     # User registration microservice
└── README.md     # Authentication domain documentation
```

## 🎯 Purpose

The Authentication Domain is designed to provide a secure and reliable authentication mechanism for the platform. By separating login and registration into independent microservices, the system gains flexibility, scalability, and improved security management.
