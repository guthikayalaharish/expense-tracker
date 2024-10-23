const express = require('express');
const router = express.Router();
const db = require('../database'); // Adjust the path if necessary

// Get all categories
router.get('/', (req, res) => {
    db.all('SELECT * FROM categories', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

// Get a category by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM categories WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(row);
    });
});

// Add a new category
router.post('/', (req, res) => {
    const { name } = req.body;
    db.run('INSERT INTO categories (name) VALUES (?)', [name], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to add category' });
        }
        res.status(201).json({ id: this.lastID, name });
    });
});

// Update a category by ID
// Update a category by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    db.run('UPDATE categories SET name = ? WHERE id = ?', [name, id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to update category' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ id, name });
    });
});

// Delete a category by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM categories WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete category' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(204).send(); // No content to send back
    });
});

module.exports = router;
