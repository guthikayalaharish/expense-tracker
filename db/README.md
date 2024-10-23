# Expense Tracker

## Overview

The Expense Tracker is a personal finance management application that allows users to record their income and expenses, categorize them, and retrieve a summary of their transactions. Built using Node.js with Express and SQLite, this application provides a RESTful API for managing financial records.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add, update, delete, and retrieve categories.
- Add, update, delete, and retrieve transactions.
- Get a summary of transactions, including total income and expenses.
- Filter transactions by date range or category.

## Technologies

- Node.js
- Express.js
- SQLite
- Postman (for testing API endpoints)

## Setup and Installatizations##
install the necessary packages by using npm install
## start the server by giving prompt node app.js


The server will run on http://localhost:3000.
##API Endpoints
Categories
Add Category

POST /categories
Request Body: { "name": "CategoryName" }
Get All Categories

GET /categories
Get Category by ID

GET /categories/:id
Update Category by ID

PUT /categories/:id
Request Body: { "name": "NewCategoryName" }
Delete Category by ID

DELETE /categories/:id
Transactions
Add Transaction

POST /transactions
Request Body: { "description": "Description", "amount": 100, "date": "2024-10-23", "category_id": 1 }
Get All Transactions

GET /transactions
Get Transaction by ID

GET /transactions/:id
Update Transaction by ID

PUT /transactions/:id
Request Body: { "description": "Updated Description", "amount": 150, "date": "2024-10-24", "category_id": 1 }
Delete Transaction by ID

DELETE /transactions/:id
Get Summary of Transactions

GET /summary
Usage
You can use Postman to test the API endpoints. Make sure to set the appropriate HTTP method and URL, and include any required request bodies.
