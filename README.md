# CodeVector Product Backend

Backend service for browsing and filtering 200,000 products.

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Neon Database
* Railway Deployment
* Faker (for data generation)

## Features

* Browse products ordered by newest first
* Category filtering
* Cursor-based pagination
* Efficient database indexing
* Seed script for generating 200,000 products
* Handles large datasets efficiently

## API Endpoints

### Get Products

GET /products?limit=20

### Filter by Category

GET /products?category=Books&limit=20

### Cursor Pagination

GET /products?limit=20&cursorCreatedAt=<timestamp>&cursorId=<id>

## Running Locally

Install dependencies:

npm install

Create a .env file:

DATABASE_URL=your_postgres_connection_string

Start the server:

npm run dev

## Database Indexes

* (created_at DESC, id DESC)
* (category, created_at DESC, id DESC)

## Deployment

* Database: Neon
* Hosting: Railway
