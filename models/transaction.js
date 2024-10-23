const db = require('../database'); // Make sure this path points to your database module

// Function to add a new transaction
const addTransaction = (transaction, callback) => {
    const { description, amount, date, category_id } = transaction;
    db.run(`INSERT INTO transactions (description, amount, date, category_id) VALUES (?, ?, ?, ?)`, [description, amount, date, category_id], function(err) {
        callback(err, { id: this.lastID, description, amount, date, category_id });
    });
};

// Function to get all transactions
const getAllTransactions = (callback) => {
    db.all(`SELECT transactions.id, transactions.description, transactions.amount, transactions.date, categories.name AS category 
            FROM transactions 
            JOIN categories ON transactions.category_id = categories.id`, 
            [], (err, rows) => {
                callback(err, rows);
            });
};

// Function to get a transaction by ID
const getTransactionById = (id, callback) => {
    db.get(`SELECT transactions.id, transactions.description, transactions.amount, transactions.date, categories.name AS category 
            FROM transactions 
            JOIN categories ON transactions.category_id = categories.id 
            WHERE transactions.id = ?`, [id], (err, row) => {
                callback(err, row);
            });
};

// Function to update a transaction by ID
const updateTransactionById = (id, transaction, callback) => {
    const { description, amount, date, category_id } = transaction;
    db.run(`UPDATE transactions SET description = ?, amount = ?, date = ?, category_id = ? WHERE id = ?`, 
           [description, amount, date, category_id, id], function(err) {
               callback(err, { id, description, amount, date, category_id });
           });
};

// Function to delete a transaction by ID
const deleteTransactionById = (id, callback) => {
    db.run(`DELETE FROM transactions WHERE id = ?`, [id], function(err) {
        callback(err, { deletedId: id });
    });
};

// Exporting the functions
module.exports = {
    addTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransactionById,
    deleteTransactionById
};
