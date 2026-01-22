# 👤 Biblioteca Integral FICA – User Domain

This directory contains the **User Domain** microservices of the Biblioteca Integral FICA backend. All services in this domain are developed in **Python** and are dedicated to user-related features and personalization.

The User Domain provides functionality such as:
- User account management (security and profile actions)
- Supporting services that improve the user experience (like book-related random quotes)

## 🧩 Microservices Overview

### 📖 biblio_store_service (Book Quotes Service)
The **biblio_store_service** microservice is designed to provide a more engaging and motivating user experience by delivering **random book-related phrases/quotes**.

Main responsibilities:
- Return random quotes or short phrases about books and reading
- Provide inspirational or educational content to display in the UI (welcome screens, dashboards, etc.)
- Support lightweight endpoints for fast responses

This service is not critical for authentication or rentals, but it adds a **personalized and friendly touch** to the platform.

### 🔒 change-password Service
The **change-password** microservice manages password update operations securely.

Main responsibilities:
- Validate user identity and current credentials (depending on the implementation)
- Apply password strength rules (recommended)
- Update the password in the user storage system
- Return success/error responses for frontend feedback

This service helps users keep their accounts secure and allows password recovery/update workflows.

### 🗑 delete-user Service
The **delete-user** microservice is responsible for removing user accounts from the platform.

Main responsibilities:
- Validate authorization to delete the account
- Remove user data from the database (or mark it as inactive, depending on policy)
- Ensure related user records are handled properly (recommended: logs/rental history policies)
- Return confirmation to the frontend

This service supports account management and compliance use cases where users can request removal of their data.

## 🛠 Technologies Used
- **Python** – Core language for all microservices in this domain
- **Flask / FastAPI** – REST API development
- **Docker** – Containerization and deployment
- **Database Integration** – Depending on your setup (SQL Server / MongoDB / etc.)

## 📁 Folder Structure

```
User-Domain/
├── biblio_store_service/   # Random book quotes / phrases microservice
├── change-password/        # Password update microservice
├── delete-user/            # Account deletion microservice
└── README.md               # User domain documentation
```

## 🎯 Purpose

The User Domain is focused on providing both **core account operations** (like password changes and account deletion) and **extra user experience features** (like random book quotes).

By separating these responsibilities into independent microservices, Biblioteca Integral FICA remains modular, scalable, and easy to maintain as the platform grows.
