# Urban Harvest Hub

Hosted on AWS EC2
http://54.255.154.202/

## Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS (v4)
- React Router DOM
- Stripe Elements (React Stripe.js)

**Backend:**
- Node.js
- Express.js
- MySQL (mysql2)

**Database:**
- MySQL

**DevOps & Tools:**
- Git & GitHub
- PM2 (Process Manager)
- AWS EC2 (Deployment target)

## Prerequisites

Before running this project, ensure you have the following installed:
- Node.js (v16+)
- MySQL Server (running locally or remotely)
- Git
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Zahid-101/Web-dev-2.git
   ```

2. Navigate into the project directory:
   ```bash
   cd Web-dev-2
   ```

## Setup and Dependencies

This project consists of a frontend (root) and a backend (backend/). You need to install dependencies for both.

### Frontend Setup

1. From the root directory, install frontend dependencies:
   ```bash
   npm install
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

## Configuration (Environment Variables)

You must configure environment variables for both the frontend and backend.

### Backend Configuration

Create a file named `.env` in the `backend/` directory with the following content:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=urban_harvest_hub
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Note:** Ensure your MySQL service is running and you have created the database `urban_harvest_hub`. You can use the `schema.sql` file in `backend/` to set up the tables.

### Frontend Configuration

Create a file named `.env` in the root directory with the following content:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Running the Application

### 1. Start the Backend Server

From the `backend/` directory:
```bash
node server.js
```
The server will start on port 5000 (or the port specified in your .env).

### 2. Start the Frontend Application

From the root directory:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

## API Routes for Testing

You can use Postman or curl to test the following checkpoints:

**Authentication:**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a JWT

**Items (Public):**
- `GET /api/items` - Fetch, filter, and search items
- `GET /api/items/:id` - Get item details

**Items (Protected - Admin Only):**
- `POST /api/items` - Create a new item (Requires Bearer Token)
- `DELETE /api/items/:id` - Delete an item (Requires Bearer Token)

**Bookings (Private):**
- `POST /api/bookings` - Create a booking (Requires Bearer Token)

**Payments:**
- `POST /api/payments/create-payment-intent` - Initiate Stripe payment

## Project Notes

- **MySQL Service:** This application strictly requires a running MySQL service. If the database connection fails, check your `DB_HOST`, `DB_USER`, and `DB_PASS` in `backend/.env`.
- **Stripe Integration:** The payment system runs in test mode. Use Stripe test card numbers (e.g., 4242 4242 4242 4242) to simulate transactions.
- **PWA Support:** This app is a Progressive Web App. In production or when built, it can be installed on supported devices.

An API_DOCS.md file is also provided in the root directory if need be for greater guidance on testing the API.

## Project Structure

```
Web-dev-2/
├── backend/                # Node.js/Express Backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth and Error handling
│   ├── models/             # Database models
│   ├── routes/             # API route definitions
│   ├── server.js           # Entry point
│   ├── schema.sql          # Database schema
│   └── .env                # Backend environment variables
├── public/                 # Static assets (PWA icons)
├── src/                    # React Frontend
│   ├── components/         # Reusable UI components
│   ├── context/            # Global state (Theme, Data)
│   ├── pages/              # Page components
│   ├── main.jsx            # Frontend entry point
│   └── App.jsx             # Main application component
├── .env                    # Frontend environment variables
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Project dependencies
```
