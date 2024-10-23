const express = require('express');
const router = express.Router();
const db = require('../database');

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

// Function to get transaction summary
const getTransactionSummary = (callback) => {
    db.all(`SELECT 
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expenses,
                SUM(amount) AS balance 
            FROM transactions`, [], (err, row) => {
                callback(err, row);
            });
};

// Route to add a new transaction
router.post('/', (req, res) => {
    addTransaction(req.body, (err, transaction) => {
        if (err) return res.status(500).json({ error: 'Failed to add transaction' });
        res.status(201).json(transaction);
    });
});

// Route to get all transactions
router.get('/', (req, res) => {
    getAllTransactions((err, transactions) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch transactions' });
        res.json(transactions);
    });
});

// Route to get a transaction by ID
router.get('/:id', (req, res) => {
    const transactionId = req.params.id;
    getTransactionById(transactionId, (err, transaction) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch transaction' });
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.json(transaction);
    });
});

// Route to update a transaction by ID
router.put('/:id', (req, res) => {
    const transactionId = req.params.id;
    updateTransactionById(transactionId, req.body, (err, transaction) => {
        if (err) return res.status(500).json({ error: 'Failed to update transaction' });
        res.json(transaction);
    });
});

// Route to delete a transaction by ID
router.delete('/:id', (req, res) => {
    const transactionId = req.params.id;
    deleteTransactionById(transactionId, (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to delete transaction' });
        res.json(result);
    });
});

// Route to get transaction summary
router.get('/summary', (req, res) => {
    getTransactionSummary((err, summary) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch summary' });
        res.json(summary);
    });
});

module.exports = router;
