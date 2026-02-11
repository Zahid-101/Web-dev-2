# Urban Harvest Hub API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register User
-   **URL**: `/auth/register`
-   **Method**: `POST`
-   **Body**:
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123",
        "role": "user" // Optional, default 'user'
    }
    ```
-   **Success Response**: `201 Created`
    ```json
    {
        "success": true,
        "data": {
            "_id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "role": "user",
            "token": "eyJhbGciOiJIUz..."
        }
    }
    ```

###
-   **Success Response**: `200 OK` (Returns same structure as register)

## Items

### Get All Items
-   **URL**: `/items`
-   **Method**: `GET`
-   **Query Params**: `?category=gardening` (optional)
-   **Success Response**: `200 OK`

### Get Single Item
-   **URL**: `/items/:id`
-   **Method**: `GET`
-   **Success Response**: `200 OK`

### Create Item (Admin Only)
-   **URL**: `/items`
-   **Method**: `POST`
-   **Headers**: `Authorization: Bearer <token>`
-   **Body**:
    ```json
    {
        "title": "New Event",
        "description": "...",
        "category_slug": "technology",
        "date": "2026-12-01 10:00:00",
        "location": "Community Center",
        "price": 20.00
    }
    ```
-   **Success Response**: `201 Created`

### Delete Item (Admin Only)
-   **URL**: `/items/:id`
-   **Method**: `DELETE`
-   **Headers**: `Authorization: Bearer <token>`
-   **Success Response**: `200 OK`

## Bookings

### Create Booking
-   **URL**: `/bookings`
-   **Method**: `POST`
-   **Body**:
    ```json
    {
        "user_id": 1,
        "item_id": 1,
        "payment_intent_id": "pi_..."
    }
    ```
-   **Success Response**: `201 Created`

## Payments

### Create Payment Intent
-   **URL**: `/payments/create-payment-intent`
-   **Method**: `POST`
-   **Body**:
    ```json
    {
        "item_id": 1
    }
    ```
-   **Success Response**: `200 OK`
    ```json
    {
        "clientSecret": "pi_..._secret_..."
    }
    ```

## Error Codes
-   `400`: Bad Request (Validation failed)
-   `401`: Unauthorized (Invalid/Missing Token)
-   `403`: Forbidden (Admin role required)
-   `404`: Not Found
-   `500`: Internal Server Error
