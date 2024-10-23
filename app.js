const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const categoryRoutes = require('./routes/categories'); // Adjust the path if necessary
const transactionRoutes = require('./routes/transactions'); // Ensure you have this file as well

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        return console.error('Error connecting to SQLite database:', err.message);
    }
    console.log('Connected to SQLite database.');
});

// Create categories table if not exists
db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
)`, (err) => {
    if (err) {
        console.error('Error creating categories table:', err.message);
    } else {
        console.log('Categories table ready.');
    }
});

// Create transactions table if not exists
db.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
)`, (err) => {
    if (err) {
        console.error('Error creating transactions table:', err.message);
    } else {
        console.log('Transactions table ready.');
    }
});

// Use category routes
app.use('/categories', categoryRoutes); // Ensure you have the categories routes
// Use transaction routes
app.use('/transactions', transactionRoutes); // Ensure you have the transactions routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
