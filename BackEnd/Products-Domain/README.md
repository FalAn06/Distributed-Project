# 📚 Biblioteca Integral FICA – Products Domain

This directory contains the **Products Domain** microservices of the Biblioteca Integral FICA backend. All services in this domain are developed in **Python** and are focused on managing the book catalog interaction layer, especially the rental flow and user feedback.

The Products Domain is responsible for handling features related to:
- Storing and managing rented books (cart/rental list)
- Creating and retrieving user reviews
- Providing endpoints that the frontend can use to display rental information and user feedback

## 🧩 Microservices Overview

### 🛒 Cart Service
The **Cart** microservice is used to store and manage the books that a user has selected to rent.

Main responsibilities:
- Add a book to the rental cart (selected books)
- Remove a book from the rental cart
- Retrieve the current rented/selected books for a user
- Maintain the rental list state so the frontend can show the “books to rent” at any moment

In the context of Biblioteca Integral FICA, the cart represents the **books currently selected or rented online**.

### ⭐ Reviews Service
The **Reviews** microservice manages the book review system, allowing users to leave feedback about books.

Main responsibilities:
- Create a new review (rating + text review)
- Retrieve reviews for a specific book
- Store review metadata (user, timestamp, rating, comment)
- Provide review data to be displayed in the frontend

This service helps students make better rental decisions by reading other users’ experiences.

### 🧾 Get_review Service
The **Get_review** microservice is focused on retrieving review information efficiently (read-only operations), such as:
- Fetching reviews for a given book ID
- Filtering or sorting reviews (if supported)
- Returning structured review responses for the frontend


## 🛠 Technologies Used
- **Python** – Core language for all services in this domain
- **Flask / FastAPI** – REST API development
- **Database Integration** – Depending on your setup (e.g., MongoDB / SQL-based storage)
- **Docker** – Containerization and deployment

## 📁 Folder Structure

```
Products-Domain/
├── Cart/         # Microservice to store/manage rented or selected books
├── Get_review/   # Microservice for retrieving reviews (read-only)
├── Reviews/      # Microservice to create/manage user reviews
└── README.md     # Products domain documentation
```

## 🎯 Purpose

The Products Domain enables Biblioteca Integral FICA to offer a complete online rental experience:
- Users can **select and store rented books** through the Cart service
- Users can **share and read feedback** through the Reviews services

By separating these features into microservices, the system stays modular, easier to maintain, and ready to scale as the number of books and users grows.
